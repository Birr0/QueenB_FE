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

const ENDPOINT = "http://127.0.0.1:5000";


export const socket = socketIOClient(ENDPOINT, {
  withCredentials:true, 
  extraHeaders: {
    "Access-Control-Allow-Origin" : "http://localhost:3000"
  }
});

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SearchPage socket={socket}/>} />
        <Route path="/lecture/:docID" element={<ResultPage />} />
        <Route path="/notes/:docID" element={<PDFRender />} />
        <Route path="/features" element={<Features />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </Router>

  );
}

export default App;
