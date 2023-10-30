import axios from 'axios'
import {Card, CardBody, CardFooter, Image, ScrollShadow} from "@nextui-org/react";
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
            <ScrollShadow className="w-full h-[500px] " hideScrollBar >
                <div className="gap-3 grid grid-cols-2 sm:grid-cols-5">
                    {colorsList.map((item, index) => (
                        <Card shadow="sm" key={index} isPressable onPress={() => console.log("item pressed")}>
                            <CardBody className="overflow-visible p-0">
                                <div style={{backgroundColor: item.hex}}
                                     className={`w-full object-cover h-[140px]`}></div>
                            </CardBody>
                            <CardFooter className="text-small justify-between flex-col">
                                <b>{item.hex}</b>
                                <p className="text-default-500">{item.name}({item.pinyin})</p>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </ScrollShadow>
        </>
    );
}
