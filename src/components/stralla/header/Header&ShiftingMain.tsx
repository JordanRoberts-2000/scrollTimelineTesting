import React, { useRef, useState } from 'react'
import ShiftingMainContent from '../main/ShiftingMainContent'
import { HeaderShifingVariants } from '../../ui/header/Header'

type Props = {
    children: React.ReactNode,
    headerElement: React.ReactNode,
    animationVariant: HeaderShifingVariants
}

const HeaderAndShiftingMain = ({children, headerElement, animationVariant}: Props) => {
    const [activeProp, activeSetterProp] = useState(false) 
    const navRef = useRef<HTMLElement>(null)
    const headerElementWithProps = React.cloneElement(headerElement as React.ReactElement<any>, 
        { 
            activeProp: activeProp,
            activeSetterProp: activeSetterProp,
            animationVariant: animationVariant,
            shifitngMainContent: true,
            navReference: navRef
        }) 
    return (
        <>
            {headerElementWithProps}
            <ShiftingMainContent navRef={navRef} active={activeProp} animationVariant={animationVariant}>
                {children}
            </ShiftingMainContent>
        </>
    )
}

export default HeaderAndShiftingMain