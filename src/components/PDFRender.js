import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useLocation, useNavigate } from "react-router";
import { BiArrowBack } from "react-icons/bi";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


// add file to render as argument ... or filepath ... with page number ...
export const PDFRender = () => {   
    const location = useLocation();

    let doc = location.state ? location.state : null;
    

    const navigate = useNavigate();

    const [numPages, setNumPages] = useState(null);
    let [pageNumber, setPageNumber] = useState('');

    //const textRenderer = (textItem) => {
    //  return highlightPattern(textItem.str, 'a');
    //};
  
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(Number(location.state.result.page_number));
    }
   

    return (
      <div>
        <div style={{display:"block", marginLeft:"20px", marginTop:"10px"}}>
            <BiArrowBack style={{fontSize:"25px"}} onClick={(e) => {
              e.preventDefault();
              navigate('/', {state: location.state ? location.state : null});
            }}/>
            <h1>{doc.result.filename} - Page {pageNumber}</h1>
            <i>{doc.result.date}</i>
            <p>{doc.result.description}</p> 
            <b>Format - {doc.result.type}</b>
            <br></br>
            <br></br>
        </div>
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          {pageNumber !== 1 ?
              <button onClick={(e) => {
                  e.preventDefault();
                  setPageNumber(pageNumber -= 1)
              }} style={{maxHeight:"50px",  maxWidth:"50px", backgroundColor:"white", fontSize:"40px", border:"none"}}>{`${'<'}`}</button> : null}
              
          
              <Document
              file={`http://localhost:5000/pdfNotes/${location.state.result.filename}`}
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
              }} style={{maxHeight:"50px", maxWidth:"50px", backgroundColor:"white", fontSize:"40px", border:"none"}}>{`${'>'}`}</button>
              : null}
          </div>
      </div>
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