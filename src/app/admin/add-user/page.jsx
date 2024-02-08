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

import React, { useState } from "react";
import * as XLSX from "xlsx";
import Table from 'react-bootstrap/Table';
import { Col, Form, Row } from 'react-bootstrap';
import { printRes } from "@/app/actions/redirectToAdmin";

export default function MyNextJsExcelSheet() {

const [items, setItems] = useState([]);
let info = []
const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
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
            console.log("promise");
            console.log(data);
            setItems(data)
            data.map((val,index)=>{
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
              info.push(mp)
             })
            resolve(data);
        };
        fileReader.onerror = (error) => {
            reject(error);
        };
    });
    promise.then((d) => {
        setItems(d);
        console.log("thenn");
        });
  };
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
            // mp = {
            //   email : val.Email,
            //   username : val.Name,
            //   uid : val.UID,
            //   department  : val.Department,
            //   role : val.Role
            // }
            // info.push(mp)
           })
           console.log(info.length);
        }}
      />
      <br></br>
      <br></br>
      <br></br>
      {/* <table>
        <tr>
          <th>head</th>
        </tr>
      </table> */}

      {/* <Row>
        <Col lg={12}>
          <h3>The Data of The Uploaded Excel Sheet</h3>
          <Table striped bordered hover variant="warning">
            <thead>
              <tr>
                <th>FirstName</th>
                <th>LastName</th>
                <th>Phone</th>
                <th>UserName</th>
                <th>Email Id</th>
                <th>Password</th>
                <th>Test Date</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {items.map((datas, index) =>
                <tr key={index}>

                  <td>{datas.FirstName}</td>
                  <td>{datas.LastName}</td>
                  <td>{datas.Phone}</td>
                  <td>{datas.UserName}</td>
                  <td>{datas.emailid}</td>
                  <td>{datas.Password}</td>
                  <td>{datas.testdate}</td>
                  <td>{datas.Comment}</td>

                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row> */}
    </div>
</div>
<script src="https://unpkg.com/flowbite@1.5.1/dist/flowbite.js"></script>
    </div>
  );
}