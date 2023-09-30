import { atom } from "jotai";

export const modalAtom = atom<boolean>(false)
export const setModelAtom = atom(
    null,
    (_get, set, input: boolean) => {
        set(modalAtom, input)
    }
)

export const navbarAtom = atom<boolean>(false)
export const setNavbarAtom = atom(
    null,
    (_get, set, input: boolean) => {
        set(navbarAtom, input)
    }
)