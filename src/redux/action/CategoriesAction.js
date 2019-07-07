/**************************************
*
*
*        HERE AN ACTION
*        events executor
*           categories
*
***************************************/

import axios from 'axios';

export const showNotes = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: axios.get('http://192.168.6.180:4000/categories')
        // payload: 'cek'
    }
}

