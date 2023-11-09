import React, {useState, useEffect, useRef, useContext} from 'react'
import Popular from './Popular'
import './style.scss'
export default function Test() {


    return (
        <div className="text flx items-center justify-center h-full">
            <h2>Popular</h2>
            <Popular/>
        </div>
    );
}