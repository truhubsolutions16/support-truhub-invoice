export const STORAGE_KEY = 'truhub_data_v1'

export interface AppState {
  company?: unknown
  invoices: Record<string, any>
  customers: Record<string, any>
  products: Record<string, any>
}

const initialState: AppState = {
  company: undefined,
  invoices: {},
  customers: {},
  products: {}
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return initialState
    return JSON.parse(raw) as AppState
  } catch (e) {
    console.error('Failed to load state', e)
    return initialState
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.error('Failed to save state', e)
  }
}
