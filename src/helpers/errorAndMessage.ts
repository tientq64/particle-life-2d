import { message } from 'antd'

export function errorAndMessage(content: string, duration?: number): Error {
	message.error(content, duration)
	return Error(content)
}
