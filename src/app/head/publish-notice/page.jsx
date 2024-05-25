'use client'
import React, { useEffect, useState } from 'react'
import * as style from "./style.module.css"
import { getCookie } from 'cookies-next'
import link from '../../../../backendlink'
const engineeringOption = [
  {
    label : "Principals",
    value : "dean"
  },
  {
    label : "HoDs",
    value : "head"
  },
  {
    label : "Teachers",
    value : "teacher"
  },
  {
    label : "Students",
    value : "student"
  },
]
const hostelOption = [
  {
    label : "Head Warden",
    value : "dean"
  },
  {
    label : "Hostel's Wardens",
    value : "warden"
  },
  {
    label : "Hostel's CareTaker",
    value : "caretaker"
  },
  {
    label : "Students",
    value : "student"
  },
]
const allOption = [
  {
    label : "All Deans",
    value : "dean"
  },
  {
    label : "All Heads",
    value : "head"
  },
  {
    label : "All Teachers",
    value : "teacher"
  },
  {
    label : "All Students",
    value : "student"
  },
]
const Page = () => {
    const [height, setHeight] = useState(20);
    const [note, setNote] = useState("");
    const [heading, setHeading] = useState("");
    const [department, setDepartement] = useState("");
    const [level, setLevel] = useState(0);
    const [options, setOption] = useState([]);
    const [file , setFile] = useState(null);
    const [imagefile , setImageFile] = useState("");
    useEffect(
      ()=>{

        setOption(options=>[...allOption])
        
      },[]
    )
    function convertBase(e){
      setFile(e.target.files[0])
      var reader =  new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        console.log(reader.result);
        setImageFile(reader.result);// base64encoded string
      }
      reader.onerror = error =>{
        console.log(error);
      }

    }
    async function publishNotice(){
      if(file == null){
        let response = await fetch(link+'notice/publish-notice-only', {
      method: 'POST',
      headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + getCookie('token')
          },
      body: JSON.stringify({
        level : level,
        department : department,
        note : note,
        heading : heading})
      })
      const message = await response.json();
      if(message.success){
        alert("Successfully Added")
        window.location.href="/admin"
      }
      else if(message.error){
        alert(message.error)
      }
      return
      }
      const formData = new FormData();
      formData.append("level", level);
      formData.append("heading", heading);
      formData.append("note", note);
      formData.append("department", department);
      formData.append('image',file);
      const response = await fetch(link+'notice/publish-notice', {
        method: 'POST',
        headers: {
          'Authorization' : 'Bearer ' + getCookie('token')
        },
        body: formData,
      });
      const result = await response.json()
      console.log(result);
      if(result.error){
        alert("Error" + result.error.message)
      }
      // var response = await fetch('https://e-suchana-backend.cyclic.app/notice/publish-notice', {
      // method: 'POST',
      // headers: {
      //       'Accept': 'application/json, text/plain, */*',
      //       'Content-Type': 'application/json'
      //     },
      // body: JSON.stringify({image : imagefile,
      //   level : level,
      //   department : department,
      //   note : note,
      //   heading : heading})
      // })
      // const message = await response.json();
      // if(message.success){
      //   alert("Successfully Added")
      //   window.location.href="/admin"
      // }
      // else if(message.error){
      //   alert("Error occured")
      // }
      // const formData = new FormData();
      // formData.append("level", level);
      // formData.append("heading", heading);
      // formData.append("note", note);
      // formData.append("department", department);
      // formData.append('myNoticeImage',file);
      // const response = await fetch('https://e-suchana-backend.cyclic.app/uploadPhoto', {
      //   method: 'POST',
      //   body: formData,
      // });
      // const result = await response.json()
      // if(result.error){
      //   alert("Error")
      // }
    }
    function handleRadioButton(e){
      const value = e.target.value;
      console.log(value);
      switch (value){
        case "dean" : 
        setHeight(50)
        setLevel(1)
        break;
        case "head" : 
        setHeight(84)
        setLevel(2)
        break;
        case "teacher" : 
        setHeight(115)
        setLevel(3)
        break;
        case "warden" : 
        setHeight(84)
        setLevel(2)
        break;
        case "caretaker" : 
        setHeight(115)
        setLevel(3)
        break;
        case "student" : 
        setHeight(150)
        setLevel(4)
        break;
        default:
          setHeight(20)
          break;
      }
    }
    const handleSelectButton = (e)=>{
      const value = e.target.value
      switch (value) {
        case "all":
          setOption(allOption)
          setDepartement("all")
          break;
        case "engineering":
          setOption(engineeringOption)
          setDepartement("engineering")
          break;
        case "hostel":
          setOption(hostelOption)
          setDepartement("hostel")
          break;
      
        default:
          break;
      }
    }
  return (
    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
        <form action="#" method="post" id="noticeForm">
        <label>Choose Department :</label><br />
          <select onChange={handleSelectButton} required>
            <option value="" selected={true} disabled={true} hidden={true}>Choose Department</option>
            <option value="all">All</option>
            <option value="engineering">Engineering</option>
            <option value="hostel">Hostel</option>
          </select>
          <br></br>
          <br></br>
          <div className={style.p}>
      <div className={style.ln1}>
        <div className={style.ln} style={{ height: height }}></div>
      </div>
      <div className={style.c2}>
        <label>Category:</label><br />
        <input style={{"margin-bottom": "15px",
    "margin-right": "4px"}} type='radio' id='admin' value='admin' checked={true} disabled={true}/>
        <label>Admin</label><br/>
          {
          options.map(e=><>
            <input className={style.pad} type="radio" id={e.value} name="category" value={e.value} onChange={handleRadioButton} />
        <label className={style.pad} for={e.value}>{e.label}</label><br />
          </>)
          }
      </div>
      </div>
    {/* {opt()} */}
    
    <label for="subject">Heading:</label><br/>
    <input className={style.note} type="text" id="subject" name="subject" onChange={(e)=>{setHeading(e.target.value)}} required/><br/><br/>
    
    <label for="message">Notice:</label><br/>
    <textarea onChange={(e)=>{setNote(e.target.value)}} className={style.note} id="message" name="message" rows="4" cols="50" required></textarea><br/><br/>
    <label for="message">Notice Image:</label><br/>
    <input  onChange={convertBase} accept="image/*" type="file" name="noticepic" /><br></br>
    <br></br>
    {imagefile=="" || imagefile== null ? "": <><img height={100} width={100} src={imagefile}/> <br></br></>}
    <input onClick={publishNotice} type="submit" value="Submit" className={style.inputButton}/>
</form>

    {/* <div className={style.ln} style={{height}}>
      
    </div>
    <button onClick={() => {
        
        height === 80 ?setHeight(20): setHeight(80)
        }}>Change height</button> */}
    </div>
    </div>
    
  )

  function opt() {
    return <div className={style.p}>
      <div className={style.ln1}>
        <div className={style.ln} style={{ height: height }}></div>
      </div>

      <div className={style.c2}>
        <label>Category:</label><br />
        
        <input className={style.pad} type="radio" id="dean" name="category" value="dean" onChange={handleRadioButton} />
        <label className={style.pad} for="dean">Dean</label><br />
        <input className={style.pad} type="radio" id="hods" name="category" value="hods" onChange={handleRadioButton} />
        <label className={style.pad} for="hods">HODs</label><br />
        <input className={style.pad} type="radio" id="teachers" name="category" value="teachers" onChange={handleRadioButton} />
        <label className={style.pad} for="teachers">Teachers</label><br />
        <input className={style.pad} type="radio" id="students" name="category" value="students" onChange={handleRadioButton} />
        <label className={style.pad} for="students">Students</label><br /><br />
      </div>
    </div>
  }
}

export default Page
