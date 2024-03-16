'use client'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import Script from 'next/script'
import Head from 'next/head'
import HeadNavComponent from '../components/Head-Nav.component'
import { useRouter } from 'next/navigation'


const Layout = ({children}) => {
  const [userLevel, setUserLevel] = useState(null)
  const router = useRouter()
  if (!getCookie('token')) {
    router.push('/', undefined, { shallow: true });    // window.location.href = '/'
    
  }
  const auth = async ()=> {
    if (!getCookie('token')) {
      router.push('/')
      // window.location.href = '/'
      
    }
    const response = await fetch('https://e-suchana-backend.cyclic.app/auth/authorize', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + getCookie('token')
      },
      body: JSON.stringify({}),
    })
    const result = await response.json()
    setUserLevel(result.level)
    if (result.level !== 2) {
      router.route('/')
      // window.location.href = '/error'
    }
  }
  useEffect( ()=>{
     auth()
    // setUserLevel(2)

  })
  return (<>
  <Head >
  </Head>
  <Script type="text/javascript" src="/static/flow.js" />
    {userLevel !=2 ? 
    
    <>
      <div class="flex justify-center items-center h-screen w-screen">
        <div class="loader border-5 border-solid border-gray-200 border-t-4 border-blue-500 rounded-full w-40 h-40 animate-spin"></div>
      </div>


    </>:
    <>
    {/* <html>
    <body> */}
    <HeadNavComponent suppressHydrationWarning={true}/>
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
