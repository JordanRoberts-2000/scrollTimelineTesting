import SvgHamburgerMenu from '../../stralla/header/SvgHamburgerMenu'
import { useEffect, useRef, useState } from 'react'
import NavBar from './Navbar'

type Props = 
    {
    activeProp?: boolean, 
    activeSetterProp?: React.Dispatch<React.SetStateAction<boolean>>,
    animationVariant?: HeaderShifingVariants,
    shifitngMainContent: true,
    navReference?: React.RefObject<HTMLElement>
    } |
    {
        activeProp?: boolean, 
        activeSetterProp?: React.Dispatch<React.SetStateAction<boolean>>,
        animationVariant?: HeaderVariations,
        shifitngMainContent?: undefined,
        navReference?: React.RefObject<HTMLElement>
    }

export type HeaderVariations = 'coverLeft' | 'coverRight' | 'coverTop' // fill
export type HeaderShifingVariants = 'revealLeft' | 'revealRight' | 'revealRightTakeHeader' | 'revealLeftTakeHeader' |
                                    'revealLeftSlide' | 'revealRightSlide' | 'revealLeftSlideTakeHeader' | 'revealRightSlideTakeHeader' |
                                    'revealLeftShrink' | 'revealLeftShrinkTurn' | 'revealRightShrink' | 'revealLeftRightTurn' |
                                    'shiftLeft' | 'shiftRight' | 'shiftLeftTakeHeader' | 'shiftRightTakeHeader' |
                                    'shiftTop' | 'scaleDownFadeOut'

const headerAnimate : { [key: string] : (headeRef: HTMLElement, navRef:HTMLElement) => void} = {
    revealLeftTakeHeader: (headeRef, navRef) => {
        requestAnimationFrame(() => {
            headeRef.style.transform = `translate(${navRef.offsetWidth}px, 0)`
        })
    },
    revealRightTakeHeader: (headeRef, navRef) => {
        requestAnimationFrame(() => {
            headeRef.style.transform = `translate(-${navRef.offsetWidth}px, 0)`
        })
    }
};

const Header = ({activeProp, activeSetterProp, animationVariant, shifitngMainContent, navReference}: Props) => {
    // ===========================================================
    // useEffect event listener conditional
    // overflow x and sticky bar
    // rename a bunch of stuff
    // shift content is currently set at 800
    // accessability, how does nav tab items work when offscreen? onclose??
    // export types
    // needs to translate the length of the nav
    // nav needs to be different on desktop
    // click off on shift not working
    // closeFn on scroll???
    // make all the imports @/....
    // ===========================================================
    const headerRef = useRef<HTMLElement>(null)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [headerActive, setHeaderActive] = useState(false)
    const active = activeProp ?? headerActive
    const setActive = activeSetterProp ?? setHeaderActive
    let navRef = navReference ?? useRef<HTMLElement>(null) 
    useEffect(() => {
        if(shifitngMainContent){
            const handleResize = () => {
                setScreenWidth(window.innerWidth)
            } 
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    },[])
    useEffect(() => {
        if(headerActive || activeProp){
            if(animationVariant && headerAnimate[animationVariant]){
                headerAnimate[animationVariant](headerRef.current!, navRef.current!)
            }
        }else{
            requestAnimationFrame(() => {
                headerRef.current!.style.transform = `translate(0, 0)`
            })
        }
    }, [headerActive, activeProp])
    return (
        <>
            <header ref={headerRef} className={`flex sticky top-0 w-full transition-all duration-500 bg-purple-400 z-50`}>
                <SvgHamburgerMenu size={'xl'} className={`ml-2 transition-all duration-500`}
                        active={active} onClick={() => setActive((prev) => !prev)} stayInPlace={{type: 'left', navRef: navRef.current!}}/>
                <div className='ml-auto mr-8 font-medium flex gap-16'>
                    {(!shifitngMainContent || screenWidth >= 800) && <NavBar navRef={navRef} active={active} closeFn={() => setActive(false)} animationVariant={animationVariant}/>}
                    <div className='text-xl flex items-center'>sign in</div>
                </div>
            </header>
            {(shifitngMainContent && screenWidth < 800) && <NavBar navRef={navRef} active={active} closeFn={() => setActive(false)} animationVariant={animationVariant}/>}
        </>
    )
}

export default Header