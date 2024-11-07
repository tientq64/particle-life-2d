import { AppStore, getAppStore, subscribeAppStore } from '../store/useAppStore'
import { height, PI_2, width } from './init'

let store: AppStore = getAppStore()

subscribeAppStore((state) => {
	store = state
})

const hexagon: Path2D = new Path2D('M-3 0-1.5 2.6h3L3 0 1.5-2.6h-3Z')

export function draw(): void {
	if (store.isPaused && !store.isMouseMove) return

	const ctx: CanvasRenderingContext2D | null = store.ctx
	if (ctx === null) return

	ctx.fillStyle = '#1e293b88'
	ctx.fillRect(0, 0, width, height)

	const radius: number = store.atomRadius
	const diameter: number = radius * 2
	const ringRadius: number = radius * 0.7

	for (const group of store.groups) {
		ctx.fillStyle = group.color
		ctx.strokeStyle = group.color
		ctx.lineWidth = radius * 0.8

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
						ctx.arc(x, y, ringRadius, 0, PI_2)
						ctx.stroke()
						ctx.closePath()
					}
					break
				case 'hexagon':
					{
						ctx.beginPath()
						ctx.translate(x, y)
						ctx.stroke(hexagon)
						ctx.translate(-x, -y)
						ctx.closePath()
					}
					break
				case 'square':
					{
						ctx.fillRect(x - radius, y - radius, diameter, diameter)
					}
					break
			}
		}
	}
}
