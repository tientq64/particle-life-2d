import { Divider, Tooltip } from 'antd'
import { ReactNode } from 'react'
import pkg from '../../package.json'
import { Link } from './Link'

export function Footer(): ReactNode {
	return (
		<div className="flex justify-between px-4 pb-2">
			<div className="pointer-events-auto">
				<span>Particle Life 2D</span>
				<Divider type="vertical" />

				<span>{pkg.version}</span>
				<Divider type="vertical" />

				<span>
					Made with{' '}
					<Tooltip className="cursor-default" title="Rice">
						🍚
					</Tooltip>{' '}
					by <Link href={pkg.author.url}>{pkg.author.name}</Link>
				</span>
			</div>

			<div className="pointer-events-auto">
				<Link href={pkg.repository.url}>GitHub</Link>
				<Divider type="vertical" />

				<Link href="https://particle-life-3d.vercel.app">3D version</Link>
				<Divider type="vertical" />

				<Link href="https://buymeacoffee.com/tientq64">Buy me a coffee</Link>
			</div>
		</div>
	)
}
