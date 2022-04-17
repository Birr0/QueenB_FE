import {useState, useEffect} from "react";
import { useFormik } from "formik";
import { SearchResults } from "./SearchResults";
import {BsSearch} from 'react-icons/bs';
import Bee from "../images/bee.png";
import {useDispatch, useSelector} from "react-redux";
import { setResults, setPages, setQuery } from "../store/resultsSlice";
import { useNavigate } from "react-router-dom";
import { Template } from "./Template";


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
    useEffect(() => {
        
        socket.on('results', results => {
          //setResults(JSON.parse(results.data));
            console.log(results);
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
        <Template component={
            <div>
                
                <div style={{display:"block",justifyContent:"center"}}>
                    
                    <div class="mt-4">
                        <p class="text-xl ml-4">Welcome to QueenB, happy searching!</p> 
                        <form onSubmit={formik.handleSubmit} class="mt-4">
                            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                                <input id="query" name="query" type="text" class="h-10 w-4/5 xl:w-3/4 rounded-md p-1" autoFocus={true} value={formik.values.query} onChange={(e) => {
                                    if(e.target.value.length > 1){
                                        e.preventDefault();
                                        socket.emit('quick_search', e.target.value, 0)
                                        dispatch(setQuery(e.target.value));
                                    }
                                    setTimeout(100);
                                    formik.setFieldValue('query', e.target.value);
                                    
                                }} />
                                <button type="submit" style={{ border:"none", marginLeft:"5px"}}><BsSearch style={{fontSize:"25px"}}/></button>
                            </div>
                        </form>
                        </div>
                        
                        <div class="mt-4">
                            {loading ? <img alt="Loading" src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FU6YxrKZ84AfppW48r4%2Fgiphy.gif&f=1&nofb=1'} /> :
                            <>
                                {results ? 
                                <div>
                                    <SearchResults query={formik.values.query} socket={socket} /> 
                                </div>
                                : null}
                            </>
                            }
                            {formik.values.query ? null : <img alt="Loading" class="w-full lg:w-1/2 lg:m-auto" src={'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia2.giphy.com%2Fmedia%2FU6YxrKZ84AfppW48r4%2Fgiphy.gif&f=1&nofb=1'} />}
                        </div>
            </div>
        </div>
        } />
    )

}


/*
Is query prop required in <SearchResults /> or use state ...

*/