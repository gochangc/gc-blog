import { createPinia } from 'pinia'

export const store = createPinia()

export * from './modules/user'
export * from './modules/blog'
export * from './modules/navigation'
