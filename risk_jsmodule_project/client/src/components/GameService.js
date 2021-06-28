const baseURL = 'http://localhost:5000/api/players/'

export const postPlayer = (payload) => {
    return fetch(baseURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json'}
    })
    .then(res => res.json())
}

export const getPlayer = () => {
    return fetch(baseURL)
    .then(res => res.json())
}

export const putPlayer = (id, payload) => {
    return fetch(baseURL + id, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    } )
    .then( res => res.json())
}

export const deletePlayer = (id) => {
    return fetch(baseURL + id, {
        method: 'DELETE'
    })
}
