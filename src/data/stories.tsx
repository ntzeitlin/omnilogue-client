
const API_URL = "http://localhost:8000"

export const getAllStories = async (token) => {
    const response = await fetch(`${API_URL}/stories`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}


export const getBookshelf = async (token) => {
    const response = await fetch (`${API_URL}/bookshelves`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}


export const getStoryDetail = async (token, storyId) => {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}

export const deleteStory = async (token, storyId) => {
    const response = await fetch(`${API_URL}/stories/${storyId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}