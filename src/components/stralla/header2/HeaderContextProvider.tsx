import React, { createContext, useRef, useState } from 'react';
import { HeaderVariations, HeaderShifingVariants } from './HeaderTypings';

type Props = {
    children: React.ReactNode,
    animationVariant: HeaderVariations | HeaderShifingVariants,
    shifitngMainContent?: true
}

type HeaderContext = {
    active: boolean,
    setActive: React.Dispatch<React.SetStateAction<boolean>> | null,
    navRef: React.RefObject<HTMLDivElement> | null,
    animationVariant: HeaderVariations | HeaderShifingVariants | null,
    screenWidth: number,
    setScreenWidth: React.Dispatch<React.SetStateAction<number>> | null,
    shifitngMainContent?: true,
}
export const HeaderContext = createContext<HeaderContext>({
    active: false,
    setActive: null,
    navRef: null,
    animationVariant: null,
    screenWidth: window.innerWidth,
    setScreenWidth: null,
    shifitngMainContent: undefined,
});

const HeaderContextProvider = ({children, animationVariant, shifitngMainContent}: Props) => {
    const navRef = useRef(null);
    const [active, setActive] = useState(false)
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    return (
        <HeaderContext.Provider value={{navRef, active, setActive, animationVariant, screenWidth, 
            setScreenWidth, shifitngMainContent}}>
            {children}
        </HeaderContext.Provider>
    );
}

export default HeaderContextProvider