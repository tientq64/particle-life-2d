import { AppStore, getAppStore, Group, subscribeAppStore } from '../store/useAppStore'
import { height, width } from './init'

let store: AppStore = getAppStore()

subscribeAppStore((state) => {
	store = state
})

export function calc(): void {
	for (const groupA of store.groups) {
		for (const groupB of store.groups) {
			if (store.skipRuleWhenSameGroup) {
				if (groupA === groupB) continue
			}
			rule(groupA, groupB)
		}
	}
}

export function rule(groupA: Group, groupB: Group): void {
	for (const atomA of groupA.atoms) {
		let fx: number = 0
		let fy: number = 0

		if (!store.isPaused) {
			for (const atomB of groupB.atoms) {
				if (atomA === atomB) continue

				let dx: number = atomA.x - atomB.x
				let dy: number = atomA.y - atomB.y
				const dxAbs: number = Math.abs(dx)
				const dyAbs: number = Math.abs(dy)
				const right: number = width - dxAbs
				const bottom: number = height - dyAbs
				if (right < dxAbs) {
					dx = right * (dx > 0 ? -1 : 1)
				}
				if (bottom < dyAbs) {
					dy = bottom * (dy > 0 ? -1 : 1)
				}
				const d: number = Math.sqrt(dx * dx + dy * dy)

				if (d >= 0 && d <= 160) {
					// if (Math.random() < 0.01) continue
					const force: number = groupA.forces[groupB.index]
					const f: number = force / d
					fx += f * dx
					fy += f * dy
				}
			}
			atomA.vx = (atomA.vx + fx) / 2
			atomA.vy = (atomA.vy + fy) / 2

			atomA.x += atomA.vx
			atomA.y += atomA.vy
		}

		if (atomA.x < 0) {
			atomA.x += width
		} else if (atomA.x >= width) {
			atomA.x -= width
		}
		if (atomA.y < 0) {
			atomA.y += height
		} else if (atomA.y >= height) {
			atomA.y -= height
		}
	}
}
