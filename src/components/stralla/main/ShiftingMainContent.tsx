import { VariantProps, cva } from "class-variance-authority"
import { useEffect, useRef } from "react"
import { twMerge } from "tailwind-merge"
import { HeaderShifingVariants } from "../../ui/header/Header"

type Props = React.HTMLAttributes<HTMLElement> & 
    VariantProps<typeof variants> & {
        active: boolean,
        children: React.ReactNode,
        animationVariant?: HeaderShifingVariants,
        navRef: React.RefObject<HTMLElement>
}

const variants = cva(
    // Base styles
    [
        'bg-red-100 transition-all overflow-y-auto duration-500 -z-20'
    ], {
    variants: {
        variant: {
            shift: [''],
            shiftShrink: [],
        },
        active: {
            true: [''],
        }
    },
    compoundVariants: [
        {
            variant: ['shift',],
            active: true,
            class: ['']
        },
        {
            variant: ['shiftShrink'],
            active: true,
            class: ['']
        },
    ],
    defaultVariants: {
        variant: 'shift',
    }
})

const shiftingAnimate : { [key: string] : (ref: HTMLElement, navRef: HTMLElement) => void} = {
    revealLeft: (ref, navRef) => {
        requestAnimationFrame(() => {
            ref!.style.transform = `translate(${navRef.offsetWidth}px, 0) scale(1)`
        })
    },
    revealRight: (ref, navRef) => {
        requestAnimationFrame(() => {
            ref.style.transform = `translate(-${navRef.offsetWidth}px, 0)`
        })
    },
    revealLeftTakeHeader: (ref, navRef) => {
        requestAnimationFrame(() => {
            ref!.style.transform = `translate(${navRef.offsetWidth}px, 0) scale(1)`
        })
    },
    revealRightTakeHeader: (ref, navRef) => {
        requestAnimationFrame(() => {
            ref.style.transform = `translate(-${navRef.offsetWidth}px, 0)`
        })
    }
};

const ShiftingMainContent = ({children, active, variant, className, animationVariant, navRef}: Props) => {
    const slidingRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if(active){
            if(animationVariant && shiftingAnimate[animationVariant]){
                shiftingAnimate[animationVariant](slidingRef.current!, navRef.current!)
            }
        }else{
            requestAnimationFrame(() => {
                slidingRef.current!.style.transform = `translate(0, 0) scale(1)`
            })
        }
    }, [active])
    return (
        <div ref={slidingRef} className={twMerge(variants({variant, active, className}))}>
            {children}
        </div>
    )
}

export default ShiftingMainContent