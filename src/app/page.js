import Image from "next/image";
import Login_Component from "./components/Login-Component";
import { hasCookie } from "cookies-next";
import HomePage_Component from "./components/HomePage-Component";

export default function Home() {
  const isLogin = hasCookie('email')
  return (
    <>
    <HomePage_Component/>
      {
        // isLogin?
        // <></>
        // :<Login_Component/>
      }
       
    </>
    );
}
