'use client'
import React, { useEffect, useState } from 'react'
import NavComponent from '../components/Nav-Component'
import { getCookie } from 'cookies-next'
import Script from 'next/script'
import { useCookies } from 'next-client-cookies'
import Head from 'next/head'
import link from '../../../backendlink'


const Layout = ({children}) => {
  const [userLevel, setUserLevel] = useState(null)
  const [first, setFirst] = useState(true)
  const cook = useCookies()
  const auth = async ()=> {
    if (!cook.get('token')) {
      window.location.href = '/'

    }
    const response = await fetch(link+'auth/authorize', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + cook.get('token')
      },
      body: JSON.stringify({}),
    })
    const result = await response.json()
    console.log(result);
    setUserLevel(result.level)
    if (result.level != 0) {
      window.location.href = '/'
    }
  }
  useEffect( ()=>{
     auth()
    setFirst(false)
  })

  return (<>
  <Head >
  </Head>
  <Script type="text/javascript" src="/static/flow.js" />
    {userLevel !=0 ? 
    
    <>
      <div className="flex justify-center items-center h-screen w-screen">
        <div className="loader border-5 border-solid border-gray-200 border-t-4 border-blue-500 rounded-full w-40 h-40 animate-spin"></div>
      </div>


    </>:
    <>
    {/* <html>
    <body> */}
    <NavComponent suppressHydrationWarning={true}/>
    <>{children}</>
    <Script type="text/javascript" src="/flow.js" />
    {/* <script src='/flow.js'></script>
    <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script> */}
    {/* </body>
    </html> */}
    </>
  
}
<Script type="text/javascript" src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js" />
  </>
  )
}

export default Layout
