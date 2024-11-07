import { useAsyncEffect } from 'ahooks'
import { message, Typography } from 'antd'
import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { Footer } from './components/Footer'
import { LeftSideBar } from './components/LeftSideBar'
import { RightSideBar } from './components/RightSideBar'
import { init } from './helpers/init'
import { useEvents } from './hooks/useEvents'
import { setAppStore, useAppStore } from './store/useAppStore'

export function App() {
	const isMouseMove = useAppStore((state) => state.isMouseMove)
	const isShowPanel = useAppStore((state) => state.isShowPanel)

	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEvents()

	useEffect(() => {
		const canvas: HTMLCanvasElement | null = canvasRef.current
		if (canvas === null) return
		setAppStore({ canvas })
		init()
	}, [])

	useAsyncEffect(async () => {
		await message.info('Vào toàn màn hình để xem được đẹp nhất', 7)
		await message.info(
			'Thế giới không phải lúc nào cũng ổn định, vì vậy hãy kiên nhẫn và chờ những điều thú vị xảy ra',
			10
		)
		await message.info(
			<Typography>
				Nhấn <kbd>R</kbd> để xáo trộn lại thế giới
			</Typography>,
			5
		)
	}, [])

	return (
		<div className={clsx('h-screen', isMouseMove && 'select-none cursor-grabbing')}>
			<canvas ref={canvasRef}>This browser does not support the canvas element.</canvas>

			{isShowPanel && (
				<div className="flex flex-col absolute inset-0 pointer-events-none">
					<div className="flex-1 flex justify-between items-start">
						<LeftSideBar />
						<RightSideBar />
					</div>

					<Footer />
				</div>
			)}
		</div>
	)
}
