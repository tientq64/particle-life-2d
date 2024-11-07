import { Divider } from 'antd'
import { ReactNode } from 'react'
import pkg from '../../package.json'

export function Footer(): ReactNode {
	return (
		<div className="px-4 py-2 pointer-events-auto">
			<a href={pkg.repository.url} target="_blank">
				GitHub
			</a>
			<Divider type="vertical" />
			<a href="https://particle-life-3d.vercel.app" target="_blank">
				3D version
			</a>
			<Divider type="vertical" />
			<a href="https://buymeacoffee.com/tientq64" target="_blank">
				Buy me a coffee
			</a>
		</div>
	)
}
