import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {SearchPage} from "./components/SearchPage";
import {ResultPage} from "./components/ResultPage";
import {PDFRender} from "./components/PDFRender";
import { Features } from "./components/Features";
import { NotFound } from "./components/NotFound";
import socketIOClient from "socket.io-client";
import { AdvancedSearchPage } from "./components/AdvancedSearch";
import { AdminPage } from "./components/AdminPage";

const ENDPOINT = "http://104.248.161.38/api";//"http://127.0.0.1:5000";


export const socket = socketIOClient("http://104.248.161.38", { //"http://127.0.0.1:5000/"
  withCredentials:true, 
  extraHeaders: {
    "Access-Control-Allow-Origin" :"*", // '*',//"http://localhost:3000"
  }
});

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchPage socket={socket}/>} />
        <Route exact path="/advanced-search" element={<AdvancedSearchPage />} />
        <Route path="/lecture/:docID" element={<ResultPage />} />
        <Route path="/notes/:docID" element={<PDFRender />} />
        <Route path="/features" element={<Features />} />
        <Route path="/admin" element={<AdminPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
  </Router>

  );
}

export default App;
