import { useEventListener, useFullscreen } from 'ahooks'
import { useHotkeys } from 'react-hotkeys-hook'
import { HotkeysEvent } from 'react-hotkeys-hook/dist/types'
import { calc } from '../helpers/calc'
import {
	height,
	moveAtoms,
	randomForces,
	randomPositionAtoms,
	resetVelocityAtoms,
	separatePositionAtoms,
	width
} from '../helpers/init'
import { AtomShape, atomShapes } from '../models/atomShapes'
import { getDefaultConfigs, setAppStore, useAppStore } from '../store/useAppStore'
import { draw } from '../helpers/draw'

export function useEvents(): void {
	const canvas = useAppStore((state) => state.canvas)
	const isMouseDown = useAppStore((state) => state.isMouseDown)

	const [, { toggleFullscreen }] = useFullscreen(document.documentElement)

	useEventListener(
		'pointerdown',
		(event: PointerEvent) => {
			if (canvas === null) return
			canvas.setPointerCapture(event.pointerId)
			setAppStore({ isMouseDown: true })
		},
		{ target: canvas }
	)

	useEventListener(
		'pointermove',
		(event: PointerEvent) => {
			if (!isMouseDown) return
			setAppStore({ isMouseMove: true })
			const ratioX: number = width / canvas!.clientWidth
			const ratioY: number = height / canvas!.clientHeight
			moveAtoms(event.movementX * ratioX, event.movementY * ratioY)
		},
		{ target: canvas }
	)

	useEventListener(
		'lostpointercapture',
		() => {
			setAppStore({ isMouseDown: false })
			setAppStore({ isMouseMove: false })
		},
		{ target: canvas }
	)

	useHotkeys(
		'e,r,g,t,f,x,space,1,2,3,4,5,`,w,a,s,d',
		(event: KeyboardEvent, hotkeyEvent: HotkeysEvent) => {
			if (event.repeat) return

			switch (hotkeyEvent.hotkey) {
				case 'e':
					setAppStore((prev) => ({ isShowPanel: !prev.isShowPanel }))
					break

				case 'r':
					randomForces()
					randomPositionAtoms()
					separatePositionAtoms()
					resetVelocityAtoms()
					break

				case 'g':
					randomForces()
					separatePositionAtoms()
					resetVelocityAtoms()
					break

				case 't':
					randomPositionAtoms()
					separatePositionAtoms()
					resetVelocityAtoms()
					break

				case 'f':
					toggleFullscreen()
					break

				case 'space':
					setAppStore((prev) => ({ isPaused: !prev.isPaused }))
					break

				case 'x':
					setAppStore({ isPaused: true })
					calc(true)
					draw(true)
					break

				case '1':
				case '2':
				case '3':
				case '4':
				case '5':
					{
						const index: number = Number(hotkeyEvent.hotkey) - 1
						const atomShape: AtomShape = atomShapes[index]
						setAppStore({ atomShapeName: atomShape.value })
					}
					break

				case '`':
					setAppStore(getDefaultConfigs())
					break

				case 'w':
					setAppStore({ cameraMoveUp: true, cameraVelocityY: -1 })
					break

				case 'a':
					setAppStore({ cameraMoveLeft: true, cameraVelocityX: -1 })
					break

				case 's':
					setAppStore({ cameraMoveDown: true, cameraVelocityY: 1 })
					break

				case 'd':
					setAppStore({ cameraMoveRight: true, cameraVelocityX: 1 })
					break
			}
		},
		[]
	)

	useHotkeys(
		'w,a,s,d',
		(_, hotkeyEvent: HotkeysEvent) => {
			switch (hotkeyEvent.hotkey) {
				case 'w':
					setAppStore({ cameraMoveUp: false })
					break

				case 'a':
					setAppStore({ cameraMoveLeft: false })
					break

				case 's':
					setAppStore({ cameraMoveDown: false })
					break

				case 'd':
					setAppStore({ cameraMoveRight: false })
					break
			}
		},
		{ keyup: true }
	)
}
