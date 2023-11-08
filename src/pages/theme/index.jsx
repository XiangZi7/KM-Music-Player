import axios from 'axios'
import {useEffect, useState} from 'react'

export default function Theme() {

    const [colorsList, setColor] = useState([])

    useEffect(() => {
        axios.get(import.meta.env.VITE_ColorAPI_URL + "/colorsList").then(({data}) => {
            setColor(data)
        })
    }, [])

    return (
        <>
           theme
        </>
    );
}
