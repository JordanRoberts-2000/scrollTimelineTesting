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
    VariantProps<typeof barOneVarient> & 
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
        stayInPlace?: 'left' | 'right'
    }

const buttonVariants = cva(
    // Base styles
    [
        'flex flex-col w-[--hamburger-width] gap-[--hamburger-gap] border relative z-[--hamburger-Zindex]'
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
        },
        background: {
            none: []
        }
    }
})

const barOneVarient = cva(
    // Base styles
    [
        'bg-black duration-[--hamburger-toMenu-speed] transition-all h-[--hamburger-thickness]'
    ], {
    variants: {
        variant: {
            fries: ['w-full'],
            default: ['w-full'],
            strawberry: ['w-full'],
            twoBars: ['w-full'],
            messy: ['w-[50%]'],
        },
        active: {
            true: [],
        },
        animationType: {
            crossLeft: [],
            crossRight: [],
            crossMiddle: [],
            crissCross: [],
            crissCrossSnap: [],
            shrinkIn: ['mx-auto'],
            breakAway: 'hidden',
            breakAwaySpin: 'hidden',
        },
        rounded: {
            true: ['rounded-full'],
            false: ['rounded-none']
        }
    },
    compoundVariants: [
        {
          animationType: ["crossLeft", 'crossRight', 'crossMiddle'],
          active: true,
          class: ['duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX]',
           'translate-y-[calc((var(--hamburger-height)/2)+(var(--hamburger-thickness)/-2))] rotate-45']
        },
        {
            animationType: ['crossRight'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX]',
             'translate-y-[calc((var(--hamburger-height)/2)+(var(--hamburger-thickness)/-2))] rotate-[-45deg]']
        },
        {
            animationType: ['crissCross'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX]',
             'translate-y-[calc((var(--hamburger-height)/2)+(var(--hamburger-thickness)/-2))] rotate-[-45deg]']
        },
        {
            animationType: ['crissCrossSnap', 'breakAway'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] w-[calc(var(--hamburger-x-width)/2)] rotate-45',
            ' translate-x-[calc((var(--hamburger-width)/2)-(var(--hamburger-x-width)/2)-1px)]',
            'tempOriginRight rounded-e-none translate-y-[calc((var(--hamburger-height)/2)-(var(--hamburger-thickness)/2)-1px)]']
        },
        {
            animationType: ['shrinkIn'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] w-0 opacity-0 translate-y-[calc(var(--hamburger-height)/2)]']
        },
      ],
    defaultVariants: {
        variant: 'default',
        animationType: "crossLeft",
        rounded: true
    }
})

const barTwoVarient = cva(
    [
        'bg-black duration-[calc(var(--hamburger-toMenu-speed)*.8)] transition-all h-[--hamburger-thickness]'
    ], {
    variants: {
        variant: {
            fries: 'w-[75%]',
            default: 'w-full',
            strawberry: 'w-[65%]',
            twoBars: 'hidden',
            messy: 'w-full',
        },
        active: {
            true: '',
        },
        animationType: {
            crossLeft: '',
            crossRight: 'ml-auto',
            crossMiddle: 'mx-auto',
            crissCross: '',
            crissCrossSnap: '',
            shrinkIn: '',
            breakAway: 'hidden',
            breakAwaySpin: 'hidden',
        },
        rounded: {
            true: ['rounded-full'],
            false: ['rounded-none']
        }
    },
    compoundVariants: [
        {
          animationType: ["crossLeft", "crossRight"],
          active: true,
          class: 'opacity-0 w-0 duration-[--hamburger-toClose-speed]',
        },
        {
            animationType: ["crossMiddle"],
            active: true,
            class: 'w-0 duration-[--hamburger-toClose-speed]',
        },
        {
            animationType: ["crissCross", 'crissCrossSnap'],
            active: true,
            class: 'duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX] rotate-[-45deg]'
        },
        {
            animationType: ['shrinkIn'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] rotate-[-45deg]']
        },
      ],
    defaultVariants: {
        variant: 'default',
        animationType: "crossLeft",
        rounded: true
    }
})

const barThreeVarient = cva(
    // Base styles
    [
        'bg-black duration-[--hamburger-toMenu-speed] transition-all h-[--hamburger-thickness]'
    ], {
    variants: {
        variant: {
            fries: ['w-full'],
            default: ['w-full'],
            strawberry: ['w-[65%]'],
            twoBars: ['w-full'],
            messy: ['w-[70%]'],
        },
        active: {
            true: []
        },
        animationType: {
            crossLeft: [],
            crossRight: [],
            crossMiddle: [],
            crissCross: [],
            crissCrossSnap: [],
            shrinkIn: ['mx-auto'],
            breakAway: 'hidden',
            breakAwaySpin: 'hidden',
        },
        rounded: {
            true: ['rounded-full'],
            false: ['rounded-none']
        }
    },
    compoundVariants: [
        {
          animationType: ["crossLeft", 'crossRight', 'crossMiddle'],
          active: true,
          class: 
          'duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX] rotate-[-45deg] translate-y-[calc((var(--hamburger-height)/-2)+(var(--hamburger-thickness)/2))]'
        },
        {
            animationType: ['crossRight'],
            active: true,
            class: 
            'duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX] rotate-[45deg] translate-y-[calc((var(--hamburger-height)/-2)+(var(--hamburger-thickness)/2))]'
        },
        {
            animationType: ["crissCross"],
            active: true,
            class: 'duration-[--hamburger-toClose-speed] w-[--hamburger-x-width] translate-x-[--hamburger-x-offsetX] rotate-[45deg] translate-y-[calc((var(--hamburger-height)/-2)+(var(--hamburger-thickness)/2))]'
        },
        {
            animationType: ['crissCrossSnap'],
            active: true,
            class: 
            ['duration-[--hamburger-toClose-speed] w-[calc(var(--hamburger-x-width)/2)] rotate-45',
            'tempOrigin rounded-s-none translate-x-[calc((var(--hamburger-width)/2))] translate-y-[calc((var(--hamburger-height)/-2)+((var(--hamburger-thickness))/2))]']
        },
        {
            animationType: ['shrinkIn'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] w-0 opacity-0 translate-y-[calc(var(--hamburger-height)/-2)]']
        },
      ],
    defaultVariants: {
        variant: 'default',
        animationType: "crossLeft",
        rounded: true
    }
})

