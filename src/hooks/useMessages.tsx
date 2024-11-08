import { useAsyncEffect } from 'ahooks'
import { message, Typography } from 'antd'

export function useMessages(): void {
	useAsyncEffect(async () => {
		await message.info('Vào toàn màn hình để xem được đẹp nhất', 7)
		await message.info(
			'Thế giới không phải lúc nào cũng ổn định, vì vậy hãy kiên nhẫn và chờ những điều thú vị xảy ra',
			10
		)
		await message.info(
			<Typography>
				Nếu không có gì thú vị, hãy nhấn <kbd>R</kbd> để xáo trộn lại lực tương tác
			</Typography>,
			7
		)
	}, [])
}
