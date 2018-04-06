import { RECEIVE_CATEGORIES,RECEIVE_POSTS,SELECT_CATEGORY } from '../actions'

const initialState = {
    activeCategory: null,
    categories: [],
    posts: []
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
                posts:action.posts
            }
        case SELECT_CATEGORY:
            return {
                ...state,
                activeCategory:action.activeCategory
            }
        default:
            return state
    }
}
export default root;