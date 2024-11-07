import { useCreation } from 'ahooks'
import { Descriptions, Typography } from 'antd'
import { DescriptionsItemProps } from 'antd/es/descriptions/Item'
import { ReactNode } from 'react'

export function KeyboardShortcuts(): ReactNode {
	const keyboardShortcutItems = useCreation<DescriptionsItemProps[]>(
		() => [
			{
				label: 'Bật/tắt giao diện tùy chọn',
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
				label: 'Reset cấu hình về mặc định',
				children: <kbd>`</kbd>
			},
			{
				label: 'Di chuyển xung quanh',
				children: <kbd>Kéo chuột</kbd>
			}
		],
		[]
	)

	return (
		<Typography>
			<Descriptions
				title="Phím tắt"
				column={1}
				colon={false}
				bordered
				size="small"
				items={keyboardShortcutItems}
			/>
		</Typography>
	)
}
