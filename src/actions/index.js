import {fetchCategoriesAPI,fetchAllPostsAPI,fetchPostDetailAPI,fetchCommentsAPI} from '../api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const FETCH_POST_DETAIL = 'FETCH_POST_DETAIL';
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';



function receiveComments(comments){
    return {
        type: RECEIVE_COMMENTS,
        comments
    };
}

function receivePostDetail(postSelected){
    return {
        type: FETCH_POST_DETAIL,
        postSelected
    };
}

function receiveCategories(categories){
    return {
        type: RECEIVE_CATEGORIES,
        categories
    };
}

export function selectCategory(activeCategory){
    return {
        type: SELECT_CATEGORY,
        activeCategory
    };
}

export const fetchCategories = () => dispatch => (
    fetchCategoriesAPI().then((response) => response.json())
    .then((responseJson) => (dispatch(receiveCategories(responseJson.categories))
  )))

  function receivePosts(posts){
    return {
        type: RECEIVE_POSTS,
        posts
    };
}

export const fetchPosts = () => dispatch => (
    fetchAllPostsAPI().then((response) => response.json())
    .then((responseJson) => (dispatch(receivePosts(responseJson))
  )))

  export const fetchPostDetail = (postId) => dispatch => (
    fetchPostDetailAPI(postId).then((response) => response.json())
    .then((responseJson) => (dispatch(receivePostDetail(responseJson))
  )))

  export const fetchComments = (postId) => dispatch => (
    fetchCommentsAPI(postId).then((response) => response.json())
    .then((responseJson) => (dispatch(receiveComments(responseJson))
  )))