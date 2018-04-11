import { RECEIVE_CATEGORIES,RECEIVE_POSTS,SELECT_CATEGORY,FETCH_POST_DETAIL,RECEIVE_COMMENTS } from '../actions'

const initialState = {
    activeCategory: null,
    categories: [],
    posts: [],
    comments: [],
    postSelected: {}
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
        case FETCH_POST_DETAIL:
            return {
                ...state,
                postSelected:action.postSelected
            }
        case RECEIVE_COMMENTS:
            return{
                ...state,
                comments:action.comments   
            }
        default:
            return state
    }
}
export default root;