import { Highlighted } from "./Highlighted";
import {GrNotes} from "react-icons/gr";
import {BsQuestionSquare} from "react-icons/bs";
import {FaRegFileVideo} from "react-icons/fa";
import {RiSlideshowLine} from "react-icons/ri";
import { Link } from "react-router-dom";
const ResultIcon = ({type}) => {
    if(type === "notes"){
        return(
            <GrNotes class="text-xl" />
        )
    }
    else if(type === "video"){
        return <FaRegFileVideo class="text-xl" />
    }
    else if(type === "slides"){
        return <RiSlideshowLine class="text-xl" />
    }
    else if(type === "assignment" || type === "exam paper"){
        return <BsQuestionSquare class="text-xl" />
    }
    else{
        return null
    }
}

export const ResultCard = ({result, key, query, navigate, advanced}) => {
   
    return(
        <div key={key} class="rounded-md p-2 border-2 border-gray-300 bg-white shadow-md">
            {query ? 
             advanced ? 
             <div class="flex flex-col space-y-2">
                <Link to={result.type === 'video' ? `/lecture/${result['_id']['$oid']}` : `/notes/${result['_id']['$oid']}`}  state={{'result' :result, 'query': query, 'advanced': advanced}} >
                    <p class="text-lg font-semibold"><Highlighted text={result.title} highlight={query} title={true}/></p>
                    <div class="flex space-x-1">
                        {result.lecturer ? <p class="border-2 border-purple-600 bg-purple-400 w-fit p-1 rounded-md">{result.lecturer}</p> : null}
                        <p class="border-2 border-red-600 bg-red-400 w-fit p-1 rounded-md">{result.module_code}</p>
                        <div class="flex border-2 border-green-600 bg-green-400 w-fit p-1 rounded-md space-x-1 align-middle"><ResultIcon type={result.type} /><b>{result.type}</b></div>
                        
                    </div>
                    <hr class="font-semibold"></hr>
                        
                    <Highlighted text={result.content} highlight={query ? query : null} title={false} />
                </Link>
            </div>
            :
            <div class="flex flex-col space-y-2" onClick={(e) => {
                e.preventDefault();
                
                if(result.type === 'video'){
                    navigate(`/lecture/${result['_id']['$oid']}`, {state: {'result' :result, 'query': query, 'advanced': advanced}})
                }
                else{
                    navigate(`/notes/${result['_id']['$oid']}`, {state: {'result' :result, 'query': query, 'advanced': advanced}})
                }
            }}>
                <p class="text-lg font-semibold"><Highlighted text={result.title} highlight={query} title={true}/></p>
                <div class="flex space-x-1">
                    {result.lecturer ? <p class="border-2 border-purple-600 bg-purple-400 w-fit p-1 rounded-md">{result.lecturer}</p> : null}
                    <p class="border-2 border-red-600 bg-red-400 w-fit p-1 rounded-md">{result.module_code}</p>
                    <div class="flex border-2 border-green-600 bg-green-400 w-fit p-1 rounded-md space-x-1 align-middle"><ResultIcon type={result.type} /><b>{result.type}</b></div>
                     
                </div>
                <hr class="font-semibold"></hr>
                      
                <Highlighted text={result.content} highlight={query ? query : null} title={false} />
                
            </div>
            : null}
        </div>
    )
}