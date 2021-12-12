import { BiArrowBack, BiSearch } from "react-icons/bi"
import {  useNavigate } from "react-router-dom";
import Bee from "../images/bee.png";
export const Features = () => {

    const navigate = useNavigate();

    return(
        <div style={{marginTop:"10px", marginLeft:"20px"}}>
            <div style={{display:"flex", alignItems:"left"}}>
                <BiArrowBack onClick={(e) => {
                    e.preventDefault();
                    navigate('/')
                }}
                style={{fontSize:"25px"}}
                />
            </div>
            <div>
                <div style={{display:"flex", justifyContent: "center"}}>
                    <img alt="QueenB" style={{width:"75px"}} src={Bee} />
                    <h1>QueenB</h1>
                </div>
                
                <i style={{display:"flex", justifyContent:"center"}}>Search engine for level 2 physics</i>

                <h2>Quick search</h2>
                <ul>
                    <li>Type into the search bar to get a quick search. This returns any lecture notes or lecture video that matches any term in your query (OR search). </li>
                </ul>
                <h2>Full search</h2>
                <ul>
                    <li>Submit your search by click the <BiSearch /> or hitting <kbd>Enter</kbd>. This should return notes or videos that contains all terms in your query (AND search). This will return less results than the OR search</li>
                </ul>
                <h2>Results</h2>
                <ul>
                    <li>If your search returns results you can click on the box to open the notes or video.</li>
                    <li>Keywords should be <mark>highlighed</mark> for easy identification.</li>
                    <h3>Video results</h3>
                    <ul>
                        <li>Video transcripts that match your keywords will return a copy of the transcript with the the keywords highlighted.</li>
                        <li>You can click on any part of the transcript to open the lecture at that point in the recording.</li>
                    </ul>
                    <h3>Notes</h3>
                    <ul>
                        <li>Keyword results in the notes will show a type of 'pdf' in  the results</li>
                        <li>You can open the result to that the part of the notes that contains the search terms.</li>
                    </ul>
                </ul>
            </div>
        </div>
    )
}