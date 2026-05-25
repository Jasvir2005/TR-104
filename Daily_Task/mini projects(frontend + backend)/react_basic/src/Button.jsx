import React from 'react'

const Button = ({text="click me",text2="it"}) => {
    
    return(
        <div>
            <button>{text+" "+text2}</button>
        </div>
    )
}

export default Button