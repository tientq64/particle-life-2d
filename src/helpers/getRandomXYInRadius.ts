import { height, PI_2, width } from './init'
import { modulo } from '../utils/modulo'
import { random } from '../utils/random'

export function getRandomXYInRadius(
	orgX: number,
	orgY: number,
	maxRadius: number
): [number, number] {
	const radius: number = random(0, maxRadius)
	const angle: number = Math.random() * PI_2
	const x: number = modulo(orgX + Math.cos(angle) * radius, width)
	const y: number = modulo(orgY + Math.sin(angle) * radius, height)
	return [x, y]
}
