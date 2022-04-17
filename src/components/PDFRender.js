import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation, useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
import {apiURL} from "../api/apiURL";
import {useParams} from "react-router-dom";
import {Template} from "./Template.js";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


export const PDFRender = () => {   
    const location = useLocation();

    console.log(location);

    const params = useParams();
    const advanced = location.state.advanced;

    const title = location.state.result.title.split(' ');
    
    let doc = location.state ? location.state : null;
    
    console.log(doc);
   

    const navigate = useNavigate();

    const [numPages, setNumPages] = useState(null);
    let [pageNumber, setPageNumber] = useState('');

    //const textRenderer = (textItem) => {
    //  return highlightPattern(textItem.str, 'a');
    //};
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(Number(title[title.length - 1]));
    }
   

    return (
      <Template component={
        <div>
          <div style={{display:"block", marginLeft:"20px", marginTop:"10px"}}>
              
              {advanced ? null : 
                <BiArrowBack style={{fontSize:"25px"}} onClick={(e) => {
                  e.preventDefault();
                  navigate('/', {state: location.state ? location.state : '/'});
                }}/>
            }
               <p className="text-3xl font-semibold mb-1">{doc.result.title.split('.pdf')[0]}</p>
              <div className='flex space-x-1 mb-4'>
               
                
                <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.type}</p>
                { doc.result.lecturer ? <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.lecturer}</p> : null}
                <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.module_code} - {doc.result.module_name}</p>
              </div>
          </div>
          <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            {pageNumber !== 1 ?
                <button onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber -= 1)
                }} style={{maxHeight:"50px",  maxWidth:"50px", backgroundColor:"none", fontSize:"40px", border:"none"}}>{`${'<'}`}</button> : null}
                
            
                <Document
                file={`${apiURL}/pdfNotes/${params.docID}`}
                onLoadSuccess={onDocumentLoadSuccess}
                renderMode={"canvas"}
                >
                <Page
                    pageNumber={pageNumber}
                    //customTextRenderer={textRenderer}
                />
                </Document>
                {pageNumber < numPages ? 
                <button onClick={(e) => {
                    e.preventDefault();
                    setPageNumber(pageNumber += 1)
                }} style={{maxHeight:"50px", maxWidth:"50px", backgroundColor:"none", fontSize:"40px", border:"none"}}>{`${'>'}`}</button>
                : null}
            </div>
        </div>
      } />
    );
}

/*
function highlightPattern(text, pattern) {
    const splitText = text.split(pattern);
  
    if (splitText.length <= 1) {
      return text;
    }
  
    const matches = text.match(pattern);
  
    return splitText.reduce((arr, element, index) => (matches[index] ? [
      ...arr,
      element,
      <p  key={index} style={{position:"absolute", textDecoration:"underline"}}>
        {matches[index]}
      </p>,
    ] : [...arr, element]), []);
  }

*/