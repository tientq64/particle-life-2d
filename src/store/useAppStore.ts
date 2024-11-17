import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Snapshot } from '../helpers/snapshot'
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
	canvasFillMode: 'contain' | 'fill'
	interactiveRange: [number, number]
}

export interface AppStore extends Configs {
	groups: Group[]
	ctx: CanvasRenderingContext2D | null
	canvas: HTMLCanvasElement | null
	isMouseDown: boolean
	isMouseMove: boolean
	isShowPanel: boolean
	showPanelWhenHovered: boolean
	isPaused: boolean
	cameraMoveLeft: boolean
	cameraMoveRight: boolean
	cameraMoveUp: boolean
	cameraMoveDown: boolean
	cameraVelocityX: number
	cameraVelocityY: number
	snapshot: Snapshot | undefined
}

export function getDefaultConfigs(): Configs {
	return {
		skipRuleWhenSameGroup: false,
		gridSnapping: false,
		gridSnapSize: 5,
		atomShapeName: 'circle',
		atomRadius: 4,
		canvasFillMode: 'contain',
		interactiveRange: [0, 160]
	}
}

export const useAppStore = create(
	persist<AppStore, [], [], Partial<AppStore>>(
		() => ({
			...getDefaultConfigs(),
			groups: [],
			ctx: null,
			canvas: null,
			isMouseDown: false,
			isMouseMove: false,
			isShowPanel: true,
			showPanelWhenHovered: false,
			isPaused: false,
			cameraMoveLeft: false,
			cameraMoveRight: false,
			cameraMoveUp: false,
			cameraMoveDown: false,
			cameraVelocityX: 0,
			cameraVelocityY: 0,
			snapshot: undefined
		}),
		{
			name: 'tientq64/particle-life-2d',
			partialize: (state) => ({
				skipRuleWhenSameGroup: state.skipRuleWhenSameGroup,
				gridSnapping: state.gridSnapping,
				gridSnapSize: state.gridSnapSize,
				atomShapeName: state.atomShapeName,
				atomRadius: state.atomRadius,
				canvasFillMode: state.canvasFillMode,
				interactiveRange: state.interactiveRange,
				isShowPanel: state.isShowPanel,
				showPanelWhenHovered: state.showPanelWhenHovered
			})
		}
	)
)

export const setAppStore = useAppStore.setState
