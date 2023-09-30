import React from 'react'

import { HeaderShifingVariants } from '../../ui/header/Header'
import ShiftingMainContent2 from './ShiftingMainContent2'
import HeaderContextProvider from './HeaderContextProvider'

type Props = {
    children: React.ReactNode,
    headerElement: React.ReactNode,
    navElement: React.ReactNode,
    animationVariant: HeaderShifingVariants
}

const HeaderAndShiftingMain2 = ({children, headerElement, navElement, animationVariant}: Props) => {
    return (
        <HeaderContextProvider animationVariant={animationVariant} shifitngMainContent={navElement}>
            {headerElement}
            <ShiftingMainContent2 animationVariant={animationVariant}>
                {children}
            </ShiftingMainContent2>
        </HeaderContextProvider>
    )
}

export default HeaderAndShiftingMain2