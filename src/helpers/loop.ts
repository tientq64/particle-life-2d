import { calc } from './calc'
import { draw } from './draw'

export function loop(): void {
	calc()
	draw()
	requestAnimationFrame(loop)
}
