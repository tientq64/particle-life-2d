import { AppStore, getAppStore, subscribeAppStore } from './useAppStore'

export let store: AppStore = getAppStore()

subscribeAppStore((state) => {
	store = state
})
