import React, { useState, useEffect } from 'react';
import { serverCalls } from '../api';

export const useFetch = () => {
    const [charData, setData] = useState<any>([])

    async function handleFetch(){
        const res = await serverCalls.get();
        setData(res)
    }

    useEffect(() => {handleFetch()},[])

    return {charData, handleFetch:handleFetch}
}