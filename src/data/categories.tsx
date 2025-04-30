
export const getCategories = async (token) => {
    const response = await fetch("http://localhost:8000/categories", {
        method: "GET",
        headers: {
            Authorization: `Token ${token}`
        }
    })
    const data = await response.json()
    return data
}