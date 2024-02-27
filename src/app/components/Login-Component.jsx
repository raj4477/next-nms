'use client'
import React, { useState } from 'react'
// import { cookies } from 'next/headers'
import { getCookie, hasCookie, setCookie } from "cookies-next";
import {  useRouter } from 'next/navigation';
import { printRes, redirectToAdmin } from '../actions/redirectToAdmin';
import { useCookies } from 'next-client-cookies';


const Login_Component = () => {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const router = useRouter()
  const cook = useCookies()
    let userEmail ;
    // if(hasCookie('email')){
    //   window.location.href= '/admin'
    //   // router.push('/admin')
    // }
    if(hasCookie('mode')){
      router.push(getCookie('mode'))
    }
    const handleSubmit = async () => {
      console.log(email);
      console.log(password);
      fetch('http://localhost:80/api/login', {
      method: 'POST',
      headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({email : email,password : password})
      }).then(res => res.json())
        .then(res => {console.log(res)
          if(res.error){
            // console.log(res);
            printRes(res)
            alert(res.error)
            // window.location.href = '/error'
          }
          else if(res.success){

            userEmail = res.email
            console.log(userEmail);
            // setCookie("email", userEmail, { maxAge: 60 * 2 });
            cook.set('email',userEmail,{
              expires : (1/(24*60*60)*150),
              secure:true
            })
            cook.set('token',res.token,{
              expires : (1/(24*60*60)*150),
              secure:true
            })
            cook.set('username',res.name,{
              expires : (1/(24*60*60)*150),
              secure:true
            })
            const mp = [
              "admin",
              "dean",
              "head",
              "teacher",
              "student"
            ]
            cook.set('mode',mp[res.level],{
              expires : (1/(24*60*60)*150),
              secure:true
            })
            cook.set('department',res.department,{
              expires : (1/(24*60*60)*150),
              secure:true
            })
            let path = '/' +getCookie('mode')
            // window.location.href = "/admin"
            router.push(path)
            // router.push({pathname:path},undefined,{shallow : true})
            // redirectToAdmin()
          }
        });
    }
    
  return (
    <>
    
    <div>
      <section className="h-screen bg-[url('/login-bg.jpeg')] bg-cover">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
      <img
        className="w-8 h-8 mr-2"
        src="/vercel.svg"
        alt="logo"
      />
      <h1 className='text-5xl font-extrabold'>E-Suchana</h1><br></br>
  
    <div className="bg-transparent w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign in to your account
        </h1>
        <form className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="email@domain.com"
              required=""
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required=""
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="remember"
                  className="text-gray-500 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
            </div>
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>

        </form>
          <button
            onClick={handleSubmit}
            className="w-full text-white bg-#2563eb hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
      </div>
    </div>
  </div>
</section>

    </div>
    </>
  )
}

export default Login_Component
