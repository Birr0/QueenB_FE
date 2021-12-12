export const Pagination = ({socket, query, pages, setPages}) => {
 
    if(pages.number < 5){
        return null
    }
    if(pages.number > 5 ){
        const x = pages.number ? Math.round(pages.number/5) : 0;
        const pagination = Array.from(Array(x).keys());
        
        return(
            pagination.map((page, key) => {
                while(page < 11){ // fix for more than 11 pages...
                    return(
                        <button key={key} onClick={(e) => {
                            e.preventDefault();
                            
                            pages.type === '0' ? 
                            socket.emit('quick_search', query, page)  : socket.emit('search', query, page);
                            window.scrollTo({
                                top: 0, 
                                left:0,
                                behavior: 'smooth'
                            });
                        }}
                        style={{borderRadius:'50%',  margin:"2px", width:"25px", textAlign:"center", border:"1px solid black", backgroundColor:"white"}} //add color for currentPage
                        >{page + 1}</button>
                    )
                }
                
            })
        )
    }
    else{
        return null
    }
}