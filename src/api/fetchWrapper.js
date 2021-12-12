import {apiURL} from "./apiURL"

const origin = 'http://localhost:3000'; //'https://www.thriftmarket.co.uk'; //'http://localhost:8000'

const HEADERS = {'Access-Control-Allow-Credentials': true, "Access-Control-Allow-Origin": "http://localhost:3000", "Content-Type": "application/json"};

export const Get = (endpoint) => {

    return(
    fetch(apiURL + endpoint, {method:'GET', credentials: 'include',
        headers: HEADERS})
        .then(result => result.json())
        .then(resp => {
            console.log(resp);
            return resp;
        }
                )
    )
    
}

export const Post = (endpoint, payload) => {   
    return(
        fetch(apiURL + endpoint, {method:'POST', body: JSON.stringify(payload), credentials: 'include', "Content-Type": 'application/json' ,
            headers: HEADERS})
            .then(result => result.json())
            .then(resp => {
                return(resp);
        })
        )
    
    }


export const Put = (endpoint, payload) => {
    return(
        fetch(apiURL + endpoint, {method:'PUT', body: payload,credentials: 'include' ,
        headers: HEADERS})
        .then(result => 
            result.json()
        )
        .then(resp => {
            return(resp);
    }))
}

export const Delete = (endpoint) => {   

    return(
        fetch(apiURL + endpoint, {method:'DELETE',credentials: 'include' ,
        headers: HEADERS})

    )

}
