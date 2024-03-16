'use client'
// import React from 'react'

// const page = () => {
//   return (
//     <div class="p-4 sm:ml-64">
//         <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     

// </div>
// <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
//     </div>
//   )
// }

// export default page

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Table from 'react-bootstrap/Table';
import { Col, Form, Row } from 'react-bootstrap';
import { printRes } from "@/app/actions/redirectToAdmin";
import Table_Compenent from "@/app/components/Table-Component";

export default function MyNextJsExcelSheet() {

const [items, setItems] = useState([]);
const [info, setInfo] = useState([]);

let infoHelper = []
let d =[];
// useEffect(()=>{
//   console.log("useEffect-->");
//   console.log(d);
//   console.log(items);
// },[])
const readExcel = (file) => {
    // const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, {
                type: "buffer"
            });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);
            console.log("promise----->");
            console.log(data);
            d = data
            setItems(data)
            data.map((val,index)=>{
              console.log("+++");
              console.log(val.Email);
              console.log(val.Department);
              console.log(val.Name);
              console.log(val.UID);
              console.log(val.Role);
              let mp = {
                email : val.Email,
                username : val.Name,
                uid : val.UID,
                department  : val.Department,
                role : val.Role
              }
              infoHelper.push(mp)
             })
             setInfo(infoHelper)
             console.log("len-->");
             console.log(info.length);
             console.log(info);
            // resolve(data);
        };
        fileReader.onerror = (error) => {
            // reject(error);
            console.log("error in loading file");
        };
    // });
    // promise.then((d) => {
    //     setItems(d);
    //     console.log("thenn");
    //     });
  };
  async function  adduser(){
    if(info.length == 0){
      console.log("Info is Empty");
      return 
    }
    let response = await fetch('https://e-suchana-backend.cyclic.app/api/register', {
      method: 'POST',
      headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({info : info})
      })
      const message = await response.json();
      if(message.success){
        alert("Successfully Added")
        window.location.href="/admin/add-user"
      }
      else if(message.error){
        alert("Error occured" + message.error)
        window.location.href="/admin/add-user"
      }
  }
  return (
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
     

        <div>
          <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
          console.log("on Changed");
          info.map((val,index)=>{
            console.log(val.Email);
            console.log(val.Department);
            console.log(val.Name);
            console.log(val.UID);
            console.log(val.Role);
            })
           console.log(info.length);
        }}
      />
      <br></br>
      </div>
</div>
      <Table_Compenent d={items}/>
      <button type="button" 
      onClick={adduser}
      className="
      mx-[35vw]
      my-10
      text-white
      bg-blue-700
      hover:bg-blue-800 
        focus:outline-none 
        focus:ring-4 
      focus:ring-blue-300 
      font-medium rounded-full 
      text-sm px-5 py-2.5 
      text-center me-2 mb-2 
      dark:bg-blue-600 
      dark:hover:bg-blue-700 
      dark:focus:ring-blue-800">ADD USER</button>
{/* <script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script> */}
    </div>
  );
}