import { AppStore, getAppStore, subscribeAppStore } from '../store/useAppStore'
import { height, PI_2, width } from './init'

let store: AppStore = getAppStore()

subscribeAppStore((state) => {
	store = state
})

export function draw(): void {
	if (store.isPaused && !store.isMouseMove) return

	const ctx: CanvasRenderingContext2D | null = store.ctx
	if (ctx === null) return

	ctx.fillStyle = '#1e293b88'
	ctx.fillRect(0, 0, width, height)

	for (const group of store.groups) {
		const radius: number = store.atomRadius
		ctx.fillStyle = group.color
		ctx.strokeStyle = group.color
		ctx.lineWidth = radius * 0.75

		for (const atom of group.atoms) {
			let x: number = atom.x
			let y: number = atom.y
			if (store.gridSnapping) {
				x = Math.round(x / store.gridSnapSize) * store.gridSnapSize
				y = Math.round(y / store.gridSnapSize) * store.gridSnapSize
			}
			switch (store.atomShapeName) {
				case 'circle':
					{
						ctx.beginPath()
						ctx.arc(x, y, radius, 0, PI_2)
						ctx.fill()
						ctx.closePath()
					}
					break
				case 'ring':
					{
						ctx.beginPath()
						ctx.arc(x, y, radius * 0.75, 0, PI_2)
						ctx.stroke()
						ctx.closePath()
					}
					break
				case 'square':
					{
						const size: number = radius * 2
						ctx.fillRect(x - radius, y - radius, size, size)
					}
					break
			}
		}
	}
}
