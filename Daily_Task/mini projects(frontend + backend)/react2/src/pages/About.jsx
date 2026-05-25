import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const About = () => {
  const[first,setFirst] = useState(true);
  const[second,setSecond] = useState(true);
  const[third,setThird] = useState(true);

  useEffect(()=>{
    console.log("data fetching")
  },[first])

  console.log("rendering")
  return (
    <div>
        <Navbar/>
      <h1>This is about page</h1>
      <p>lorem ipsum dolor sit amet consectetur adipisicing elit.</p>

      <button onClick={() => setFirst(!first)}>first</button>
      <button onClick={() => setSecond(!second)}>second</button>
      <button onClick={() => setThird(!third)}>third</button>
    </div>
  )
}

export default About
