import axios from 'axios'
import React, { useState } from 'react'
import "./AddEvent.css"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../config/firebaseconfig"
const AddEvent = () => {
  const [data, setData] = useState({
    eventName:"",
    startdate:"",
    enddate:"",
    startTime:"",
    endTime:"",
    location:"",
    description:"", 
    category:"",
    bannerImage:""
  })
  const [percent, setPercent] = useState(0);
  const [file, setFile] = useState("");

  function handleChange(event) {
    setFile(event.target.files[0])
    
  }

  const handleUpload = () => {
    if (!file) {
        alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/files/${file.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );

            // update progress
            setPercent(percent);
        },
        (err) => console.log(err),
        () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setData({ ...data,bannerImage: url })
            });
        }
    );


   };
  const saveData = async () => {
      try {
         await axios.post("http://localhost:8000/api/event/add", data).then((res) => {
          console.log(res)
         }).catch((error) => {
          console.log(error)
        })
      } catch (error) {
        
      }
  }


  
  
  return (
    <div className='add_Event_Main'>
      <div className='headingadd'>ADD EVENTS</div>
      <div className='add_div'>
          <input type="text"  placeHolder="Enter event name" value={data.eventName} onChange={(e) => setData({ ...data, eventName: e.target.value })} />
        <div className='date_div'>
          <div>
            <label>Start Date</label>
            <input type="date" placeHolder="Enter event date" value={data.startdate} onChange={(e) => setData({ ...data, startdate: e.target.value })} />
            <label htmlFor="">Start Time</label>
            <input type="time" placeHolder="Enter event start time" value={data.startTime} onChange={(e) => setData({ ...data, startTime: e.target.value })} />
          </div> 
          
          <div>
            <label>End Date</label>
            <input type="date" placeHolder="Enter event date" value={data.enddate} onChange={(e) => setData({ ...data, enddate: e.target.value })} />
            <label htmlFor="">End Time</label>
          <input type="time" placeHolder="Enter event end time"  value={data.endTime} onChange={(e) => setData({ ...data, endTime: e.target.value })} />
          </div>
        </div>
        
         
        <select value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })}>
           <option value="">Select Event Location</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Nashik</option>
            <option>Gujarat</option>
            <option>Aurangabad</option>
          </select>
        

        <select value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })}>
           <option value="">Select Event Category</option>
            <option>Music</option>
            <option>Dance</option>
            <option>Drama</option>
            <option>Festival</option>
            <option>Talk</option>
          </select>
        </div>


          {/* <input type="text" placeHolder="Enter event location"  value={data.location} onChange={(e) => setData({ ...data, location: e.target.value })} /> */}
          {/* <input type="text" placeHolder="Enter event category"  value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} /> */}
 
           <textarea type="text" placeHolder="Enter event desciprion" className='description' value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} />
          <div className='add_form_button'>
          <div>
              <p>Select Banner</p>
                <input type="file" onChange={handleChange} accept="image/*" />
                <button onClick={handleUpload}>Upload Banner</button>
              <p>{percent} "% done"</p>
           </div>
            {/* <button onClick={() => uploadBanner()}>Upload Banner</button> */}
           
      </div>  
      <button onClick={()=>saveData()}>Submit</button>

      
      </div>
    

  )
}

export default AddEvent