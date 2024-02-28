'use client'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import DeanNavComponent from '../components/Dean-Nav.component'
import Script from 'next/script'


const Layout = ({children}) => {
  const [userLevel, setUserLevel] = useState(null)
  const auth = async ()=> {
    if (!getCookie('token')) {
      window.location.href = '/'

    }
    const response = await fetch('http://localhost:80/auth/authorize', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({}),
    })
    const result = await response.json()
    setUserLevel(result.level)
    // alert(result.level)
    if (result.level !== 1) {
      window.location.href = '/error'
    }
  }
  useEffect( ()=>{
     auth()

  })
  return (<>
    {userLevel !=1 ? 
    
    <>
      <div class="flex justify-center items-center h-screen w-screen">
        <div class="loader border-5 border-solid border-gray-200 border-t-4 border-blue-500 rounded-full w-40 h-40 animate-spin"></div>
      </div>


    </>:
    <>
    {/* <html>
    <body> */}
    <DeanNavComponent suppressHydrationWarning={true}/>
    <>{children}</>
    <Script type="text/javascript" src="/flow.js" />
    {/* <script src='/flow.js'></script>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script> */}
    {/* </body>
    </html> */}
    </>
  
  }
  </>
  )
}

export default Layout
