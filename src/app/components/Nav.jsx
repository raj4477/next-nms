import dynamic from 'next/dynamic'
import React from 'react'

const Nav = dynamic(
   ()=> import('./Nav-Component'),{
        ssr:false
    }
)

export default Nav
