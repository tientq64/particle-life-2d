import { ReactNode } from 'react'
import { KeyboardShortcuts } from './KeyboardShortcuts'

export function RightSideBar(): ReactNode {
	return (
		<div className="w-96 p-4 overflow-auto pointer-events-auto">
			<KeyboardShortcuts />
		</div>
	)
}
