import { RECEIVE_POSTS, UPDATE_POST } from '../actions'


const reducer = (state={},action) => {
    switch(action.type){
        case UPDATE_POST: 
            return {
                    ...state,
                    [{...action.payload}.id]:{
                        ...state.posts[{...action.payload}.id],
                        ...action.payload
                    }
                }
        case RECEIVE_POSTS:
            return {
                    ...state,
                    ...action.payload
                }
        default:
            return state
    }
}
export default reducer;