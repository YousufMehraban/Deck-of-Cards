import React, {useState} from "react";


const Card = ({image}) =>{
    // const [{x, y, r}] = useState({
    //     x: (Math.random()* 40 - 20),
    //     y: (Math.random()* 40 - 20),
    //     r: (Math.random()* 90 - 45)
    // })
    const transform= `translate(${Math.random()* 40-20}px, ${Math.random()* 40-20}px) rotate(${Math.random()* 90-45}deg)`
    
    return <img src={image} style={{transform}} />
}

export default Card;
