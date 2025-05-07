export const loginUser = async (user) => {
    const response = await fetch(`http://localhost:8000/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
    })

    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Login failed")
    }

    const data = await response.json()
    return data
}

export const registerUser = async (user) => {
    const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    })
    
    if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Registration failed")
    }
    
    const data = await response.json()
    return data
}
