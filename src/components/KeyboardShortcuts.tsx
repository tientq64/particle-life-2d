import { Descriptions } from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { ReactNode, useRef } from 'react'
import { Kbd } from './Kbd'

export function KeyboardShortcuts(): ReactNode {
	const keyboardShortcutItems = useRef<DescriptionsItemProps[]>(
		[
			{
				label: 'Ẩn/Hiện giao diện',
				children: <Kbd>E</Kbd>
			},
			{
				label: 'Xáo trộn lại thế giới',
				children: <Kbd>R</Kbd>
			},
			{
				label: 'Xáo trộn lại lực tương tác',
				children: <Kbd>G</Kbd>
			},
			{
				label: 'Xáo trộn lại vị trí các hạt',
				children: <Kbd>T</Kbd>
			},
			{
				label: 'Toàn màn hình',
				children: (
					<>
						<Kbd>F</Kbd>
						<Kbd>F11</Kbd>
					</>
				)
			},
			{
				label: 'Tạm dừng/Tiếp tục',
				children: <Kbd>Space</Kbd>
			},
			{
				label: 'Nhích một khung hình',
				children: <Kbd>X</Kbd>
			},
			{
				label: 'Thay đổi hình dạng hạt',
				children: (
					<>
						<Kbd>1</Kbd>
						<Kbd>2</Kbd>
						<Kbd>3</Kbd>
						<Kbd>4</Kbd>
						<br />
						<Kbd>5</Kbd>
					</>
				)
			},
			{
				label: 'Reset cấu hình về mặc định',
				children: <Kbd>`</Kbd>
			},
			{
				label: 'Di chuyển xung quanh',
				children: (
					<>
						<Kbd>W</Kbd>
						<Kbd>A</Kbd>
						<Kbd>S</Kbd>
						<Kbd>D</Kbd>
						<br />
						<Kbd>Kéo chuột</Kbd>
					</>
				)
			}
		].map((item) => ({
			...item,
			className: '!py-1'
		}))
	)

	return (
		<div className="flex-1 flex flex-col gap-2 min-h-0">
			<div className="font-bold text-base">Phím tắt</div>

			<div className="overflow-x-hidden pointer-events-auto">
				<Descriptions
					column={1}
					colon={false}
					bordered
					size="small"
					items={keyboardShortcutItems.current}
				/>
			</div>
		</div>
	)
}
