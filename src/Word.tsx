import React ,{ FC, useEffect, useState } from "react"

interface Props {
    id: number
}

const Word: FC<Props> = (props) => {

    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        fetchData(props.id)
        alert(props.id)
        return () => alert(props.id)
    }, [props.id])

    const fetchData = (id: number) => {}

    return (
        <div>
            <p>ID: {props.id}</p>
            <p onClick={() => setCount(count + 1)}>Count: {count}</p>
        </div>
    )
}

export default Word;