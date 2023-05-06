const initialState = {
    dogs : [],
    temperaments: [],
    allDogs: [],
    details: []
}

function rootReducer( state= initialState, action) {
    switch(action.type) {
        case 'GET_DOGS':
             action.payload.forEach(el => {
                 if (!el.temperaments[0]) {
                   el.temperaments[0] = "sin-temperamentos" 
                 }
               });
            return {
                ...state, 
                dogs: action.payload, 
                allDogs: action.payload
            }   

        case 'GET_TEMPERAMENTS':
            const temperamentsFiltered = action.payload.filter(tempe => tempe.name !== "")
            return {
                ...state,
                temperaments: temperamentsFiltered
            }

        case 'GET_FILTERED_TEMPERAMENTS':
            const allDogs = state.allDogs;
            let filteredDogs = [];
            if (action.payload === "Todos") {
                filteredDogs = allDogs;
            } else {
                for (let i = 0; i < allDogs.length; i++) {
                let found = allDogs[i].temperaments.find((tempe) => tempe === action.payload);
                    if (found) {
                        filteredDogs.push(allDogs[i]);
                    }
                }
            }
            return {
                ...state,
                dogs: filteredDogs
            }
        case 'FILTERED_CREATED':
            const Dogs = state.allDogs; 
            const createdFilter = action.payload === 'created' ? Dogs.filter(el => el.created) 
            : Dogs.filter(el => !el.created)
            return {
                ...state,
                dogs: action.payload === "Todo" ? state.allDogs : createdFilter
            }
        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }
        case 'ORDER_BY_NAME':
            const sortName = action.payload === 'asc' ? state.allDogs.sort((a,b) => {
                if(a.name > b.name) {
                    return 1
                }
                if (b.name > a.name) {
                    return -1;
                  }
                  return 0;
            }) : state.allDogs.sort((a,b) => {
                if (a.name > b.name) {
                    return -1;
                  }
                  if (b.name > a.name) {
                    return 1;
                  }
                  return 0;
            })
            return {
                ...state,
                dogs: sortName
            }
        case 'ORDER_BY_WEIGHT':
            const sortWeight = action.payload === 'min-weight' ? state.allDogs.sort((a,b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return 1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return -1;
                  }
                  return 0;
            }) : state.allDogs.sort((a,b) => {
                if (parseInt(a.weight[1]) > parseInt(b.weight[1])) {
                    return -1;
                  }
                  if (parseInt(b.weight[1]) > parseInt(a.weight[1])) {
                    return 1;
                  }
                  return 0;
            })
            return {
                ...state,
                dogs: sortWeight
            }
        case 'DOG_DETAILS':
            let allDetails = action.payload
            if(!allDetails[0].temperaments[0]) {
                allDetails[0].temperaments[0] = 'sin-temperamentos'
            }
            return {
                ...state,
                details: allDetails
            }
        case 'POST_DOG':
            return {
                ...state
            }
            default:
                return state;
    }
}

export default rootReducer;