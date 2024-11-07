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
				Nhấn <kbd>R</kbd> để xáo trộn lại thế giới nếu thấy chán
			</Typography>,
			7
		)
	}, [])
}
