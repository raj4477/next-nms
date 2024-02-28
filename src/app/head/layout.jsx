'use client'
import React from 'react'
import HeadNavComponent from '../components/Head-Nav.component'
import Script from 'next/script'




const Layout = ({children}) => {
  return (
    
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
    
  )
}

export default Layout
