import { ReactNode } from 'react'
import { ControlsSection } from './ControlsSection'

export function LeftSideBar(): ReactNode {
	return (
		<div className="flex flex-col justify-between gap-4 w-96 h-full p-4">
			<ControlsSection />
		</div>
	)
}
