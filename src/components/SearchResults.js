import { Highlighted } from "./Highlighted"
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Pagination } from "./Pagination";

export const SearchResults = ({query, socket}) => {
    const navigate = useNavigate();

    const state = useSelector(state => state.results);
    let results = state['results'];
    let pages = state['pages'];

    return(
        results[0] && query ? 
            <div>
                <div style={{margin:"15px"}}>
                <p>{pages.number} Results for '{query}'</p>
            </div>
            
            {results.map((result, key) => {
                return(
                <div key={key} style={{margin:"15px", padding:"5px", boxShadow:"4px 3px 6px 1px #969696", borderRadius:"5px"}} onClick={(e) => {
                    e.preventDefault();
                    const _state = {'result' :result, 'query': query};
                    if(result.type === 'video'){
                    navigate(`/lecture/${result['_id']['$oid']}`, {state: _state})
                    }
                    if(result.type === 'pdf'){
                    navigate(`/notes/${result['_id']['$oid']}`, {state: _state})

                    }
                }}>
                    {query ? 
                    <div style={{padding:"5px"}}>
                        <b><Highlighted text={result.title} highlight={query} title={true}/></b>
                        <br></br>
                        <br></br>
                        <i>{result.date ? result.date : '-'}</i>
                        <br></br>
                        
                        <i>Format: {result.type}</i>
                        <br></br>
                        <br></br>
                        <Highlighted text={result.content} highlight={query ? query : null} title={false} />
                    </div>
                    : null}
                </div>
                )}
            )}
            <div style={{display:'flex', margin:"25px", maxWidth:"100%", justifyContent:"center"}}>
                <Pagination socket={socket} pages={pages} query={query} />
            </div>
            </div>
    : null)
}

/*


*/