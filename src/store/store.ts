import { AppStore, useAppStore } from './useAppStore'

export let store: AppStore = useAppStore.getState()

useAppStore.subscribe((state) => {
	store = state
})
