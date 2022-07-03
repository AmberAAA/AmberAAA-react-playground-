import { useEffect, useState } from "react"

export const useCount = (num:number = 0) => {
    const [ state, setState ] = useState(num);
    useEffect(() => {
        const add = () => {
            console.log(state)
            setState(e => e + 1)
        };
        document.addEventListener("click", add);
        return () => document.removeEventListener("click", add)
    }, [])
    return state
}