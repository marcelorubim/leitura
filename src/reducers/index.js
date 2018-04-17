import { RECEIVE_CATEGORIES,RECEIVE_POSTS,SELECT_CATEGORY,RECEIVE_COMMENTS,UPDATE_POST,TOGGLE_POST_MODAL } from '../actions'

const initialState = {
    activeCategory: null,
    categories: [],
    posts: {},
    selectedPostId: null,
    comments: {},
    showModal: false,
    pendingActions: 0
}

const root = (state=initialState,action) => {
    switch(action.type){
        case UPDATE_POST: 
            return {
                ...state,
                posts:{
                    ...state.posts,
                    [{...action.payload}.id]:{
                        ...state.posts[{...action.payload}.id],
                        ...action.payload
                    }
                }
            }
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
                comments:{
                    ...state.comments,
                    ...action.payload
                }   
            }
        case TOGGLE_POST_MODAL:
            return {
                ...state,
                showModal:!state.showModal,
                selectedPostId:action.payload                
            }
        default:
            return state
    }
}
export default root;