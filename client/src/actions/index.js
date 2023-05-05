import axios from 'axios'

export function getDogs() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/dogs")
        return dispatch({
            type: 'GET_DOGS',
            payload: json.data
        })
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/temperament")
        return dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: json.data
        })
    }
}

export function filteredByTemperament(payload) { 

    return {
        type: 'GET_FILTERED_TEMPERAMENTS',
        payload
    }
}

export function filteredCreated(payload) {
    return {
        type: 'FILTERED_CREATED',
        payload
    }
}

export function getNameDogs(payload) { //value en option
    return async function (dispatch) {
        try {
            let json = await axios.get(`http://localhost:3001/dogs?name=${payload}`)
            return dispatch({
                type: 'GET_NAME_DOGS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
} 

export  function orderByName(payload) {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload) {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function dogDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs/"+id, {       
            })
            return dispatch ({
                type: 'DOG_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    } 
}

export function postDog(payload) {
    return async function () {
        const data = await axios.post("http://localhost:3001/dog", payload)
        return data
    }
}