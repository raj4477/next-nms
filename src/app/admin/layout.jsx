import React from 'react'
import NavComponent from '../components/Nav-Component'


const layout = ({children}) => {
  return (
    
      <>
      {/* <html>
      <body> */}
      <NavComponent/>
      <>{children}</>
      <script src='/flow.js'></script>
      <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
      {/* </body>
      </html> */}
      </>
    
  )
}

export default layout
