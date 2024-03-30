import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dropdown from 'react-bootstrap/Dropdown';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
function App() {

 const[selectedState, SetselectedState]= useState('');
 const[temparature,setTemperature]=useState(null);
 const [humidity,setHumidity]=useState(null);
 const[icon,setIcon]=useState(null);
 const[condition,setCondition]= useState(null);


 const states=["Andhra Pradesh",
 "Arunachal Pradesh",
 "Assam",
 "Bihar",
 "Chhattisgarh",
 "Goa",
 "Gujarat",
 "Haryana",
 "Himachal Pradesh",
 "Jharkhand",
 "Karnataka",
 "Kerala",
 "Madhya Pradesh",
 "Maharashtra",
 "Manipur",
 "Meghalaya",
 "Mizoram",
 "Nagaland",
 "Odisha",
 "Punjab",
 "Rajasthan",
 "Sikkim",
 "Tamil Nadu",
 "Telangana",
 "Tripura",
 "Uttar Pradesh",
 "Uttarakhand",
 "West Bengal",
 "Andaman and Nicobar Islands",
 "Chandigarh",
 "Dadra and Nagar Haveli and Daman and Diu",
 "Delhi",
 "Lakshadweep",
 "Puducherry"];

const handleSelect=async(state)=>{
  SetselectedState(state);
}
  useEffect(()=>{
     const fetchDate= async()=>{
      try{
      
       const weatherresponse= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectedState},India&APPID=417a132e48b14586e13cdf6a0a6833e3`);
       setTemperature(weatherresponse.data.main.temp_max);
       setHumidity(weatherresponse.data.main.humidity);
       setIcon(weatherresponse.data.weather[0].icon);
       setCondition(weatherresponse.data.weather[0].main);
      }
      
      catch(err){
        console.log(err);
      }
     };

 
  
 
    fetchDate();
  
  console.log(temparature);
  console.log(humidity);
  console.log(icon);
  console.log(condition);
}

  ,[selectedState]);
  

  return (
    <>
    <h1 class='logo'>GetWeather-India
    
    <div class="svg-container">
    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="white" class="bi bi-cloud-haze2-fill" viewBox="0 0 16 16" >
  <path d="M8.5 2a5 5 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5 5 0 0 1 8.5 2m-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
</svg>
</div>

</h1>
<br></br>
<div class="container">
  <div class="row">
    <div class="col">
    <h1 class="display-4 text-center custom-color">Plan your journey without hustle!</h1>
      <p class="lead text-center cus-col">Choose the State to view todays weather condition</p>
    </div>
  </div>
</div>

<div>
<div className="text-center"> 
      <Dropdown  className="text-center">
        <Dropdown.Toggle style={{ backgroundColor: '#F1FADA', color: '#1B1A55', border: 'none', textAlign:'center',justifyContent:"center" }} id="dropdown-basic">
          Select State
        </Dropdown.Toggle>
       
        <Dropdown.Menu>
       
          {states.map((state,index)=>(<Dropdown.Item key={index} onClick={()=>handleSelect(state)}>{state}</Dropdown.Item>))}
         
        </Dropdown.Menu>
        
      </Dropdown>
      </div>
    </div>
   <br></br>
    {selectedState && (
  <div className="row justify-content-center">
    <div className="col-sm-12 col-md-12 col-lg-3">
      <div className="card c-cus">
        <div className="card-body">
          <h3 className="card-title tit">{selectedState}</h3>
          {icon && (
            <img className='icon' src={`http://openweathermap.org/img/wn/${icon}.png`} alt="Weather Icon" />
          )}
          <h4 class="condition">{condition}</h4>

<h4 class="temp">{`Temperature: ${Math.floor(temparature - 273.15)}°C`}</h4>
<h4 class="humi">{`Humidity: ${humidity}%`}</h4>

</div>
      </div>
    </div>
  </div>
)}

    </>
  );
}

export default App;
