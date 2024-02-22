'use client'
import Buffer from 'buffer'
import Buffers from 'buffers'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [data,setData] = useState([])
    const [a,setA] = useState([])
    //  arr = new ArrayBuffer()
    useEffect(
         async ()=>{
            //  func()
            //  console.log(result);
            const response = await fetch("http://localhost/api//fetchnotice/ritik_11202584@mmumullana.org")
            const result = await response.json()
            setData(result)
            console.log(result)
             console.log(data);
             
             async function func() {
                 const response = await fetch("http://localhost/api//fetchnotice/ritik_11202584@mmumullana.org")
                 const result = await response.json()
                 setData(result)
                 console.log(data);
            }
            

        }
        ,[])
  return (
      <div>
      <h1>{data.length}</h1>
        {
        data.map(d=>{
            // console.log("-");
            // console.log(d.imgurl);
            // console.log(d.image.data);
            // <img width="300" height="300" src={`data:${d.image.contentType};base64, ${Buffers.from(d.image.data).toString('base64')}`}></img>
          return <img height={100} width={100} alt={"image"}src={`data:image/jpeg;base64,${d.imgurl}`} />
           
        })
        }
    </div>
  )
}

export default page
