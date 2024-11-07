import { useCreation } from 'ahooks'
import { Descriptions, Typography } from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { ReactNode } from 'react'

export function KeyboardShortcuts(): ReactNode {
	const keyboardShortcutItems = useCreation<DescriptionsItemProps[]>(
		() => [
			{
				label: 'Bật/tắt giao diện',
				children: <kbd>E</kbd>
			},
			{
				label: 'Xáo trộn lại thế giới',
				children: <kbd>R</kbd>
			},
			{
				label: 'Toàn màn hình',
				children: (
					<>
						<kbd>F</kbd>
						<kbd>F11</kbd>
					</>
				)
			},
			{
				label: 'Tạm dừng/Tiếp tục',
				children: <kbd>Space</kbd>
			},
			{
				label: 'Thay đổi hình dạng hạt',
				children: (
					<>
						<kbd>1</kbd>
						<kbd>2</kbd>
						<kbd>3</kbd>
						<kbd>4</kbd>
					</>
				)
			},
			{
				label: 'Reset cấu hình về mặc định',
				children: <kbd>`</kbd>
			},
			{
				label: 'Di chuyển xung quanh',
				children: (
					<>
						<kbd>W</kbd>
						<kbd>A</kbd>
						<kbd>S</kbd>
						<kbd>D</kbd>
					</>
				)
			},
			{
				label: 'Di chuyển xung quanh',
				children: <kbd>Kéo chuột</kbd>
			}
		],
		[]
	)

	return (
		<Typography className="p-4">
			<Descriptions
				column={1}
				colon={false}
				bordered
				size="small"
				items={keyboardShortcutItems}
			/>
		</Typography>
	)
}
