import AppState from './app-store'

export default AppState

export const createStoreMap = () => ({
  appState: new AppState(),
})
