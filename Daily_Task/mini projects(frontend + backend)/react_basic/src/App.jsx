import Button from './Button.jsx'
import Card from './Card.jsx'
import products from './data.js'
import Counter from './Counter.jsx'
import Switch from './Switch.jsx'
import Slider from './Slider.jsx'
import Forms from './Forms.jsx'
function App(){
  
  //let productCards = []
  //for(let i=0;i<products.length;i++){
  //  productCards.push(<Card data={products[i]}/>)
  //}

  //let productCards = products.map((ele)=>{
  //  return <Card data={ele}/>
  //})

  return(
    
    <div style={{
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "20px",
      background: "#fdfdfdff"
    }}>
      <Forms/>
    </div>
  )
}
export default App