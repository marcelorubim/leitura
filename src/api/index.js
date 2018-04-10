const header = {
    headers: { 'Authorization': 'rubim-marcelo' }
}

export function fetchCategoriesAPI () {return fetch('/categories',header)}

export function fetchAllPostsAPI () {return fetch('/posts',header)}

export function fetchPostDetailAPI (id)  {console.log(id); return fetch(`/posts/${id}`,header)}
