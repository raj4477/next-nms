'use client'
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue} from "@nextui-org/react";

let rows = [
  
];

let columns = [
  {
    key: "username",
    label: "Name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "uid",
    label: "UID",
  },
  {
    key: "department",
    label: "Department",
  },
  {
    key: "role",
    label: "Role",
  }
];

export default function Table_Compenent(d=[]) {
    console.log("Table Com----------->");
    console.log(d.length);
    console.log(d["d"]);
    console.log(d["d"].length);
    let data =d["d"]
    for(let i =0;i<data.length;i++){
        // console.log(i);
        let mp = {
            key: i,
            email : data[i].Email,
            username : data[i].Name,
            uid : data[i].UID,
            department  : data[i].Department,
            role : data[i].Role
          }
          console.log("mp--");
          console.log(mp);
          rows.push(mp)
    }
    console.log(rows);
    // d.map((val,index)=>{
    //     console.log();
    // })
  return (
    <Table   aria-label="Example table with dynamic content"  >
      <TableHeader  columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
        <TableBody items={rows}>
        {(item) => (
          <TableRow className = "mx-10"key={item.key}>
            {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
