export const Highlighted = ({text = '', highlight = '', title = false}) => {
    

    //console.log(highlight.trim().replace(' ', '|'));
    const regex = new RegExp(`(${highlight.trim().replace(' ', '|')})`, 'gi')
    const parts = text.split(regex);
    if(title === true){
        return(
            <span>
                {parts.filter(part => part).map((part, i) => (
                    regex.test(part) ? <mark key={i}> {part}</mark> : 
                    <span key={i}> {part} </span>
                ))}
            </span>
        )
    }
    else{
        return (
        <span>
            {parts.filter(part => part).map((part, i) => (
                regex.test(part) ? <mark key={i}>{part}</mark> : 
                i < 2 ?
                    
                <span key={i}>...{part.substring(part.length - 50,part.length - 1)} </span>
                    :
                <span key={i}>{part.substring(0,100)}...</span> // fix ellipsis rendering with cocnurent words etc ... 
            ))}
        </span>
        )
    }
 }