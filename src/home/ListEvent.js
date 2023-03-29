import axios from 'axios'
import React, { useEffect, useState } from 'react'
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
  const [date,setDate]=useState()
  
  let filter = {
    "category": categoryFilter,
    "location": locationFilter,
  };
 
  const loadData = async () => {
    try {
      await axios.post("http://localhost:8000/api/event/list").then((res) => {
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
    loadData()
  },[])
 

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
        (p1, p2) => (p1.date < p2.date) ? 1 : (p1.date > p2.date) ? -1 : 0);
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
      return item.date === date;
    })
    setData(arr)
  }

  return (
    <>
      <div>Event List</div>
      <div>
        sort
        <select value={selectedClient} onChange={(e)=>sortData(e.target.value)}>
          <option>date</option>
          <option>city</option>
          <option>category</option>
        </select>
      </div>
      <div>
        <label htmlFor="">Select Date for event</label>
        <input type="date" placeholder='select date' value={date} onChange={(e)=>{setDate(e.target.value)}} />
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
                return <div>
                  <p>{e.eventName}</p>
                  <p>{e.date}</p>
                  <p>{e.startTime}</p>
                  <p>{e.endTime}</p>
                  <p>{e.location}</p>
                  <p>{e.category}</p>
                  <div><img src={e.bannerImage} alt="" className='banner'/></div>
                </div>
              })
          }
            </div>
      </div>

     
    </>
  )
}

export default ListEvent