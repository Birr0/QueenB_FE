import {useEffect, useState} from "react";
import { useParams, useLocation } from "react-router";
import {LectureVideo} from "./LectureVideo";
import { socket } from "../App";

export const ResultPage = () => {
    const location = useLocation();
    const params = useParams();

    useEffect(() => {
        socket.emit('get_resource', params.docID);
        socket.on('resource_response', result => {
            setResult(JSON.parse(result));
        });
    }, []);

    

    const [result, setResult] = useState();
    //const [loading, setLoading] = useState(false);
    
    if(location.state){
        return(
           <LectureVideo doc={location.state} />
        )
    }
    else{     
        return( 
            result ? <LectureVideo doc={{result}} /> : null
        )
    }   
}