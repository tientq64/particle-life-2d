import { store } from '../store/store'
import { Atom, Group, setAppStore } from '../store/useAppStore'
import { random } from '../utils/random'
import { getDistancesBetweenTwoAtom } from './getDistancesBetweenTwoAtom'
import { getRandomXYInRadius } from './getRandomXYInRadius'
import { loop } from './loop'

export const PI_2: number = Math.PI * 2
export const width: number = 1920
export const height: number = 1080

const colors: string[] = [
	'#f43f5ecc',
	'#f97316cc',
	'#eab308cc',
	'#22c55ecc',
	'#06b6d4cc',
	'#3b82f6cc',
	'#a855f7cc',
	'#ec4899cc',
	'#64748bcc'
]

export function init(): void {
	const canvas: HTMLCanvasElement | null = store.canvas
	if (canvas === null) return

	canvas.width = width
	canvas.height = height

	const groupsNumber: number = 9
	const atomsNumber: number = 160
	const groups: Group[] = []

	for (let i = 0; i < groupsNumber; i++) {
		const group: Group = {
			index: i,
			color: colors[i],
			atoms: [],
			forces: Array(groupsNumber)
		}
		for (let j = 0; j < atomsNumber; j++) {
			addAtom(0, 0, group)
		}
		groups.push(group)
	}
	const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
	setAppStore({ groups, ctx })

	randomForces()
	randomPositionAtoms()
	separatePositionAtoms()

	loop()
}

export function addRandomAtom(orgX: number, orgY: number, maxRadius: number, group: Group): void {
	while (true) {
		const [x, y] = getRandomXYInRadius(orgX, orgY, maxRadius)
		const hasExisted: boolean = group.atoms.some((atom) => {
			return atom.x === x && atom.y === y
		})
		if (hasExisted) continue
		addAtom(x, y, group)
		break
	}
}

export function addAtom(x: number, y: number, group: Group): void {
	const atom: Atom = {
		x,
		y,
		vx: 0,
		vy: 0
	}
	group.atoms.push(atom)
}

export function randomForces(): void {
	const groups: Group[] = structuredClone(store.groups)
	for (const groupA of groups) {
		for (const groupB of store.groups) {
			const force: number = random(-10, 8) / 10
			groupA.forces[groupB.index] = force
		}
	}
	groups.sort((groupA, groupB) => {
		const avgForceA: number = groupA.forces.reduce((sum, force) => sum + force, 0)
		const avgForceB: number = groupB.forces.reduce((sum, force) => sum + force, 0)
		return avgForceB - avgForceA
	})
	setAppStore({ groups })
}

export function randomPositionAtoms(): void {
	const groups: Group[] = structuredClone(store.groups)
	for (const group of groups) {
		const groupX: number = random(0, width - 1)
		const groupY: number = random(0, height - 1)
		for (const atom of group.atoms) {
			const [x, y] = getRandomXYInRadius(groupX, groupY, store.atomRadius * 4)
			atom.x = x
			atom.y = y
		}
	}
	setAppStore({ groups })
}

export function separatePositionAtoms(): void {
	const groups: Group[] = structuredClone(store.groups)
	for (const groupA of groups) {
		for (const groupB of groups) {
			for (const atomA of groupA.atoms) {
				for (const atomB of groupB.atoms) {
					if (atomA === atomB) continue
					const [d] = getDistancesBetweenTwoAtom(atomA, atomB)
					if (d < store.atomRadius * 2) {
						const [x, y] = getRandomXYInRadius(atomB.x, atomB.y, store.atomRadius * 4)
						atomB.x = x
						atomB.y = y
					}
				}
			}
		}
	}
	setAppStore({ groups })
}

/**
 * Di chuyển các hạt.
 *
 * Đột biến state để tránh vấn đề hiệu suất, mặc dù chưa thấy vấn đề gì.
 */
export function moveAtoms(movementX: number, movementY: number): void {
	for (const group of store.groups) {
		for (const atom of group.atoms) {
			atom.x += movementX
			atom.y += movementY
		}
	}
}
