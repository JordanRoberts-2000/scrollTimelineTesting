import { useEffect, useRef, useState } from 'react'
import NavBar from '../../ui/header/Navbar'

type Props = 
    {
    activeProp?: boolean, 
    activeSetterProp?: React.Dispatch<React.SetStateAction<boolean>>,
    animationVariant?: HeaderShifingVariants,
    shifitngMainContent: true,
    navReference?: React.RefObject<HTMLElement>,
    children?: React.ReactNode
    } |
    {
        activeProp?: boolean, 
        activeSetterProp?: React.Dispatch<React.SetStateAction<boolean>>,
        animationVariant?: HeaderVariations,
        shifitngMainContent?: undefined,
        navReference?: React.RefObject<HTMLElement>,
        children?: React.ReactNode
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

const Header = ({activeProp, activeSetterProp, animationVariant, shifitngMainContent, navReference, children}: Props) => {
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
                <NavBar navRef={navRef} active={active} closeFn={() => setActive(false)} animationVariant={animationVariant}/>
                {children}
            </header>
            {(shifitngMainContent && screenWidth < 800) && <NavBar navRef={navRef} active={active} closeFn={() => setActive(false)} animationVariant={animationVariant}/>}
        </>
    )
}

export default Header