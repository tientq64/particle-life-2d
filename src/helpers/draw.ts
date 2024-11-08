import { store } from '../store/store'
import { height, PI_2, width } from './init'

const hexagon: Path2D = new Path2D(
	'm-5 0 2.5 4.5h5L5 0 2.5-4.5h-5zm3.5 0a1 1 0 013 0 1 1 0 01-3 0Z'
)
const diamond: Path2D = new Path2D('M0-5 5 0 0 5-5 0Z')

export function draw(): void {
	if (store.isPaused && !store.isMouseMove) return

	const ctx: CanvasRenderingContext2D | null = store.ctx
	if (ctx === null) return

	const radius: number = store.atomRadius
	const diameter: number = radius * 2
	const radiusScale: number = radius / 4
	const ringRadius: number = radius * 0.7

	ctx.fillStyle = '#1e293b88'
	ctx.fillRect(0, 0, width, height)
	ctx.lineWidth = radius * 0.8

	for (const group of store.groups) {
		ctx.fillStyle = group.color
		ctx.strokeStyle = group.color

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
						ctx.scale(radiusScale, radiusScale)
						ctx.fill(hexagon)
						ctx.resetTransform()
						ctx.closePath()
					}
					break
				case 'square':
					{
						ctx.fillRect(x - radius, y - radius, diameter, diameter)
					}
					break
				case 'diamond':
					{
						ctx.beginPath()
						ctx.translate(x, y)
						ctx.scale(radiusScale, radiusScale)
						ctx.fill(diamond)
						ctx.resetTransform()
						ctx.closePath()
					}
					break
			}
		}
	}
}
