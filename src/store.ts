import { atom, selector } from "recoil"

export enum STATE {
    FONT_SIZE = "FONT_SIZE",
    FONT_SIZE_PX = "FONT_SIZE_PX"
}

export const fontSizeState = atom({
    key: STATE.FONT_SIZE,
    default: 10
})

export const fontSizePx = selector({
    key: STATE.FONT_SIZE_PX,
    get: ({ get }) => `${get(fontSizeState)}px`
})