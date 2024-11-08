import { store } from '../store/store'
import { Group, setAppStore } from '../store/useAppStore'
import { height, moveAtoms, width } from './init'

export function calc(): void {
	for (const groupA of store.groups) {
		for (const groupB of store.groups) {
			if (store.skipRuleWhenSameGroup) {
				if (groupA === groupB) continue
			}
			rule(groupA, groupB)
		}
	}
	camera()
}

function rule(groupA: Group, groupB: Group): void {
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
				const dx2: number = width - dxAbs
				const dy2: number = height - dyAbs

				if (dx2 < dxAbs) {
					dx = dx2 * (dx > 0 ? -1 : 1)
				}
				if (dy2 < dyAbs) {
					dy = dy2 * (dy > 0 ? -1 : 1)
				}
				const d: number = Math.sqrt(dx * dx + dy * dy)

				if (d >= store.interactiveRange[0] && d <= store.interactiveRange[1]) {
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

function camera(): void {
	let cameraVelocityX: number = store.cameraVelocityX
	let cameraVelocityY: number = store.cameraVelocityY
	if (cameraVelocityX !== 0 || cameraVelocityY !== 0) {
		moveAtoms(cameraVelocityX ** 3 * -16, cameraVelocityY ** 3 * -16)
		let velocityChange: boolean = false
		if (!store.cameraMoveLeft) {
			if (cameraVelocityX < 0) {
				cameraVelocityX += 0.075
				if (cameraVelocityX > 0) {
					cameraVelocityX = 0
				}
				velocityChange = true
			}
		}
		if (!store.cameraMoveRight) {
			if (cameraVelocityX > 0) {
				cameraVelocityX -= 0.075
				if (cameraVelocityX < 0) {
					cameraVelocityX = 0
				}
				velocityChange = true
			}
		}
		if (!store.cameraMoveUp) {
			if (cameraVelocityY < 0) {
				cameraVelocityY += 0.075
				if (cameraVelocityY > 0) {
					cameraVelocityY = 0
				}
				velocityChange = true
			}
		}
		if (!store.cameraMoveDown) {
			if (cameraVelocityY > 0) {
				cameraVelocityY -= 0.075
				if (cameraVelocityY < 0) {
					cameraVelocityY = 0
				}
				velocityChange = true
			}
		}
		if (velocityChange) {
			setAppStore({ cameraVelocityX, cameraVelocityY })
		}
	}
}
