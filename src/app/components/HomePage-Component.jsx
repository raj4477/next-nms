'use client'
import { hasCookie } from 'cookies-next'
import React from 'react'

const HomePage_Component = () => {
    if(hasCookie('email')){
        window.location.href='/admin'
    }
    else{
        window.location.href = '/login'
    }
  return (
    <>
    <img src='./loading.gif'  style={{ display: "flex",
height: "80vh",
width: "80vw",
alignSelf: "center",
"justify-content": "center" }}/>
    </>
  )
}

export default HomePage_Component
