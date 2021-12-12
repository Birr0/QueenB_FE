import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';

const Highlighted = ({text = '', highlight = '', video_data, url}) => {

    if(highlight.length === 0){
        return(
        video_data.map((clip, i) => {
            return(
                <a key={i} href={url + "?st=" + clip.startSeconds} style={{textDecoration:"none", color:"black"}} target="_blank" rel="noreferrer noopener"> {clip.eventData.text}</a>
                )
        })
        )
    }

    const regex = new RegExp(`(${highlight.trim().replace(' ', '|')})`, 'gi')
    
    return (
        <span>
            {video_data.map((clip, i) => {
                    if(regex.test(String(clip.eventData.text))){
                        const clip_split = clip.eventData.text.split(regex);
                        return(
                            <a key={i} href={url + "?st=" + clip.startSeconds} style={{textDecoration:"none", color:"black"}} target="_blank" rel="noreferrer noopener">{
                                clip_split.map((quote, key) => {
                                    if(regex.test(quote)){
                                        return <mark key={key}>{quote}</mark>
                                    }
                                    else{
                                        return quote
                                    }
                                })
                            }</a>
                        )
                    }
                    else{
                        return(
                        <a key={i} href={url + "?st=" + clip.startSeconds} style={{textDecoration:"none", color:"black"}} target="_blank" rel="noreferrer noopener"> {clip.eventData.text}</a>
                        )
                    }
                })    
            }
        </span>
        )
 }

export const LectureVideo = ({doc}) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <>
            <div style={{display:"block", marginLeft:"20px", marginTop:"10px"}}>
                <BiArrowBack style={{fontSize:"25px"}}
                 onClick={(e) => {
                    e.preventDefault();
                    navigate('/', {state: location.state ? location.state : null});
                  }}
                />
                <h1>{doc.result.title}</h1>
                <i>{doc.result.date}</i>
                <p>{doc.result.description}</p> 
                <b>Format - {doc.result.type}</b>
                <br></br>
                <a href={doc.result.url}>Full video link</a>
                <br></br>
                <p>(Click on word or setence to jump to video clip)</p>
            </div>
            <div style={{maxWidth:"80%", marginLeft:"auto", marginRight:"auto", marginTop:"20px"}}>
                <h2>Transcript</h2>
                <Highlighted text={doc.result.content} highlight={doc.query ? doc.query : ''} video_data={doc.result.video_data} url={doc.result.url} />
            </div>
        </>
    )
}