import { message, Typography } from 'antd'
import { useEffect } from 'react'
import { Kbd } from '../components/Kbd'

export function useMessages(): void {
	useEffect(() => {
		;(async () => {
			await message.info('Vào toàn màn hình để trải nghiệm được tốt nhất', 7)
			await message.info(
				'Thế giới không phải lúc nào cũng ổn định, vì vậy hãy kiên nhẫn và chờ những điều thú vị xảy ra',
				10
			)
			await message.info(
				<Typography>
					Nếu không có gì thú vị, hãy nhấn <Kbd>R</Kbd> để xáo trộn lại thế giới
				</Typography>,
				7
			)
		})()
		return message.destroy
	}, [])
}
