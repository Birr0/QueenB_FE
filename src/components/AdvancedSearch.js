import { useState, useRef } from "react"
import Bee from "../images/bee.png";
import { Template } from "./Template";
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/ai';
import { LECTURERS, COURSE_LIST, TYPE } from "./modelData";
import { Get } from "../api/fetchWrapper";
import { setQuery, setResults } from "../store/resultsSlice";
import { ResultCard } from "./ResultCard";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";


function validateQuery(value){
    let error;
    if(!value){
        error = "*Query is requried"
    }
    if(value.length < 3){
        error = "*Query must be more than 2 characters"
    }
    if(value.length > 50){
        error = "*Query must be less than 50 characters"
    }
    const validQuery = new RegExp(
        "^[a-zA-Z0-9]$"
    )
    
    return error
}

const getResults = (offset, setResults, formData) => {
    console.log(formData);
    Get(`/search/advanced?query=${formData.query}&offset=${offset}&lecturer=${JSON.stringify(formData.lecturer)}&module=${JSON.stringify(formData.module)}&type=${JSON.stringify(formData.type)}`).then(resp => {
        setResults(resp); 
    }
    );
    
};


const AdvancedSearchForm = ({lecturersOpen, setLecturersOpen, setResults, setFormData}) => {
    
    const formRef = useRef();
    const [queryError, setQueryError] = useState(false);

    return(
        <Formik
        initialValues={{'query': '', 'lecturer': [], 'type': [], 'module': []}}
        
        innerRef={formRef}
        
        
        
        onSubmit={values => {
            getResults(0, setResults, values);
            setFormData(values);
        }}
 
      >
 
        {({
 
          values,
 
          errors,
 
          touched,
 
          handleChange,
 
          handleBlur,
 
          handleSubmit,
 
          isSubmitting,
 
          
 
        }) => (
            
            <form class="bg-white w-4/5 m-auto rounded-md p-4 " onSubmit={handleSubmit}
            >
                <div className="flex justify-center mb-2">
                    <Field validate={validateQuery} type="text" name="query" value={values.query} onChange={handleChange} onBlur={handleBlur} placeholder="query" className="w-full h-10 border-solid border-2 rounded-md p-2"/>
                </div>
               <p class="text-red-600">{errors.query && touched.query && errors.query}</p>
                {queryError ? <p class="text-red-600">* Please enter a valid query</p> : null}
                <p class="text-xl mb-2">Resource</p>
                
                    {TYPE.map((type) => {
                        return(
                        
                    <div className="flex items-start">
                    <div className="flex items-center h-5">
                    <Field
                        name="type"
                        value={type}
                        type="checkbox"
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    
                        <div className="ml-3">
                        <label className="font-medium text-gray-700 text-lg">
                            {type}
                        </label>
                        
                        </div>
                    </div>
                </div>
                        )
                    })}
                    <hr class="m-2"/>
                    <p class="text-xl mb-2">Modules</p>
                    {COURSE_LIST.map((module) => {
                        return(
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                <Field
                                    name="module"
                                    value={module}
                                    type="checkbox"
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                
                                    <div className="ml-3">
                                    <label className="font-medium text-gray-700 text-lg">
                                        {module}
                                    </label>
                                    
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    <hr class="m-2"/>
                    
                    {lecturersOpen ? 
                    <>
                    <div class="flex space-x-1 items-baseline" onClick={() => setLecturersOpen(false)}>
                        <p class="text-xl mb-2">Lecturer</p>
                        <AiFillCaretUp />
                    </div>
                    {LECTURERS.map((lecturer) => {
                        return(
                            <>
                                <div className="flex items-start">
                                <div className="flex items-center h-5">
                                <Field
                                    type="checkbox"
                                    name="lecturer"
                                    value={lecturer}
                                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                />
                                
                                <div className="ml-3">
                                <label className="font-medium text-gray-700 text-lg">
                                {lecturer}
                                </label>
                                </div>
                                </div>
                            
                        </div>
                    </>
                    )
                    
                })}
                </>
            : <div class="flex items-baseline space-x-1" onClick={() => setLecturersOpen(true)}>
                <p class="text-xl">Lecturer</p>
                <AiFillCaretDown />
            </div>
            }
                <div class="flex justify-end">
                    <button 
                        type="submit"
                        
                        class="bg-yellow-300 p-2 rounded-md m-2 font-semibold hover:font-bold hover:border-yellow-500" 
                        
                        >
                            Search
                        </button>
                </div>
                </form>
        )}
 
      </Formik>
    )
}

const AdvancedPagination = ({ numResults, setResults, formData }) => {
 
    if(numResults < 5){
        return null
    }
    if(numResults > 5 ){
        const x = numResults ? Math.round(numResults/5) : 0;
        const pagination = Array.from(Array(x).keys());
        
        return(
            <div class="flex space-x-2 mt-5 mb-8">
            {pagination.map((page, key) => {
                while(page < 11){ // fix for more than 11 pages...
                    return(
                        <div>
                            <button key={key} 
                                class="text-lg font-semibold border-gray-300 shadow-sm bg-white p-2 rounded-md" //add page highlight here...
                                onClick={(e) => {
                                    e.preventDefault();
                                    
                                    getResults(page, setResults, formData);

                                    window.scrollTo({
                                        top: 0, 
                                        left:0,
                                        behavior: 'smooth'
                                    })
                                }}
                            //add color for currentPage
                            >
                                {page + 1}
                            </button>
                        </div>
                    )
                }
                
            })
        }
        </div>
        )
    }
    else{
        return null
    }
}

export const AdvancedSearchPage = () => {
    const [lecturersOpen, setLecturersOpen] = useState(false);
    const [results, setResults] = useState('');
    
    const [formData, setFormData] = useState('');
    
    const navigate = useNavigate();
    
    //const data = JSON.parse(results['data']);

    console.log(results['data']);
    return(
            <Template component={
                <>
                    <h1 class="m-2 text-2xl font-semibold">Advanced Search</h1>
                    
                    <AdvancedSearchForm lecturersOpen={lecturersOpen} setLecturersOpen={setLecturersOpen}  setResults={setResults} setFormData={setFormData} />
                    
                    {(results['data'] && results['data'].length > 0) ? 
                    
                    <div class="m-auto space-y-2">
                        <p class="text-xl ml-4 mt-4">{results.number_results} Results for <b>'{formData.query}'</b></p>
                        {JSON.parse(results['data']).map((result, key) => {
                            return(
                                <div class="sm:w-4/5 lg:2/3 m-auto">
                                    <ResultCard result={result} key={key} query={formData.query} navigate={navigate} advanced={true} />
                                </div>
                            )}
                        )}

                    

                    </div> : results['data'] && results['data'].length === 0 && "query" in formData ? <p class="ml-4">No results for <b>'{formData.query}'</b></p> : null
                
                  
                    }
                    
                </>
            } />
    )
}

/* <AdvancedPagination numResults={results.number_results} setResults={setResults} formData={formData} /> 



*/