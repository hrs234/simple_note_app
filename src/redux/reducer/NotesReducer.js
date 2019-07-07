/**************************************
*
*
*       HERE AN REDUCER
*        status creator
*
*
***************************************/

// Initialize state
const initState = {
    number: 10,
    data: [],
    results: [],
    isLoading: false,
    isLoadingFoot: false,
    isError: false,
    maxPage: null,
    currentPage: null
}




export default notes = (state = initState, action) => 
{
    /////////////////////// SHOWING DATA ///////////////////////////////////////
    
    switch(action.type)
    {
        case 'GET_NOTES_PENDING':
            return{
                ...state,
                isLoading: true
            }
        case 'GET_NOTES_REJECTED':
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case 'GET_NOTES_FULFILLED':
            console.log("==================================");
            console.log("");
            console.log("");
            console.log("");
            console.log("          Get Notes");
            console.log("");
            console.log("");
            console.log("");
            console.log("[NOTES OUTPUT] " + JSON.stringify(action.payload.data));
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("[CURRENT_PAGE] : " + JSON.stringify(parseInt(action.payload.data.current_page)));
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("[TOTAL_PAGE] : " + JSON.stringify(action.payload.data.total_page));
            

            console.log("==================================");



            return{
                ...state,
                isLoading: false,
                isError: false,
                // data: action.payload.data.results
                result: action.payload.data.data,
                currentPage: parseInt(action.payload.data.current_page),
                maxPage: parseInt(action.payload.data.total_page)
            }

        // categories
        case 'GET_CATEGORIES_PENDING':
            return{
                ...state,
                isLoadingCategories: true,
                
            }
        case 'GET_CATEGORIES_REJECTED':
            return{
                ...state,
                isLoadingCategories: false,
                isErrorCategories: true
            }
        case 'GET_CATEGORIES_FULFILLED':
            return{
                ...state,
                isLoadingCategories: false,
                isErrorCategories: false,
                // data: action.payload.data.results
                resultCategories: action.payload.data.data
            }

        //INSERT THE NOTE DATA
        case 'INSERT_NOTES_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'INSERT_NOTES_REJECTED':
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case 'INSERT_NOTES_FULFILLED':

            console.log("======================================================");
            console.log("");
            console.log("                       INSERT DATA FULFILLED JSON");
            console.log("");
            console.log("[Result action]: " + JSON.stringify(action.payload.data.data));
            console.log("[Result State]: "+JSON.stringify(state.result))
            console.log("[Result after ...]" + JSON.stringify([action.payload.data.data, ...state.result]))
            console.log("======================================================");    
        
        return{
                ...state,
                isLoading: false,
                
                // action: data from REST
                // state: data from redux / locale

                result: [action.payload.data.data, ...state.result]
            }

        // INSERT CATEGORIES DATA
        case 'INSERT_CATEGORIES_PENDING':
            return{
                ...state,
                isLoading: true,
                
            }
        case 'INSERT_CATEGORIES_REJECTED':
            return{
                ...state,
                isLoading: false,
                isError:  true
            }
        case 'INSERT_CATEGORIES_FULFILLED':
            
            console.log("==========================================");
            console.log("");
            console.log("           INSERT CATEGORIES");
            console.log("");
            console.log("[ACTION] : " + action.payload.data.data);
            console.log("[STATE] : "+state.resultCategories);
            console.log("");
            console.log("");
            console.log("");
            console.log("==========================================");

            return{
                ...state,
                isLoading: false,
                resultCategories: [action.payload.data.data, ...state.resultCategories]
            }

        case 'DELETE_NOTES_PENDING':
            return{
                ...state,
                isLoading: true,

            }
        case 'DELETE_NOTES_REJECTED':
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        
            // LAST CREATED
        case 'DELETE_NOTES_FULFILLED':
            let getID = action.payload.data;
            let newData = state.result.filter(function (element, i, array) {
                return{
                    ...state,
                    result: element.id != getID  
                } 
            });
            console.log("==================================");
            console.log("");
            console.log("");
            console.log("");
            console.log("Hasil DELETE_NOTES_FULFILLED");
            console.log(JSON.stringify(getID));
            console.log("");
            console.log("");            
            console.log("Hasil state");
            console.log(JSON.stringify(state.result));
            console.log("");
            console.log("");            
            console.log("Hasil gabungan");
            console.log(JSON.stringify(newData));
            console.log("===================================");
            return {
                ...state,
                result: newData,
                isLoading: false
            };

        case 'UPDATE_NOTES_PENDING':
            return{
                ...state,
                isLoading: true
            }
        case 'UPDATE_NOTES_REJECTED':
            return{
                ...state,
                isLoading: false,
                isError: true
            }
        case 'UPDATE_NOTES_FULFILLED':

            console.log("==========================================");
            console.log("");
            console.log("");
            console.log("");
            console.log("               UPDATE THE NOTES");
            console.log("");
            console.log("");
            console.log("");
            console.log("[STATE] : "+JSON.stringify(state.result));
            console.log("");
            console.log("");
            console.log("[ACTION] : "+JSON.stringify(action.payload.data.data));
            console.log("");
            console.log("");
            
            console.log("[COMBINE] : " + JSON.stringify(state.result.map(note =>
                (note.id == action.payload.data.data.id) ?
                    action.payload.data.data : note
            )));
            console.log("===========================================");



            return{
                ...state,
                isLoading: false,
                result: state.result.map(note => 
                    (note.id == action.payload.data.data.id) ?
                        action.payload.data.data : note
                    )
            }

        case 'GET_NOTES_MORE_PENDING':
            return{
                ...state,
                isLoadingFoot: true
            }
        case 'GET_NOTES_MORE_REJECTED':
            return{
                ...state,
                isLoadingFoot: false,
                isError: true
            }
        case 'GET_NOTES_MORE_FULFILLED':
            console.log("==================================================");
            console.log("");
            console.log("");
            console.log("");
            console.log("                GET_NOTES_MORE");
            console.log("");
            console.log("");
            console.log("");
            console.log("CURRENT_PAGE : " + JSON.stringify(action.payload.data.current_page));
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("TOTAL_PAGE : " + JSON.stringify(action.payload.data.total_page));
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("");            
            console.log("ACTION : " + JSON.stringify(action.payload.data.data));
            console.log("");
            console.log("");
            console.log("");
            console.log("");
            console.log("");            
            console.log("STATE : " + JSON.stringify(state.result));
            console.log("");            
            console.log("");            
            console.log("");            
            console.log("");            
            console.log("");            
            console.log("COMBINE : " + JSON.stringify([...state.result, ...action.payload.data.data]));            

            console.log("=================================================");


            return{
                ...state,
                ...action,
                isLoadingFoot: false,
                currentPage: action.payload.data.current_page,
                maxPage: action.payload.data.total_page,
                result: [...state.result,...action.payload.data.data]

            }
        
        // NEWEST
        case 'GET_SELECTED_CT_PENDING':

            return{
                ...state,
                isLoadingCT: true,

            }

        case 'GET_SELECTED_CT_REJECTED':
            return{
                ...state,
                isLoadingCT: false
            }
        case 'GET_SELECTED_CT_FULFILLED':
            return{
                ...state,
                isLoadingCT: false,
                currentPage: action.payload.data.current_page,
                maxPage: action.payload.data.total_page,
                result: [...state.result, ...action.payload.data.data]
            }
            
        default: 
            return {
                ...state
            };
    }
    
    // if(action.type == 'GET_NOTES_PENDING') // if notes in processing data from REST API
    // {
    //     return{
    //         isLoading: true
    //     }
    // }
    // else if(action.type == 'GET_NOTES_REJECTED')
    // {
    //     return{
    //         isLoading: false,
    //         isError: true
    //     }
    // }
    // else if(action.type == 'GET_NOTES_FULFILLED')
    // {
    //     return{
    //         isLoading: false,
    //         isError: false,
    //         data: action.payload.data.results
    //     }
    // }

    /////////////////////// INSERT DATA //////////////////////
    // else if(action.type == 'INSERT_NOTES_PENDING')
    // {
    //     return{
    //         isLoading: true,
            
    //     }
    // }
    // else if(action.type == 'INSERT_NOTES_ERROR')
    // {
    //     return{
    //         isLoading: false,
    //         isError: true
    //     }
    // }
    // else if(action.type == 'INSERT_NOTES_OK')
    // {
    //     return{
    //         isLoading: false,
    //         isError: false
    //     }
    // }

    /////////////////////// DEFAULT /////////////////////////
    // else
    // {
    //     return state;
    // }
}