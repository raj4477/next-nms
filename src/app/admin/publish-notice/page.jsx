'use client'
import React, { useState } from 'react'
import * as style from "./style.module.css"
const page = () => {
    const [height, setHeight] = useState(100);
  return (
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
    <div className={style.ln} style={{height}}>
      
    </div>
    <button onClick={() => {
        
        height === 100 ?setHeight(20): setHeight(100)
        }}>Change height</button>
    </div>
    </div>
    
  )
}

export default page
