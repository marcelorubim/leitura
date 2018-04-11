const header = {
    headers: { 
        'Authorization': 'rubim-marcelo' ,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

export function fetchCategoriesAPI() { return fetch('/categories', header) }

export function fetchAllPostsAPI() { return fetch('/posts', header) }

export function fetchPostDetailAPI(postId) { return fetch(`/posts/${postId}`, header) }

export function fetchCommentsAPI(postId) { return fetch(`/posts/${postId}/comments`, header) }

export function addComment(comment) {
    return fetch(`/comments`, 
    { 
        method: 'POST', 
        ...header, 
        body: JSON.stringify(comment) 
    })
}

