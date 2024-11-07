import { ReactNode } from 'react'
import { KeyboardShortcuts } from './KeyboardShortcuts'

export function RightSideBar(): ReactNode {
	return (
		<div className="w-96 overflow-auto pointer-events-auto">
			<div className="px-4 pt-4 font-bold text-base">Phím tắt</div>

			<KeyboardShortcuts />
		</div>
	)
}
