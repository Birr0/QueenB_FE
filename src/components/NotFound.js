import { BiArrowBack } from "react-icons/bi";
import Bee from "../images/bee.png";
import { useNavigate } from "react-router-dom";
export const NotFound = () => {
    
    const navigate = useNavigate();

    return(
        <div style={{display:"block",justifyContent:"center", marginTop:"30px", textAlign:"center"}}>
            <img alt="QueenB" src={Bee} style={{maxWidth:"100px"}}/>
            <h1>Can't find what you are looking for ...</h1>
            <div style={{display:"flex", maxWidth:"200px", border:"1px solid black", justifyContent:"space-around",borderRadius:"8px", padding:"5px", marginLeft:"auto", marginRight:"auto"}}
                onClick={(e) => {
                    e.preventDefault();
                    navigate('/')
                }}
            >
                <BiArrowBack  style={{marginRight:"5px", fontSize:"25px"}} />
                <b style={{fontSize:"20px"}}> Return to search</b>
            </div>
            <p>But while you are here ...</p>
            <a href="https://www.youtube.com/watch?v=mqDOQzfM5Kc" target="_blank" rel="noreferrer">Ya like jazz?</a>

        </div>
    )
}