// ******************************
// crossLeft - default, fries, strawberry, messy, twoBars
// crossRight - default, messy, twoBars
// crossMiddle - default, messy, twoBars, strawberry(Unique look) fries(Unique look)
// crissCross - strawberry, default(meh), twoBars, messy(meh) fries(meh)
// crissCrossSnap - messy, strawberry(meh)
// shrinkIn - default
// ******************************
// fix cross animation by using transform-origin left middle(original tailwind version implemented wrong)
// seperate svg from div hamburgers maybe
// ******************************
import { VariantProps, cva } from 'class-variance-authority'
import React, { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Intros = string
type Speeds = 'slow' | 'fast' | 'instant' | number
type Sizes = 'small' | 'large' | 'xl' | number
type Thickness = 'thin' | 'medium' | 'thick' | number
type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & 
    VariantProps<typeof buttonVariants> & 
    VariantProps<typeof svgContainerVarient> & 
    {
        active: boolean,
        size?: Sizes,
        gap?: Sizes
        thickness?: Thickness
        MenuToCloseSpeed?: Speeds,
        CloseToMenuSpeed?: Speeds,
        introAnimation?: Intros,
        introAnimationSpeed?: Speeds,
        hideBehindNav?: true,
        stayInPlace?: {type: 'left' | 'right', navRef: HTMLElement}
    }

const buttonVariants = cva(
    // Base styles
    [
        'flex flex-col w-[--hamburger-width] gap-[--hamburger-gap] relative z-[--hamburger-Zindex]'
    ], {
    variants: {
        active: {
            true: [],
        },
        animationType: {
            crossLeft: [],
            crossRight: [],
            crossMiddle: [],
            crissCross: [],
            crissCrossSnap: [],
            shrinkIn: [],
            breakAway: '',
            breakAwaySpin: '',
            svgSwirl: '',
            svgSwirlSpin: ''
        },
        background: {
            none: []
        }
    }
})

const svgContainerVarient = cva(
    // Base styles
    [
        'w-[var(--hamburger-width)] aspect-square overflow-hidden'
    ], {
    variants: {
        active: {
            true: []
        },
        animationType: {
            svgSwirl: '',
            svgSwirlSpin: ''
        },
        rounded: {
            true: ['rounded-full'],
            false: ['rounded-none']
        }
    },
    compoundVariants: [
        
      ],
    defaultVariants: {
        rounded: true
    }
})

const SvgHamburgerMenu = (({
    active, className, thickness, size, animationType, background, gap, hideBehindNav, stayInPlace,
    rounded, MenuToCloseSpeed, CloseToMenuSpeed, introAnimationSpeed, introAnimation, ...rest}: Props) => {
    const hamburgerRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if(active){
            if(stayInPlace && stayInPlace.type === 'left'){
                requestAnimationFrame(() => {
                    hamburgerRef.current!.style.transform = `translate(-${stayInPlace.navRef.offsetWidth}px, 0)`
                })
            }
            if(stayInPlace && stayInPlace.type === 'right'){
                requestAnimationFrame(() => {
                    hamburgerRef.current!.style.transform = `translate(${stayInPlace.navRef.offsetWidth}px, 0)`
                })
            }
        }else{
            if(stayInPlace){
                requestAnimationFrame(() => {
                    hamburgerRef.current!.style.transform = 'translate(0, 0)'
                })
            }
        }
    }, [active])
    // ****************************************
    // block around it? circle block?
    // rounded/non-rounded bars
    // bounce in on hover
    // hover on mobile is click
    // remove fries from top bar and rest of wasted types - maybe from added all typofs to types
    // border/hollow bars
    // entire border works different on svg
    // optional animate ring border?
    // ****************************************
    const getSize = (size?: Sizes): number => {
        switch(true){
            case size === 'small':
                return 24
            case size === 'large':
                return 32
            case size === 'xl':
                return 44
            case typeof(size) === 'number':
                return size as number
            default:
                return 28
        }
    }
    const getSpeed = (speed?: Speeds): number => {
        switch(true){
            case speed === 'fast':
                return 150
            case speed === 'instant':
                return 0
            case speed === 'slow':
                return 600
            case typeof(speed) === 'number':
                return speed as number
            default:
                return 300
        }
    }
    const getGap = (size?: Sizes, gap?: Sizes): number => {
        switch(true){
            case gap === 'small' || (!gap && size === 'small'):
                return 5
            case gap === 'large' || (!gap && size === 'large'):
                return 7
            case gap === 'xl' || (!gap && size === 'xl'):
                return 11
            case typeof(gap) === 'number':
                return gap as number;
            default:
                return 6
        }
    }
    const getThickness = (size?: Sizes, thickness?: Thickness): number => {
        switch(true){
            case thickness === 'thin' || (!thickness && size === 'small'):
                return 2;
            case thickness === 'medium' || (!thickness && size === 'large'):
                return 4;
            case thickness === 'thick' || (!thickness && size === 'xl'):
                return 5;
            case typeof(thickness) === 'number':
                return thickness as number;
            default:
                return 3
        }
    }
    const width = getSize(size)
    const height = (getThickness(size, thickness) * 3) + (getGap(size, gap) * 2)
    const pythagFromMin = Math.min(width, height)
    const widthX = Math.sqrt(Math.pow(pythagFromMin, 2) + Math.pow(pythagFromMin, 2))
    const cssVariables = {
        '--hamburger-gap': `${getGap(size, gap)}px`,
        '--hamburger-width': `${width}px`,
        '--hamburger-thickness': `${getThickness(size, thickness)}px`,
        '--hamburger-height' : `${height}px`,
        '--hamburger-x-width': `${widthX}px`,
        '--hamburger-x-offsetX': `${(width/2) - (widthX/2) - 1}px`,
        '--hamburger-toClose-speed': `${getSpeed(MenuToCloseSpeed)}ms`,
        '--hamburger-toMenu-speed': `${getSpeed(CloseToMenuSpeed)}ms`,
        '--hamburger-Zindex': hideBehindNav ? 0 : 10
    } as React.CSSProperties
    return (
        <button style={cssVariables} ref={hamburgerRef} className={twMerge(buttonVariants({active, animationType, background, className}))} {...rest}>
                <div className={twMerge(svgContainerVarient({active, rounded}))}>
                    {(animationType === 'svgSwirl' || animationType === undefined) &&
                        <svg viewBox="0 0 100 100" className={`${active && 'rotate-45'} transition-all w-full h-full scale-150 duration-500`}>
                            <path className='transition-all duration-500' fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'white'}
                                strokeDasharray={'40 121'} strokeDashoffset={`${active && '-68px'}`} d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                            <path className='transition-all duration-500' fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'white'} d="m 70,50 h -40" />
                            <path className='transition-all duration-500' fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'white'}
                                strokeDasharray={'40 121'} strokeDashoffset={`${active && '-68px'}`} d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                        </svg>
                    }
                    {animationType === 'svgSwirlSpin' &&
                        <svg viewBox="0 0 100 100" className={`${active && 'rotate-45'} transition-all w-full h-full scale-150 duration-500`}>
                            <path className='transition-all duration-500' fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'black'} strokeDasharray={'40 160'} strokeDashoffset={`${active && '-64px'}`} d="m 30,33 h 40 c 3.722839,0 7.5,3.126468 7.5,8.578427 0,5.451959 -2.727029,8.421573 -7.5,8.421573 h -20" />
                            <path fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'black'} d="m 30,50 h 40" className={`origin-[50%] transition-all duration-500 ${active && 'rotate-90'}`} strokeDasharray={'40 142'}/>
                            <path fill='none' strokeWidth={'var(--hamburger-thickness)'} stroke={'black'} strokeDasharray={'40 85'} strokeDashoffset={`${active && '-64px'}`} className='origin-[50%] transition-all duration-500'
                                d="m 70,67 h -40 c 0,0 -7.5,-0.802118 -7.5,-8.365747 0,-7.563629 7.5,-8.634253 7.5,-8.634253 h 20" />
                        </svg>
                    }
                </div>
        </button>
    )
})

export default SvgHamburgerMenu