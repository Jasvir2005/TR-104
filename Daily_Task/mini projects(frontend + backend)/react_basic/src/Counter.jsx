import React, { useState } from 'react'

const Counter = () => {
    const [count,setCount]= useState(0);

    function incCount(){
        setCount(count+1)
    }

     function decCount(){
        setCount(count-1)
    }

  return (
    <div style={{
        display:"flex",
        gap:"10px"
    }}>
        <button onClick={decCount}>-</button>
        <span>{count}</span>
        <button onClick={incCount}>+</button>
    </div>
  )
}

export default Counter
