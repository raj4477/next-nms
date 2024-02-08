'use server'

import { permanentRedirect, redirect } from "next/navigation"

export const redirectToAdmin = () => {
    

    permanentRedirect('/admin')
//   redirect('/admin')
}

export const printRes = (res) => {
  console.log(res);
}
