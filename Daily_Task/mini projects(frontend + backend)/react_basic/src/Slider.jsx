import React, {use, useState} from 'react'
import products from './data'
const Slider = () => {
    
    const [index, setIndex] = useState(0);

    function decIndex(){
      if(index>0){
        setIndex(index-1)
      }
      else{
        setIndex(products.length-1)
      }
    }

    function incIndex(){
      if(index<products.length-1){
        setIndex(index+1)
      }
      else{
        setIndex(0)
      }
    }
    
    return (
      <div style={{ margin:"0 auto",display: "flex",justifyContent: "center",alignItems: "center",gap: "20px" }}>
        <button style={{height:"40px",width:"90px",backgroundColor:"purple",color:"white",borderRadius:"12px", fontSize:"16px"}} onClick={decIndex}>Previous</button>
        <img src={products[index].thumbnail} alt="" style={{ width: "350px", borderRadius: "20px"}}/>
        <button style={{height:"40px",width:"90px",backgroundColor:"purple",color:"white",borderRadius:"12px",fontSize:"16px"}} onClick={incIndex}>Next</button>
      </div>

    )
}

export default Slider;