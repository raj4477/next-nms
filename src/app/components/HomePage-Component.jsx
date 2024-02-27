'use client'
import { hasCookie } from 'cookies-next'
import React from 'react'

const HomePage_Component = () => {
  if (hasCookie('email')) {
    window.location.href = '/admin'
  }
  else {
    window.location.href = '/login'
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
