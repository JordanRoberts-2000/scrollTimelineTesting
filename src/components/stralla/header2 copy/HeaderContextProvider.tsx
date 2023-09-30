import React, { createContext, useRef, useState } from 'react';
import { HeaderVariations, HeaderShifingVariants } from './HeaderTypings';

type Props = {
    children: React.ReactNode,
    animationVariant: HeaderVariations | HeaderShifingVariants,
    shifitngMainContent?: React.ReactNode
}

type HeaderContext = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>> | null,
    navRef: React.RefObject<HTMLDivElement> | null,
    animationVariant: HeaderVariations | HeaderShifingVariants | null,
    screenWidth: number,
    setScreenWidth: React.Dispatch<React.SetStateAction<number>> | null,
    shifitngMainContent: null | React.ReactNode | undefined,
    navCount: React.RefObject<number> | null,
    updateNavCount: (arg1: number) => void
}
export const HeaderContext = createContext<HeaderContext>({
    active: false,
    setActive: null,
    navRef: null,
    animationVariant: null,
    screenWidth: window.innerWidth,
    setScreenWidth: null,
    shifitngMainContent: null,
    navCount: null,
    updateNavCount: () => {}
});

const HeaderContextProvider = ({children, animationVariant, shifitngMainContent}: Props) => {
    const navRef = useRef(null);
    let navCount = useRef(0);
    const updateNavCount = (value: number) => {
        navCount.current = value;
      };
    const [active, setActive] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    return (
        <HeaderContext.Provider value={{navRef, active, setActive, animationVariant, screenWidth, 
            setScreenWidth, shifitngMainContent, navCount, updateNavCount}}>
            {children}
        </HeaderContext.Provider>
    );
}

export default HeaderContextProvider