import { ReactNode } from 'react'

interface Props {
	href?: string
	openInCurrentTab?: boolean
	stopPropagation?: boolean
	children?: ReactNode
}

export function Link({ href, openInCurrentTab, stopPropagation, children }: Props): ReactNode {
	return (
		<a
			className="!text-sky-300 !decoration-dotted !decoration-2 !underline-offset-2 hover:underline"
			href={href}
			target={openInCurrentTab ? undefined : '_blank'}
			onClick={stopPropagation ? (event) => event.stopPropagation() : undefined}
		>
			{children}
		</a>
	)
}
