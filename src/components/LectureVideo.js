import { BiArrowBack } from 'react-icons/bi';
import { useNavigate, useLocation } from 'react-router-dom';
import { Template } from './Template';
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

export const LectureVideo = ({doc, advanced}) => {
    const navigate = useNavigate();
    const location = useLocation();
    
    return(
        <Template component={ 
            <>
                <div className='w-5/6 m-auto mt-4'>
                {advanced ? null : 
                    <BiArrowBack style={{fontSize:"25px"}} onClick={(e) => {
                        e.preventDefault();
                        navigate('/', {state: location.state ? location.state : '/'});
                        }}/>
                    }
                   
                    <p className='text-2xl font-semibold'>{doc.result.title}</p>
                    <i>{doc.result.date}</i>
                    <p>{doc.result.description}</p> 
                    <b>Format - {doc.result.type}</b>
                    <div className='flex'>
                        <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.type}</p>
                        { doc.result.lecturer ? <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.lecturer}</p> : null}
                        <p className="border-2 border-red-500 bg-red-300 w-fit p-1 rounded-md">{doc.result.module_code} - {doc.result.module_name}</p>
                    </div>
                    <a href={doc.result.url}>{doc.result.url}</a>
                    <br></br>
                    <p>(Click on word or setence to jump to video clip)</p>
                </div>
                <div className='w-5/6 m-auto'>
                    <p className="text-xl">Transcript</p>
                    <Highlighted text={doc.result.content} highlight={doc.query ? doc.query : ''} video_data={doc.result.video_data} url={doc.result.url} />
                </div>
            </>
        } />
    )
}