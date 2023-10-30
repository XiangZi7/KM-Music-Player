import {Button, Card, CardFooter, CardHeader, Image, ScrollShadow} from "@nextui-org/react";
import {useRef, useEffect, useState} from 'react'

export default function Ml() {
    const divRef = useRef(null);
    const [mlBox, setMlBox] = useState(0);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (divRef.current) {
            const width = divRef.current.getBoundingClientRect().width;
            setMlBox(width);
            setData([...Array(50)]);
        }
    }, []);

    return (
        <>
            <div
                ref={divRef}
                className="w-full h-[35vh] rounded-2xl px-2 py-5"
            >
                <ScrollShadow orientation="horizontal" style={{maxWidth: `${mlBox - 16}px`}}
                              className="max-h-[300px] app-card-bf">
                    <div className="flex flex-nowrap gap-4">
                        {data.map((item, idx) => (
                            <div key={idx}>{idx}</div>
                        ))}
                    </div>
                </ScrollShadow>
            </div>
        </>
    );
}