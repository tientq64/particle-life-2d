import { message } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { nanoid } from 'nanoid'
import pkg from '../../package.json'
import { AtomShapeName } from '../models/atomShapes'
import { store } from '../store/store'
import { Atom, Group, setAppStore } from '../store/useAppStore'
import { errorAndMessage } from './errorAndMessage'

export interface Snapshot {
	id: string
	appVersion: string
	createAt: string
	groups: SnapshotGroup[]
	skipRuleWhenSameGroup: boolean
	gridSnapping: boolean
	gridSnapSize: number
	atomShapeName: AtomShapeName
	atomRadius: number
	interactiveRange: [number, number]
}

export interface SnapshotGroup {
	color: string
	forces: number[]
	atoms: SnapshotAtom[]
}

export interface SnapshotAtom {
	x: number
	y: number
	vx?: number
	vy?: number
}

export interface SharedSnapshot {
	title: string
	content: string
	userName: string
	updateAt: Dayjs
	discussionUrl: string
}

export function makeSnapshot(): Snapshot {
	const time: Dayjs = dayjs()
	const id: string = [time.format('YYYYMMDD-HHmmss-SSS'), nanoid(7)].join('-')
	const snapshot: Snapshot = {
		id,
		appVersion: pkg.version,
		createAt: time.format('YYYY-MM-DDTHH:mm:ss.SSS'),
		groups: store.groups.map((group) => ({
			color: group.color,
			forces: group.forces.map((force) => force * 10),
			atoms: group.atoms.map((atom) => ({
				x: atom.x,
				y: atom.y,
				vx: atom.vx || undefined,
				vy: atom.vy || undefined
			}))
		})),
		skipRuleWhenSameGroup: store.skipRuleWhenSameGroup,
		gridSnapping: store.gridSnapping,
		gridSnapSize: store.gridSnapSize,
		atomShapeName: store.atomShapeName,
		atomRadius: store.atomRadius,
		interactiveRange: store.interactiveRange
	}
	return snapshot
}

export function applySnapshot(snapshot: Snapshot): void {
	setAppStore({
		groups: snapshot.groups.map<Group>((group, index) => ({
			index,
			color: group.color,
			forces: group.forces.map((force) => force / 10),
			atoms: group.atoms.map<Atom>((atom) => ({
				x: atom.x,
				y: atom.y,
				vx: atom.vx ?? 0,
				vy: atom.vy ?? 0
			}))
		})),
		skipRuleWhenSameGroup: snapshot.skipRuleWhenSameGroup,
		gridSnapping: snapshot.gridSnapping,
		gridSnapSize: snapshot.gridSnapSize,
		atomShapeName: snapshot.atomShapeName,
		atomRadius: snapshot.atomRadius,
		interactiveRange: snapshot.interactiveRange,
		snapshot
	})
}

export function updateSnapshot(): Snapshot {
	const snapshot: Snapshot = makeSnapshot()
	setAppStore({ snapshot })
	return snapshot
}

export function stringifySnapshot(snapshot: Snapshot): string {
	const json: string = JSON.stringify(snapshot)
	return json
}

export function parseSnapshot(json: string): Snapshot {
	const snapshot: Snapshot = JSON.parse(json)
	return snapshot
}

export async function copySnapshotToClipboard(): Promise<void> {
	const snapshot: Snapshot | undefined = store.snapshot
	if (snapshot === undefined) {
		throw errorAndMessage('Không có bản ghi nào hiện tại')
	}
	const json: string | undefined = stringifySnapshot(snapshot)
	await navigator.clipboard.writeText(json)
	message.success('Đã sao chép bản ghi vào khay nhớ tạm')
}

export function downloadSnapshot(): void {
	const snapshot: Snapshot | undefined = store.snapshot
	if (snapshot === undefined) {
		throw errorAndMessage('Không có bản ghi nào hiện tại')
	}
	const json: string | undefined = stringifySnapshot(snapshot)
	const blob: Blob = new Blob([json], { type: 'application/json' })
	const url: string = URL.createObjectURL(blob)
	const link: HTMLAnchorElement = document.createElement('a')
	link.href = url
	link.download = `${snapshot.id}.json`
	link.click()
	URL.revokeObjectURL(url)
}

export async function importSnapshotFromClipboard(): Promise<void> {
	let json: string
	try {
		json = await navigator.clipboard.readText()
	} catch {
		throw errorAndMessage('Quyền truy cập khay nhớ tạm đã bị chặn')
	}
	importSnapshotFromJson(json)
	message.success('Đã nhập bản ghi từ khay nhớ tạm')
}

export function importSnapshotFromFile(): void {
	const input: HTMLInputElement = document.createElement('input')
	input.type = 'file'
	input.accept = '.json'
	input.addEventListener('change', async () => {
		if (input.files === null) return
		const file: File = input.files[0]
		if (file.type !== 'application/json') {
			throw errorAndMessage('Tập tin không hợp lệ')
		}
		if (file.size > 1024 * 1024 * 10) {
			throw errorAndMessage('Kích thước tập tin phải nhỏ hơn 10 MB')
		}
		const json: string = await file.text()
		importSnapshotFromJson(json)
		message.success('Đã nhập bản ghi từ tập tin')
	})
	input.click()
}

export function importSnapshotFromJson(json: string): Snapshot {
	try {
		const snapshot: Snapshot = parseSnapshot(json)
		applySnapshot(snapshot)
		return snapshot
	} catch {
		throw errorAndMessage('Dữ liệu bản ghi không hợp lệ')
	}
}
