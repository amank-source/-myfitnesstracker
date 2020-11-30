const BASE_URL = 'https://fitnesstrac-kr.herokuapp.com/api'

export const getToken = () => {
  if (localStorage.getItem('auth-token')) {
    return localStorage.getItem('auth-token')
  } else {
    localStorage.removeItem('auth-token')
  }
}

export const clearToken = () => {
  localStorage.removeItem('auth-token')
}

const setToken = (token) => {
  localStorage.setItem('auth-token', token)
}

function buildHeaders() {
  let base = {
    'Content-Type': 'application/json',
  }

  if (getToken()) {
    base['Authorization'] = `Bearer ${getToken()}`
  }

  return base
}

export const auth = async (username, password, isNew = false) => {
  const url = `${BASE_URL}/users` + (isNew ? '/register' : '/login')

  const response = await fetch(url, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })

  const { error, user, token } = await response.json()

  if (error) {
    throw Error(error.message)
  }

  if (token) {
    setToken(token)
  }

  return user
}

export const hitAPI = async (method, endpoint, bodyObj) => {
  const payload = {
    method: method,
    headers: buildHeaders(),
  }

  if (bodyObj) {
    payload.body = JSON.stringify(bodyObj)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, payload)

  const data = await response.json()

  return data
}