const barFourVarient = cva(
    // Base styles
    [
        'w-full duration-[--hamburger-toMenu-speed] transition-all h-[--hamburger-thickness] opacity-0 bg-black absolute',
        'left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] absolute'
    ], {
    variants: {
        variant: {
            fries: [],
            default: [],
            strawberry: [],
            twoBars: [],
            messy: [],
        },
        active: {
            true: []
        },
        animationType: {
            crossLeft: [],
            crossRight: [],
            crossMiddle: [],
            crissCross: [],
            crissCrossSnap: [],
            shrinkIn: ['opacity-100'],
            breakAway: 'hidden',
            breakAwaySpin: 'hidden',
        },
        rounded: {
            true: ['rounded-none'],
            false: ['rounded-none']
        }
    },
    compoundVariants: [
        {
            animationType: ['shrinkIn'],
            active: true,
            class: ['duration-[--hamburger-toClose-speed] rotate-[45deg]']
        },
      ],
    defaultVariants: {
        variant: 'default',
        animationType: "crossLeft",
        rounded: true
    }
})

const HamburgerMenu = (({
    active, className, variant, thickness, size, animationType, background, gap, hideBehindNav, stayInPlace,
    rounded, MenuToCloseSpeed, CloseToMenuSpeed, introAnimationSpeed, introAnimation, ...rest}: Props) => {
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
    const hamburgerRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if(active){
            if(stayInPlace === 'left'){
                requestAnimationFrame(() => {
                    hamburgerRef.current!.style.transform = 'translate(-200px, 0)'
                })
            }
            if(stayInPlace === 'right'){
                requestAnimationFrame(() => {
                    hamburgerRef.current!.style.transform = 'translate(200px, 0)'
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
    const height = (getThickness(size, thickness) * (variant === 'twoBars' ? 2 : 3)) + (getGap(size, gap) * (variant === 'twoBars' ? 1 : 2))
    console.log(height)
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
            {(animationType === 'breakAway' || animationType === 'breakAwaySpin') ?
                <div className={`w-full h-[--hamburger-height] flex flex-col gap-[--hamburger-gap] duration-[--hamburger-toClose-speed] ${(active && animationType === 'breakAwaySpin') && 'rotate-90'}`}>
                    <div className='w-full h-[--hamburger-thickness] flex'>
                        <div className={`h-[--hamburger-thickness] w-[50%] bg-black ml-auto tempOriginRight duration-[--hamburger-toClose-speed] ${active && "w-[calc(var(--hamburger-x-width)/2)] rotate-45 translate-y-[calc((var(--hamburger-height)/2)-((var(--hamburger-thickness))/2))]"}`}></div>
                        <div className={`h-[--hamburger-thickness] w-[50%] duration-[--hamburger-toClose-speed] bg-black ${active && " w-[calc(var(--hamburger-x-width)/2)] tempOrigin mr-auto rotate-[-45deg] translate-y-[calc((var(--hamburger-height)/2)-((var(--hamburger-thickness))/2))]"}`}></div>
                    </div>
                    <div className='w-full h-[--hamburger-thickness] flex'>
                        <div className={`h-[--hamburger-thickness] duration-[--hamburger-toClose-speed] w-[50%] bg-black ${active && "translate-x-[-100%] opacity-0"}`}></div>
                        <div className={`h-[--hamburger-thickness] duration-[--hamburger-toClose-speed] w-[50%] bg-black ${active && "translate-x-[100%] opacity-0"}`}></div>
                    </div>
                    <div className='w-full h-[--hamburger-thickness] flex'>
                        <div className={`h-[--hamburger-thickness] duration-[--hamburger-toClose-speed] w-[50%] bg-black ${active && " w-[calc(var(--hamburger-x-width)/2)] ml-auto tempOriginRight rotate-[-45deg] translate-y-[calc((var(--hamburger-height)/-2)+((var(--hamburger-thickness))/2))]"}`}></div>
                        <div className={`h-[--hamburger-thickness] duration-[--hamburger-toClose-speed] w-[50%] bg-black ${active && " w-[calc(var(--hamburger-x-width)/2)] tempOrigin mr-auto rotate-[45deg] translate-y-[calc((var(--hamburger-height)/-2)+((var(--hamburger-thickness))/2))]"}`}></div>
                    </div>
                </div>
                :
                <>
                    <span className={twMerge(barOneVarient({variant, active, animationType, rounded}))}></span>
                    <span className={twMerge(barTwoVarient({variant, active, animationType, rounded}))}></span>
                    <span className={twMerge(barThreeVarient({variant, active, animationType, rounded}))}></span>
                    <span className={twMerge(barFourVarient({variant, active, animationType, rounded}))}></span>
                </>
            }
        </button>
    )
})

export default HamburgerMenu