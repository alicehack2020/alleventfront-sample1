import axios from 'axios'
import React, { useEffect, useState } from 'react'
import urlInfo from '../config/constants'

import "./ListEvent.css"
const ListEvent = () => {
  const [list, setList] = useState([])
  const [location,setLocation]=useState([])
  const [locationValue, setLocationValue] = useState([])
  const [category,setCategory]=useState([])
  const [categoryValue, setCategoryValue] = useState([])
  const [CompleteData, setCompleteData] = useState([])
  const [data, setData] = useState([])
  const [selectedClient, setSelectedClient] = useState('date');
  const [locationFilter,setLocationFilter]=useState([])
  const [categoryFilter,setCategoryFilter]=useState([])
  const [date, setDate] = useState()
  // const [token,setToken]=useState()
  // const [localUserData,setlocalUserData]=useState()
  let userName = JSON.parse(localStorage.getItem('user'))
  let token = JSON.parse(localStorage.getItem('token'))

  
  
  

  let filter = {
    "category": categoryFilter,
    "location": locationFilter,
  };
 
 
  useEffect(() => {
    loadData()
  },[])

  const loadData = async () => {
    try {
      await axios.post(`${urlInfo.REACT_APP_API_URL}/api/event/list`, {},{ headers: {"Authorization" : `Bearer ${token}`} }).then((res) => {
        setList(res.data.list)
        setCompleteData(res.data.list)
        setData(res.data.list)
      }).catch((error) => {
       console.log(error)
     })
   } catch (error) {
     
    }
  }
 

  useEffect(() => {
    loadLocation()
  },[list])
  

  const updateLocationCategory = (who,arr) => {
    if (who === 'location')
    {
      setLocationFilter(arr) 
    }
    else {
      setCategoryFilter(arr)
    }
  }

  
  const loadLocation = () => {
    let objLocation = {}
    let objCategory = {}
    let temp=""
    for (let key in list)
    {
       temp=list[key].location
      if (objLocation[temp]) {
        objLocation[temp]++;
      } else {
        objLocation[temp] = 1;
      }

      temp=list[key].category
      if (objCategory[temp]) {
        objCategory[temp]++;
      } else {
        objCategory[temp] = 1;
      }


      
    }
    setLocationValue(objLocation)
    setLocation(Object.keys(objLocation))

    setCategoryValue(objCategory)
    setCategory(Object.keys(objCategory))
  }

  const sortData = (type) => {
    setSelectedClient(type);
    
    if (type === 'city')
    {
      let sortedProducts = data.sort(
        (p1, p2) => (p1.location < p2.location) ? 1 : (p1.location > p2.location) ? -1 : 0);
      setData(sortedProducts)
      
    }
    else if (type === 'date')
    {
      let sortedProducts = data.sort(
        (p1, p2) => (p1.startdate < p2.startdate) ? 1 : (p1.startdate > p2.startdate) ? -1 : 0);
      setData(sortedProducts)
       
    }
    else if (type === 'category')
    {
      let sortedProducts = data.sort(
        (p1, p2) => (p1.category < p2.category) ? 1 : (p1.category > p2.category) ? -1 : 0);
      setData(sortedProducts)   
    }
     
  }

  const filterData = (type, key) => {
    
    if (type === 'city')
    {
      let flage=0
      for (var i = 0; i < locationFilter.length; i++)
      {
        if (key === locationFilter[i])
        {
          flage=1
          break
        }
      }

      if (flage === 1)
      { 
        let arr=[]
          arr = locationFilter.filter((item) => {
          return item !== key;
          })
          updateLocationCategory("location",arr)
       
      }
      else {
        locationFilter.push(key)
        setLocationFilter(locationFilter)
      }
    }


    else if (type === 'category')
    {
      let flage=0
      for (var j = 0; j < categoryFilter.length; j++)
      {
        if (key === categoryFilter[j])
        {
          flage=1
          break
        }
      }

      if (flage === 1)
      {
        let arr = categoryFilter.filter(function(item) {
          return item !== key
        })
        updateLocationCategory("category",arr)
      }
      else {
        categoryFilter.push(key)
        setCategoryFilter(categoryFilter)
      }
  
    }
    let res = CompleteData.filter(obj =>
      Object.entries(filter).every(([prop, find]) => find.includes(obj[prop])));
    setData(res) 
  }

  const findbyDate = () => {
    
    let arr = CompleteData.filter((item) => {
      return item.startdate === date || item.snddate === date;
    })
    setData(arr)
  }

 

  return (
    <div className='list_Main'>
      <div>
        <p>
          Hi {userName} welcome to AllEvents
        </p>
      </div>
      <div className='event_list_find'>
        <div className='normalFlexColumn'>
          
          <select value={selectedClient} onChange={(e)=>sortData(e.target.value)}>
            <option>date</option>
            <option>city</option>
            <option>category</option>
          </select>
        </div>
        <div className='normalFlexColumn'>
           <input type="date" placeholder='select date' value={date} onChange={(e)=>{setDate(e.target.value)}} className="Date"/>
        </div>
        <button onClick={findbyDate}>find</button>
      </div>
      <div className='list_event_filter_main'>
        <div>
          
          <div>
            filter by city
            {location.map((key) => (
             <div key={key} className="check_box">
                <input type="checkbox"
                  name="subscribe"
                  value="newsletter"
                  onClick={()=>filterData("city",key)}
                  /> <label>{key}: ({locationValue[key]})</label>
             </div>
            ))}
          </div>

          <div>
            filter by category
            {category.map((key) => (
             <div key={key} className="check_box" onClick={()=>filterData("category",key)}>
                <input type="checkbox"
                  name="subscribe"
                  value="newsletter"/> <label>{key}: ({categoryValue[key]})</label>
             </div>
            ))}
          </div>
          

        </div>
            <div className='event_list_Main'>
            {
              data.map((e) => {
                return <div className='CardDiv'>
                  <div>
                     <img src={e.bannerImage} alt="" className='banner'/>
                  </div> 
                  <div>
                  <div>
                    <div className='generalFlex'>
                      <p>Event Name</p>
                      <p>{e.eventName}</p>
                    </div>

                    <div className='generalFlex'>
                      <p>Start Date</p>
                      <p>Start Time</p>
                    </div>

                    <div className='generalFlex'>
                      <p>{e.startdate}</p>
                      <p>{e.startTime}</p>
                    </div>

                    <div className='generalFlex'>
                      <p>End Date</p>
                      <p>End Time</p>
                    </div>
                    <div className='generalFlex'>
                      <p>{e.enddate}</p>
                      <p>{e.endTime}</p>
                    </div>
                    
                    <div className='generalFlex'>
                      <p htmlFor="">Location</p>
                      <p>{e.location}</p>
                    </div>
                    <div className='generalFlex'>
                    <p htmlFor="">Category</p>
                      <p>{e.category}</p>
                    </div>
                  </div>
                  </div>
                  
                  
                 
                </div>
              })
          }
            </div>
      </div>

     
    </div>
  )
}

export default ListEvent