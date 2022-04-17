import { BiArrowBack, BiSearch } from "react-icons/bi"
import {  Link, useNavigate } from "react-router-dom";
import Bee from "../images/bee.png";
import { Template } from "./Template";
export const Features = () => {

    const navigate = useNavigate();

    return(
        <Template component={
            <div style={{marginTop:"10px", marginLeft:"20px"}}>
                
                <div>
                    <div class="flex bg-white w-2/3 m-auto rounded-md">
                        <img alt="QueenB" class="w-40" src={Bee} />
                        <div class="m-auto">
                            <p class="text-3xl font-semibold ">QueenB</p>
                            <i style={{display:"flex", justifyContent:"center"}}>Search engine for level 2 physics</i>
                        </div>
                    </div>
                    
                <i class="text-md ml-6">Items marked <p class="text-red-500 inline">*To-Do</p> are still to be implemented</i>
                <div class="ml-6 mt-4">
                    <Link to="/"><p class="text-xl">Quick search</p></Link>
                    <hr></hr>
                    <ul>
                        <li>Type into the search bar to get a quick search. This returns any lecture notes or lecture video that matches any term in your query (OR search). </li>
                    </ul>
                    <h2><p class="text-red-500 inline">*To-Do</p></h2>
                    <ul>
                        <li>Submit your search by clicking the <BiSearch /> or hitting <kbd>Enter</kbd>. This should return notes or videos that contains all terms in your query (AND search). This will return less results than the OR search</li>
                    </ul>
                    <br></br>
                    <p class="text-xl">Results</p>
                    <hr></hr>
                    <ul >
                        <li>If your search returns results you can click on the box to open the result.</li>
                        <li>Keywords should be <mark>highlighted</mark> for easy identification.</li>
                        <p class="text-md"><p class="text-red-500 inline">*To-Do</p>Results ranked by relevance (Inverse Doc frequency algorithm)</p>
                        <p class="text-lg ml-2">Video results</p>
                        <ul class="mb-2">
                            <li>Video transcripts that match your keywords will return a copy of the transcript with the the keywords highlighted.</li>
                            <li>You can click on any part of the transcript to open the lecture at that point in the recording.</li>
                        </ul>
                        <p class="text-lg ml-2">Notes</p>
                        <ul class="mb-2">
                            <li>Keyword results in the notes will show a type of 'notes' in  the results</li>
                            <li>You can open the result to that the part of the notes that contains the search terms by clicking on the result.</li>
                        </ul>
                        <p class="text-lg ml-2">Slides</p>
                        <ul class="mb-2">
                            <li>Keyword results in the notes will show a type of 'slides' in  the results</li>
                            <li>You can open the result to that the part of the notes that contains the search terms by clicking on the result.</li>
                        </ul>
                    </ul>
                    <Link to="/advanced-search"><p class="text-xl">Advanced search</p></Link>
                    <hr></hr>
                    <ul >
                        <li>Using advanced search it is possible to filter queries to include specfic modules, lecturers or modules with a search query.</li>
                        <p>Filter by resource types include; video - transcripts from the lectures uploaded to streams, slides - any powerpoint formated notes in pdf, notes - any notes that supplemented lecture not including powerpoints, exam papers and assignments.</p>
                        <li>*Assignments and exam papers belong to a module, so do not select a lecturer with this filter</li>

                    </ul>
                    </div>
                </div>
            </div>
        } />
    )
}