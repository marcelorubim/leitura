import { RECEIVE_CATEGORIES,RECEIVE_POSTS,SELECT_CATEGORY,RECEIVE_COMMENTS } from '../actions'

const initialState = {
    activeCategory: null,
    categories: [],
    posts: {},
    comments: {},
}

const root = (state=initialState,action) => {
    switch(action.type){
        case RECEIVE_CATEGORIES: 
            return {
                ...state,
                categories:action.categories
            }
        case RECEIVE_POSTS:
            return {
                ...state,
                posts:{
                    ...state.posts,
                    ...action.payload
                }
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                activeCategory:action.activeCategory
            }
        case RECEIVE_COMMENTS:
            return{
                ...state,
                comments:{...state.comments,...action.payload}   
            }
        default:
            return state
    }
}
export default root;