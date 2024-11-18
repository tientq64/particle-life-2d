import { Typography } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { init } from '../helpers/init'
import { useEffects } from '../hooks/useEffects'
import { useEvents } from '../hooks/useEvents'
import { useMessages } from '../hooks/useMessages'
import { setAppStore, useAppStore } from '../store/useAppStore'
import { Footer } from './Footer'
import { LeftSideBar } from './LeftSideBar'
import { RightSideBar } from './RightSideBar'

export function App() {
	const canvasFillMode = useAppStore((state) => state.canvasFillMode)
	const isMouseMove = useAppStore((state) => state.isMouseMove)
	const isShowPanel = useAppStore((state) => state.isShowPanel)

	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEvents()
	useMessages()
	useEffects()

	useEffect(() => {
		const canvas: HTMLCanvasElement | null = canvasRef.current
		if (canvas === null) return
		setAppStore({ canvas })
		init()
	}, [])

	return (
		<Typography
			className={clsx(
				'flex justify-center items-center h-screen overflow-hidden bg-slate-800',
				isMouseMove && 'select-none cursor-grabbing'
			)}
		>
			<canvas
				ref={canvasRef}
				className={canvasFillMode === 'contain' ? 'max-w-full max-h-full' : 'size-full'}
				style={{
					imageRendering: 'pixelated'
				}}
			>
				This browser does not support the canvas element.
			</canvas>

			{isShowPanel && (
				<div className="flex flex-col absolute inset-0 overflow-hidden pointer-events-none">
					<div className="flex-1 flex justify-between items-start overflow-hidden">
						<LeftSideBar />
						<RightSideBar />
					</div>

					<Footer />
				</div>
			)}
		</Typography>
	)
}
