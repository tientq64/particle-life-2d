import { useEventListener, useFullscreen } from 'ahooks'
import { useHotkeys } from 'react-hotkeys-hook'
import { HotkeysEvent } from 'react-hotkeys-hook/dist/types'
import { randomForces, separateXYAtoms } from '../helpers/init'
import { defaultConfigs, setAppStore, useAppStore } from '../store/useAppStore'

export function useEvents(): void {
	const groups = useAppStore((state) => state.groups)
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
			for (const group of groups) {
				for (const atom of group.atoms) {
					atom.x += event.movementX
					atom.y += event.movementY
				}
			}
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
		'e,r,f,space,`',
		(event: KeyboardEvent, hotkeyEvent: HotkeysEvent) => {
			if (event.repeat) return

			switch (hotkeyEvent.hotkey) {
				case 'e':
					setAppStore((prev) => ({ isShowPanel: !prev.isShowPanel }))
					break

				case 'r':
					randomForces()
					separateXYAtoms()
					break

				case 'f':
					toggleFullscreen()
					break

				case 'space':
					setAppStore((prev) => ({ isPaused: !prev.isPaused }))
					break

				case '`':
					setAppStore((prev) => ({ ...prev, ...defaultConfigs }), true)
					break
			}
		},
		[]
	)
}
