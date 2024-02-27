'use client'
import { getCookie, hasCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React from 'react'

const HomePage_Component = () => {
  const router = useRouter()
  if (hasCookie('mode')) {
    let pth = '/' + getCookie('mode')
    router.push(pth)
    // window.location.href = '/admin'
  }
  else {
    router.push('/login')
    // window.location.href = '/login'
  }
  return (
    <>
      <div class="flex justify-center items-center h-screen w-screen">
        <div class="loader border-5 border-solid border-gray-200 border-t-4 border-blue-500 rounded-full w-40 h-40 animate-spin"></div>
      </div>


    </>
  )
}

export default HomePage_Component
