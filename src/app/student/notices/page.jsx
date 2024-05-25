'use client'
import React, { MouseEvent,useEffect, useState } from 'react';
import * as style from './style.module.css'
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import Script from 'next/script';
import link from '../../../../backendlink';

const MAGNIFIER_SIZE = 200;
const ZOOM_LEVEL = 2.5;

const DataComponent = () => {
    const [data, setData] = useState([])
    let userEmail = getCookie('email')
    const getNotice = async () => {
        try {
            const response = await fetch(link+"api/fetchnotice/" + userEmail, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            })
            const result = await response.json()
            if (result.error) {
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
        () => {
            getNotice()
        }
        , [])
    const [zoomable, setZoomable] = useState(true);
    const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
    const [position, setPosition] = useState({ x: 100, y: 100, mouseX: 0, mouseY: 0 });

    // Event handlers
    const handleMouseEnter = (e) => {
        let element = e.currentTarget;
        let { width, height } = element.getBoundingClientRect();
        setImageSize({ width, height });
        setZoomable(true);
        updatePosition(e);
    };

    const handleMouseLeave = (e) => {
        setZoomable(false);
        updatePosition(e);
    };

    const handleMouseMove = (e) => {
        updatePosition(e);
    };

    const updatePosition = (e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();
        let x = e.clientX - left;
        let y = e.clientY - top;
        setPosition({
            x: -x * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            y: -y * ZOOM_LEVEL + (MAGNIFIER_SIZE / 2),
            mouseX: x - (MAGNIFIER_SIZE / 2),
            mouseY: y - (MAGNIFIER_SIZE / 2),
        });
    };
    function comp(data,index) {
        return (<div className={style.datacontainer}>
            <div className={style.data}>
                <div className={style.datarow}>
                    <span className={style.label}>Heading:</span>
                    <span className={style.value}>{data.heading}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Date & Time:</span>
                    <span className={style.value}>{data.date + " " + data.time}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Department:</span>
                    <span className={style.value}>{data.department}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Note:</span>
                    <span className={style.value}>{data.note}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>From:</span>
                    <span className={style.value}>{data.from || ""}</span>
                </div>
                <div className={style.datarow}>
                    <span className={style.label}>Source:</span>
                    <span className={style.value}>{data.fromdepartment || ""}</span>
                </div>
            </div>
              {data.image == null ? "" :
                <>
                    <div className={style.imagecontainer}>
                        <img src={`${data.image}`} id={`${index}`} alt="Notice Image" className={style.image} />
                    </div>
                    <Script id={"my-script"+index}>{`
                    console.log(${index});
                    let myDocument${index} = document.getElementById(${index});
                    let my${index} = false
                    myDocument${index}.addEventListener("click", ()=>{
                            if(my${index} === false){
                            if (myDocument${index}.requestFullscreen) {
                                myDocument${index}.requestFullscreen();
                            } 
                            else if (myDocument${index}.msRequestFullscreen) {
                                myDocument${index}.msRequestFullscreen();
                            } 
                            else if (myDocument${index}.mozRequestFullScreen) {
                                myDocument${index}.mozRequestFullScreen();
                            }
                            else if(myDocument${index}.webkitRequestFullscreen) {
                                myDocument${index}.webkitRequestFullscreen();
                            }
                            my${index} = true
                        }
                        else if(my${index} === true){
                            if(document.exitFullscreen) {
                                document.exitFullscreen();
                            }
                            else if(document.msexitFullscreen) {
                                document.msexitFullscreen();
                            }
                            else if(document.mozexitFullscreen) {
                                document.mozexitFullscreen();
                            }
                            else if(document.webkitexitFullscreen) {
                                document.webkitexitFullscreen();
                            }
                            my${index} = false
                        }
                    });
                    `}</Script>
                    {/* <div className='flex justify-center items-center'>
                        <div
                            onMouseLeave={handleMouseLeave}
                            onMouseEnter={handleMouseEnter}
                            onMouseMove={handleMouseMove}
                            className='w-80 h-96 relative overflow-hidden'>
                            <Image className='object-cover border z-10' alt="" src={`${data.image}`} fill />
                            <div
                                style={{
                                    backgroundPosition: `${position.x}px ${position.y}px`,
                                    backgroundImage: `url(${data.image})`,
                                    backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${imageSize.height * ZOOM_LEVEL}px`,
                                    backgroundRepeat: 'no-repeat',
                                    display: zoomable ? 'block' : 'none',
                                    top: `${position.mouseY}px`,
                                    left: `${position.mouseX}px`,
                                    width: `${MAGNIFIER_SIZE}px`,
                                    height: `${MAGNIFIER_SIZE}px`,
                                }}
                                className={`z-50 border-4 rounded-full pointer-events-none absolute border-gray-500`}
                            />
                        </div>
                    </div> */}
                </>
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
                    data.map((d,index )=> {
                        return comp(d,index)
                    })
                }
            </div>
        </div>

    );


};

export default DataComponent;
