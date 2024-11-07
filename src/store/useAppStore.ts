import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { AtomShapeName } from '../models/atomShapes'

export interface Atom {
	x: number
	y: number
	vx: number
	vy: number
}

export interface Group {
	index: number
	color: string
	atoms: Atom[]
	forces: number[]
}

export interface Configs {
	skipRuleWhenSameGroup: boolean
	gridSnapping: boolean
	gridSnapSize: number
	atomShapeName: AtomShapeName
	atomRadius: number
}

export interface AppStore extends Configs {
	groups: Group[]
	ctx: CanvasRenderingContext2D | null
	canvas: HTMLCanvasElement | null
	isMouseDown: boolean
	isMouseMove: boolean
	isShowPanel: boolean
	isPaused: boolean
}

export const defaultConfigs: Configs = {
	skipRuleWhenSameGroup: false,
	gridSnapping: false,
	gridSnapSize: 5,
	atomShapeName: 'ring',
	atomRadius: 4
}

export const useAppStore = create(
	persist<AppStore, [], [], Partial<AppStore>>(
		() => ({
			...defaultConfigs,
			groups: [],
			ctx: null,
			canvas: null,
			isMouseDown: false,
			isMouseMove: false,
			isShowPanel: true,
			isPaused: false
		}),
		{
			name: 'tientq64/particle-life-2d',
			partialize: (state) => ({
				skipRuleWhenSameGroup: state.skipRuleWhenSameGroup,
				gridSnapping: state.gridSnapping,
				gridSnapSize: state.gridSnapSize,
				atomShapeName: state.atomShapeName,
				atomRadius: state.atomRadius,
				isShowPanel: state.isShowPanel
			})
		}
	)
)

export const setAppStore = useAppStore.setState
export const getAppStore = useAppStore.getState
export const subscribeAppStore = useAppStore.subscribe