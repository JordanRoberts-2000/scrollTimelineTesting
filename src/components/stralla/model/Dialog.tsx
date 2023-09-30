import { useRef, useLayoutEffect, cloneElement, useMemo, KeyboardEvent, MouseEvent } from "react"
import { useAtom } from 'jotai'
import { modalAtom } from '../../../store/store'

type DialogProps = {
    children: React.ReactNode,
}

const Dialog = ({children}: DialogProps) => {
    const [open, setOpen] = useAtom(modalAtom)
    const modalRef = useRef<HTMLDialogElement>(null) 
    const cssVariables = {
        '--backdropSpeedIn': `5s`,
    } as React.CSSProperties
    const closeModal = () => {
        modalRef.current!.close()
        modalRef.current!.removeEventListener('transitionend', closeModal)
        modalRef.current!.style.transform = ''
        modalRef.current!.style.opacity = ''
    }
    const handleKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
        if(e.key === "Escape"){
            e.preventDefault()
            setOpen(false)
        }
    }
    const handleOnClick = (e: MouseEvent<HTMLDialogElement, globalThis.MouseEvent>) => {
        const dialogPositions = modalRef.current!.getBoundingClientRect()
        if(
            e.clientX < dialogPositions.left ||
            e.clientX > dialogPositions.right ||
            e.clientY < dialogPositions.top ||
            e.clientY > dialogPositions.bottom
            ){
            setOpen(false)
        }
    }
    useLayoutEffect(() => {
        if(modalRef.current){
            if(open && !modalRef.current!.open){
                modalRef.current.showModal()
                requestAnimationFrame(() => {
                    modalRef.current!.style.transform = `translate(-50%, -50%) scale(1)`
                    modalRef.current!.style.opacity = '100%'
                })
            }else if(!open && modalRef.current.open){
                modalRef.current!.addEventListener('transitionend', closeModal)
                modalRef.current!.classList.add('hide')
                requestAnimationFrame(() => {
                    modalRef.current!.style.transform = `translate(-50%, -50%) scale(0.75)`
                    modalRef.current!.style.opacity = '0%'
                })
            }
        }
    }, [open])
    const getMemodChildrenWithProps = useMemo(() => {
        return cloneElement(children as React.ReactElement<any>, { setOpen: setOpen })
    },[])
    return (
        <dialog style={cssVariables} ref={modalRef} onKeyDown={(e) => handleKeyDown(e)} onClick={(e) => handleOnClick(e)}
            className={`top-1/2 left-1/2 dialog backdrop:bg-black/30 backdrop:backdrop-blur-sm translate-y-[100%] translate-x-[-50%] 
                transition-all opacity-0 scale-75 block backdrop:transition-all open:backdrop:animate-[fadeIn_.2s_ease_normal]
                ${!open && 'backdrop:opacity-0'}`}>
            {getMemodChildrenWithProps}
        </dialog>
    )
}

export default Dialog