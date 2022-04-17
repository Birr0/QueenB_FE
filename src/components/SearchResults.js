
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Pagination } from "./Pagination";
import { ResultCard } from "./ResultCard";

export const SearchResults = ({query, socket}) => {
    const navigate = useNavigate();

    const state = useSelector(state => state.results);
    let results = state['results'];
    let pages = state['pages'];

    return(
        results[0] && query ? 
            <div class="m-auto mb-2 w-5/6 lg:w-2/3 space-y-2">
                <p class="text-xl">{pages.number} Results for <b>'{query}'</b></p>
                {results.map((result, key) => {
                    return(
                        <ResultCard result={result} key={key} query={query} navigate={navigate} advanced={false} />
                    )}
                )}
                <div style={{display:'flex', maxWidth:"100%", justifyContent:"center"}}>
                    <Pagination socket={socket} pages={pages} query={query} />
                </div>
            </div>
    : null)
}

/*


*/