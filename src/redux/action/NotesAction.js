/**************************************
*
*
*        HERE AN ACTION
*        events executor
*
*
***************************************/

import axios from 'axios';
import HOST_API from '../../config/rest_setting';

export const showNotes = (search='', sort='desc', page=1) =>
{
    return{
        type: 'GET_NOTES',
        payload: axios.get(`http://192.168.6.179:4000/notes?search=${search}&sort=${sort}&page=${page}&limit=6`),
        // payload: 'cek'
        
    }
    
}

export const moreNotes = (search = '', sort = 'desc', page = 1) =>
{
    return{
        type: 'GET_NOTES_MORE',
        payload: axios.get(`http://192.168.6.179:4000/notes?search=${search}&sort=${sort}&page=${page}&limit=6`)
    }
}

export const selectCategories = (search = '', sort = 'desc', page = 1, category='Important') =>
{
    return {
        type: 'GET_SELECTED_CT',
        payload: axios.get(`http://192.168.6.179:4000/notes?search=${search}&sort=${sort}&page=${page}&category=${category}&limit=6`)
    }
}

// export const loadMore = (pages=0) =>
// {
//     return{
//         type: 'GET_MORE_NOTE',
//         payload: axios.get(`http://192.168.6.190:4000/notes?page=${pages}&limit=5`)
//     }
// }

export const showCategories = () =>
{
    return{
        type: 'GET_CATEGORIES',
        payload: axios.get('http://192.168.6.179:4000/categories')
    }
}


// action for Add an notes
export const addNote = (data) => {
    return{
        type: 'INSERT_NOTES',
        payload: axios.post('http://192.168.6.179:4000/notes', data)
    }
}

export const updateNote = (id,data) =>{
    return{
        type: 'UPDATE_NOTES',
        payload: axios.put(`http://192.168.6.179:4000/notes?id=${id}`, data)
    }
}


// Action for deleting notes
export const deleteNote = (id) =>{

    return{
        type: 'DELETE_NOTES',
        payload: axios.delete(`http://192.168.6.179:4000/notes?id=${id}`)  
    } 
}

export const addCategories = (data) =>{
    return{
        type: 'INSERT_CATEGORIES',
        payload: axios.post('http://192.168.6.179:4000/categories', data)
    }
}