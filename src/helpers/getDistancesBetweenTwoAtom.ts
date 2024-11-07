import { Atom } from '../store/useAppStore'
import { height, width } from './init'

/**
 * Trả về các khoảng cách giữa hai hạt. Chỉ dùng hàm này trong hàm khởi tạo, không dùng trong vòng lặp tính toán, vì vấn đề hiệu suất.
 * @param atomA Hạt thứ nhất.
 * @param atomB Hạt thứ hai.
 * @returns Mảng các khoảng cách. Đầu tiên là khoảng cách giữa 2 hạt. Thứ hai và ba là khoảng cách theo chiều x và y, lấy `atomA` làm mốc, các giá trị có thể âm.
 */
export function getDistancesBetweenTwoAtom(atomA: Atom, atomB: Atom): [number, number, number] {
	let dx: number = atomB.x - atomA.x
	let dy: number = atomB.y - atomA.y

	const dxAbs: number = Math.abs(dx)
	const dyAbs: number = Math.abs(dy)
	const dx2: number = width - dxAbs
	const dy2: number = height - dyAbs

	if (dx2 < dxAbs) {
		dx = dx2 * (dx < 0 ? -1 : 1)
	}
	if (dy2 < dyAbs) {
		dy = dy2 * (dy < 0 ? -1 : 1)
	}
	const d: number = Math.sqrt(dx * dx + dy * dy)

	return [d, dx, dy]
}
