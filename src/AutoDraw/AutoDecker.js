import React, {useState, useRef, useEffect} from "react";
import axios, { AxiosError } from 'axios'
import Card from "./Card";
import './AutoDecker.css';

const AutoDecker = () =>{
    const mainUrl = 'https://deckofcardsapi.com/api/deck'
    
    const [deckID, setDeckID] = useState(null)
    const [cardImage, setCardImage] = useState(null)
    const [remaining, setRemainig] = useState(null)
    const [autoDraw, setAutoDraw] = useState(false)
    
    const intervalRef = useRef(null)
    
    useEffect(()=>{
        async function getDeckID(){
            const res = await axios.get(`${mainUrl}/new/shuffle/`)
            setDeckID(res.data.deck_id)
        }
        getDeckID()
    }, [])

    useEffect(()=>{
        if(deckID && autoDraw){
            async function getCard(){
                try{
                    const res = await axios.get(`${mainUrl}/${deckID}/draw/?count=${1}`)
                    setCardImage(res.data.cards[0].image)
                    // setDrawDeck(d => [... d, res.data.cards[0].image])
                    setRemainig(res.data.remaining)
                }catch(e){
                    setAutoDraw(false)
                    throw new Error("Tray Again!!!!")
                }

            }

            if (remaining == 0){
                setAutoDraw(false)
                alert('Error: No card remaining!')
            }

            if(autoDraw && !intervalRef.current){
                intervalRef.current = setInterval(async() => {
                    await getCard() 
                }, 1000);
            }
            }

        return ()=>{
                clearInterval(intervalRef.current)
                intervalRef.current = null
        }
    })

    const handleClick = ()=>{
        setAutoDraw(!autoDraw)
    }

    return(
        <div className="DeckerBoard">
            <button onClick={handleClick} className="DeckerBtn" > 
            {!autoDraw ? 'AutoDraw Card!' : 'Stop AutoDraw!'} 
            </button>
            
            <div className="DeckerImg" >
                <Card image={cardImage} />
            </div>
        </div>
    )
}

export default AutoDecker;

