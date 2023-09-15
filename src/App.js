import React, { useState,useEffect } from 'react';
import NavBar from "./components/NavBar";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import {filterData} from "./data";
import Spinner from './components/Spinner';
import {toast} from "react-toastify";


const App = () => {

  const [courses,setCourses]=useState(null);
  const [loading,setLoading]=useState(true);
  const [category,setCategory]=useState(filterData[0].title);
  async function fetchData(){
    setLoading(true)
    try{
      let response=await fetch("https://codehelp-apis.vercel.app/api/get-top-courses");
      let output=await response.json();
      setCourses(output.data);
    }
    catch (error){
        toast.error("Network Error");
    }
    setLoading(false);
  }
  useEffect( ()=>{
    fetchData();
  },[])

  return (
    <div className='min-h-screen flex flex-col bg-red-400'>
      <div >
        <NavBar></NavBar>
      </div>
      <div >
      <div>
        <Filter  category={category}
        setCategory={setCategory}
        filterData={filterData}></Filter>
      </div>
      <div className='w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]'>
        {
          loading? (<Spinner></Spinner>) : (<Cards courses={courses} category={category} ></Cards>)
        }
      </div>
      </div>
    </div>
  )
}

export default App