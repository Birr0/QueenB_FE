import {useState, useEffect} from "react";
import { useFormik } from "formik";
import { SearchResults } from "./SearchResults";
import {BsSearch} from 'react-icons/bs';
import Bee from "../images/bee.png";
import {useDispatch, useSelector} from "react-redux";
import { setResults, setPages, setQuery } from "../store/resultsSlice";
import { useNavigate } from "react-router-dom";

export const SearchPage = ({socket}) => {

    const [loading, setLoading] = useState(false);

    const state = useSelector(state => state.results);

    let query = state['query'];

    const formik = useFormik({
        initialValues: {query: query ? query : ''},
        onSubmit: values => {
            if(values.query.length > 0){
                socket.emit('search', values.query, 0);
                setLoading(true);
            }
        },
    });

    const dispatch = useDispatch();
    let storage = useSelector(state => state.results);
    let results = storage['results'];

    const navigate = useNavigate();

    useEffect(() => {
        socket.on('results', results => {
            //setResults(JSON.parse(results.data));
            if(results.data){
                dispatch(setResults(JSON.parse(results.data)));
                dispatch(setPages({'number' : results.number_results, 'type' : results.search_type, currentPage: Number(results.offset) }));
                setLoading(false);
            }          
        });

        socket.on('full_results', results => {
            //setResults(JSON.parse(results.data));
            dispatch(setResults(JSON.parse(results.data)));
            let _page = {'number' : results.number_results, 'type' : results.search_type, currentPage: Number(results.offset) };
            dispatch(setPages(_page));
            setLoading(false);
        })
    }, [])

    return(
        <div>
            <div style={{display:"flex", justifyContent:"right", marginRight:"10px", marginTop:"10px"}}>
                <div style={{border:"1px solid black", borderRadius:"8px", padding:"5px"}}>
                    <b onClick={(e) => {
                        e.preventDefault();
                        navigate('/features');
                    }}>Features</b>
                </div>
            </div>
            <div style={{display:"block",justifyContent:"center", marginTop:"30px"}}>
                
                <div style={{textAlign:"center"}}>
                    <div style={{display:"flex", justifyContent: "center"}}>
                        <img alt="QueenB" style={{width:"75px"}} src={Bee} />
                        <h1>QueenB</h1>
                    </div>
                    <i>Search engine for Level 2 Physics</i>
                        
                    <form onSubmit={formik.handleSubmit} style={{marginTop:"10px"}}>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <input id="query" name="query" type="text" style={{width:"75%", height:"25px", padding:"5px", boxShadow:"2px 1.5px 4px 0.5px #969696", borderRadius:"5px"}} autoFocus={true} value={formik.values.query} onChange={(e) => {
                                if(e.target.value.length > 1){
                                    e.preventDefault();
                                    socket.emit('quick_search', e.target.value, 0)
                                    dispatch(setQuery(e.target.value));
                                }
                                setTimeout(100);
                                formik.setFieldValue('query', e.target.value);
                                
                            }} />
                            <button type="submit" style={{backgroundColor:"white", border:"none", marginLeft:"5px"}}><BsSearch style={{fontSize:"25px"}}/></button>
                        </div>
                    </form>
                    </div>
                    
                    <div style={{marginTop:"40px"}}>
                        {loading ? <img alt="Loading" src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FU6YxrKZ84AfppW48r4%2Fgiphy.gif&f=1&nofb=1'} /> :
                        <>
                            {results ? 
                            <div>
                                <SearchResults query={formik.values.query} socket={socket} /> 
                            </div>
                            : null}
                        </>
                        }
                    </div>
                
                
        </div>
    </div>
    )

}


/*
Is query prop required in <SearchResults /> or use state ...

*/