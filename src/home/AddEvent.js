import axios from 'axios'
import React, { useState } from 'react'
import "./AddEvent.css"
const AddEvent = () => {
  const [data, setData] = useState({
    eventName:"",
    date:"",
    startTime:"",
    endTime:"",
    location:"",
    description:"", 
    category:"",
    bannerImage:""
  })

  const saveData = async() => {
      try {
         await axios.post("http://localhost:8000/api/event/add", data).then((res) => {
          console.log(res)
         }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        
      }
  }


  
  const uploadBanner = () => {
    console.log(data)
}
  return (
    <>
      <div>Add Events</div>
      <div className='add_div'>
          <input type="text"  placeHolder="Enter event name" value={data.eventName} onChange={(e) => setData({ ...data, eventName: e.target.value })} />
          <input type="date" placeHolder="Enter event date"  value={data.date} onChange={(e) => setData({ ...data, date: e.target.value })} />
          <input type="time" placeHolder="Enter event start time"  value={data.startTime} onChange={(e) => setData({ ...data, startTime: e.target.value })} />
          <input type="time" placeHolder="Enter event end time"  value={data.endTime} onChange={(e) => setData({ ...data, endTime: e.target.value })} />
          <input type="text" placeHolder="Enter event location"  value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} />
          <input type="text" placeHolder="Enter event desciprion"  value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          <input type="text" placeHolder="Enter event category"  value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} />
          <button onClick={()=>uploadBanner()}>Upload Banner</button>
          <button onClick={()=>saveData()}>submit</button>
      </div>
    </>

  )
}

export default AddEvent