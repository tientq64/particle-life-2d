import { ReactNode } from 'react'

interface Props {
	children?: ReactNode
}

export function Kbd({ children }: Props): ReactNode {
	return (
		<kbd className="!py-0 !border-slate-600/50 text-nowrap !bg-slate-900/50 text-slate-100">
			{children}
		</kbd>
	)
}
