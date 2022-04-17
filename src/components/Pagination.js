export const Pagination = ({socket, query, pages, setPages}) => {
 
    if(pages.number < 5){
        return null
    }
    if(pages.number > 5 ){
        const x = pages.number ? Math.round(pages.number/5) : 0;
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
                                    
                                    pages.type === '0' ? 
                                    socket.emit('quick_search', query, page)  : socket.emit('search', query, page);
                                    window.scrollTo({
                                        top: 0, 
                                        left:0,
                                        behavior: 'smooth'
                                    });
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