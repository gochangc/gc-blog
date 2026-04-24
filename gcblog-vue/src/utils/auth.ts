const TOKEN_KEY = 'token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY)

export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token)

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const isLoggedIn = (): boolean => !!getToken()
