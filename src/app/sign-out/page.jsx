'use client'
import { useCookies } from 'next-client-cookies'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const SignOut = () => {
  const cook = useCookies()
  const router = useRouter()
  useEffect(()=>{
    // const myint = setInterval(()=>{
    //   console.log("log--");
    // },1000*5)
    // return()=>clearInterval(myint)
    cook.remove("email")
    cook.remove("department")
    cook.remove("username")
    cook.remove("token")
    cook.remove("mode")
    const timeout = setTimeout(()=>{
      router.push('/')
    },2*1000)
    return ()=>clearTimeout(timeout)
  },[])
  return (
    <>
    <div class="flex text-center justify-center items-center h-screen w-screen">
        <div class=" absolute z-0 loader border-5 border-solid  border-t-8 border-blue-100 rounded-full w-60 h-60 animate-spin"></div>
        <div className=''>
          <h1 className='text-xl'>
            Logging out 👋
            </h1>
          </div>
      </div>
    </>
  )
}

export default SignOut
