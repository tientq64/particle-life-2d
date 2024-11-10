import { ReactNode } from 'react'
import { KeyboardShortcuts } from './KeyboardShortcuts'
import { SnapshotSection } from './SnapshotSection'

export function RightSideBar(): ReactNode {
	return (
		<div className="flex flex-col justify-between gap-4 w-96 h-full p-4">
			<KeyboardShortcuts />
			<SnapshotSection />
		</div>
	)
}
