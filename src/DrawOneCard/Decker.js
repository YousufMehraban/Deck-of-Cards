import React, {useState, useRef, useEffect} from "react";
import axios from 'axios'
import Card from "./Card";
import './Decker.css'

const Decker = () =>{
    const mainUrl = 'https://deckofcardsapi.com/api/deck'
    
    const [deckID, setDeckID] = useState(null)
    const [cardImage, setCardImage] = useState(null)
    const [remaining, setRemainig] = useState(null)
    
    const remainingRef = useRef()
    
    useEffect(()=>{
        async function getDeckID(){
            const res = await axios.get(`${mainUrl}/new/shuffle/`)
            setRemainig(res.data.remaining)
            setDeckID(res.data.deck_id)
            remainingRef.current = res.data.remaining
        }
        getDeckID()
    }, [])

    useEffect(()=>{
        if(deckID){
            async function getCard(){
                const res = await axios.get(`${mainUrl}/${deckID}/draw/?count=${1}`)
                setCardImage(res.data.cards[0].image)
            }
            getCard() 
        }
    }, [remaining])

    const handleClick = ()=>{
        if(remaining == 0){
            alert("Error: No card remaining!")
        }
        else{
            setRemainig(remainingRef.current -=1)
        }
    }
   
    return(
        <div className="DeckerBoard">
            <button onClick={handleClick} className="DeckerBTN"> Draw Card! </button>
            <div className="DeckerImg">
                <Card image={cardImage}/>
            </div>
        </div>
    )
}

export default Decker;

