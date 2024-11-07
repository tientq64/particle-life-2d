import { Atom } from '../store/useAppStore'
import { height, width } from './init'

export function getDistancesBetweenTwoAtom(atomA: Atom, atomB: Atom): [number, number, number] {
	let dx: number = atomB.x - atomA.x
	let dy: number = atomB.y - atomA.y

	const dxAbs: number = Math.abs(dx)
	const dyAbs: number = Math.abs(dy)
	const right: number = width - dxAbs
	const bottom: number = height - dyAbs

	if (right < dxAbs) {
		dx = right * (dx < 0 ? -1 : 1)
	}
	if (bottom < dyAbs) {
		dy = bottom * (dy < 0 ? -1 : 1)
	}
	const d: number = Math.sqrt(dx * dx + dy * dy)

	return [d, dx, dy]
}
