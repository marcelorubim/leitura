const header = {
    headers: { 'Authorization': 'rubim-marcelo' }
}

export function fetchCategoriesAPI () {return fetch('/categories',header)}

export function fetchAllPostsAPI () {return fetch('/posts',header)}
