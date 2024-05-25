'use client'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Script from 'next/script'
import Head from 'next/head'
import StudentNavComponent from '../components/Student-Nav.component'
import link from '../../../backendlink'


const Layout = ({children}) => {
  const [userLevel, setUserLevel] = useState(null)
  useEffect( ()=>{
    auth()

 },[])
  if (!getCookie('token')) {
    router.push('/login', undefined, { shallow: true }); 
    return
  }
  const auth = async ()=> {
    if (!getCookie('token')) {
      router.push('/login', undefined, { shallow: true }); 
      return
      // window.location.href = '/'

    }
    const response = await fetch(link + 'auth/authorize', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({}),
    })
    const result = await response.json()
    setUserLevel(result.level)
    if (result.level !== 4) {
      // window.location.href = '/error'
      router.push('/', undefined, { shallow: true }); 
    }
  }
  
  return (<>
<Head >
  </Head>
  <Script type="text/javascript" src="/static/flow.js" />
    {userLevel !=4 ? 
    
    <>
      <div class="flex justify-center items-center h-screen w-screen">
        <div class="loader border-5 border-solid border-gray-200 border-t-4 border-blue-500 rounded-full w-40 h-40 animate-spin"></div>
      </div>


    </>:
    <>
    {/* <html>
    <body> */}
    <StudentNavComponent suppressHydrationWarning={true}/>
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
