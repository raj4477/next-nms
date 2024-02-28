'use client'
import React, { useEffect, useState } from 'react';
import * as style from './style.module.css'
import { getCookie } from 'cookies-next';

const DataComponent = () => {
    const [data, setData] = useState([])
    let userEmail = getCookie('email')
    const getNotice = async () => {
        try {
            const response = await fetch("https://e-suchana-backend.cyclic.app//api/fetchnotice/"+userEmail, {
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer ' + getCookie('token')
                }
              })
            const result = await response.json()
            if(result.error){
                return 
            }
            setData(result)
            console.log(result)
            console.log(data);
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(
        ()=>{
            getNotice()
        }
        , [])
    function comp(data) {
        return (<div className={style.datacontainer}>
            <div className={style.data}>
                <div className={style.datarow}>
                    <span className={style.label}>Heading:</span>
                    <span className={style.value}>{data.heading}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Date:</span>
                    <span className={style.value}>{data.date}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Department:</span>
                    <span className={style.value}>{data.department}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Level:</span>
                    <span className={style.value}>{data.level}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Note:</span>
                    <span className={style.value}>{data.note}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Time:</span>
                    <span className={style.value}>{data.time}</span>
                </div>
            </div>
            {data.image == null ? "" :
                <div className={style.imagecontainer}>
                    <img src={`https://e-suchana-backend.cyclic.app//${data.image}`} alt="Demo" className={style.image} />
                </div>
            }
        </div>);
    }
    // const data = {
    //     date: "Feb 26, 2024",
    //     department: "all",
    //     heading: "demo",
    //     image: "17a0df3e-0134-4cb1-aa6a-f1e7d14637f8.jpg",
    //     level: 2,
    //     note: "demo",
    //     time: "5:18 PM"
    //   };
    return (
        <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                {
                    data.map(d => {
                        console.log("--")
                        console.log(d)
                        return comp(d)
                    })
                }
            </div>
        </div>

    );


};

export default DataComponent;
