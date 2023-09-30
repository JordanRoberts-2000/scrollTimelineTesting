import React, { useContext } from 'react'
import { useEffect, useRef } from 'react'
import HeaderContextProvider, { HeaderContext } from './HeaderContextProvider'
import { HeaderVariations } from './HeaderTypings'

type Props = {
    animationVariant?: HeaderVariations
    children?: React.ReactNode,
}

// Tree shaking purposes
const headerAnimationFunctionMap : { [key: string] : (headeRef: HTMLElement, navRef:HTMLElement) => void} = {
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

const HeaderWrapper2 = ({animationVariant, children}: Props) => {
    const {active, shifitngMainContent, screenWidth, setScreenWidth, 
        navRef, animationVariant: contextAnimationVariant} = useContext(HeaderContext);
    const headerRef = useRef<HTMLElement>(null)
    const animationVariantVar = animationVariant ?? contextAnimationVariant
    useEffect(() => {
        if(shifitngMainContent){
            const handleResize = () => {
                setScreenWidth!(window.innerWidth)
            } 
            window.addEventListener('resize', handleResize)
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        }
    },[])
    useEffect(() => {
        if(active){
            if(animationVariantVar && headerAnimationFunctionMap[animationVariantVar]){
                headerAnimationFunctionMap[animationVariantVar](headerRef.current!, navRef!.current!)
            }
        }else{
            requestAnimationFrame(() => {
                headerRef.current!.style.transform = `translate(0, 0)`
            })
        }
    }, [active])
    if(shifitngMainContent){
        return(
        <>
             {screenWidth < 800 && shifitngMainContent}
            <header ref={headerRef} className={`flex sticky top-0 w-full transition-all duration-500 bg-white z-50`}>
                {children}
            </header>
        </>
    )}
    return (
        <>
            <HeaderContextProvider animationVariant={animationVariant!}>
                <header ref={headerRef} className={`flex sticky top-0 w-full transition-all duration-500 bg-white z-50`}>
                    {children}
                </header>
            </HeaderContextProvider>
        </>
    )
}

export default HeaderWrapper2