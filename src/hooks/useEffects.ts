import { useEffect } from 'react'
import { updateSnapshot } from '../helpers/snapshot'
import { useAppStore } from '../store/useAppStore'

export function useEffects(): void {
	const skipRuleWhenSameGroup = useAppStore((state) => state.skipRuleWhenSameGroup)
	const gridSnapping = useAppStore((state) => state.gridSnapping)
	const gridSnapSize = useAppStore((state) => state.gridSnapSize)
	const atomShapeName = useAppStore((state) => state.atomShapeName)
	const atomRadius = useAppStore((state) => state.atomRadius)
	const interactiveRange = useAppStore((state) => state.interactiveRange)
	const groups = useAppStore((state) => state.groups)

	useEffect(() => {
		updateSnapshot()
	}, [
		groups,
		skipRuleWhenSameGroup,
		gridSnapping,
		gridSnapSize,
		atomShapeName,
		atomRadius,
		interactiveRange
	])
}
