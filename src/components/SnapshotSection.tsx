import { useRequest } from 'ahooks'
import { Button, Space, Table } from 'antd'
import dayjs from 'dayjs'
import { ReactNode, useCallback, useEffect } from 'react'
import {
	copySnapshotToClipboard,
	downloadSnapshot,
	importSnapshotFromClipboard,
	importSnapshotFromFile,
	importSnapshotFromJson,
	SharedSnapshot,
	updateSnapshot
} from '../helpers/snapshot'
import { useAppStore } from '../store/useAppStore'
import { Link } from './Link'

export function SnapshotSection(): ReactNode {
	const skipRuleWhenSameGroup = useAppStore((state) => state.skipRuleWhenSameGroup)
	const gridSnapping = useAppStore((state) => state.gridSnapping)
	const gridSnapSize = useAppStore((state) => state.gridSnapSize)
	const atomShapeName = useAppStore((state) => state.atomShapeName)
	const atomRadius = useAppStore((state) => state.atomRadius)
	const interactiveRange = useAppStore((state) => state.interactiveRange)
	const groups = useAppStore((state) => state.groups)
	const snapshot = useAppStore((state) => state.snapshot)

	const sharedSnapshots = useRequest(async (): Promise<SharedSnapshot[]> => {
		const discussions: any[] = await (
			await fetch('https://api.github.com/repos/tientq64/particle-life-2d/discussions')
		).json()
		const sharedSnapshots: SharedSnapshot[] = []
		for (const discussion of discussions) {
			const sharedSnapshot: SharedSnapshot = {
				title: discussion.title,
				content: discussion.body,
				userName: discussion.user.login,
				updateAt: dayjs(discussion.updated_at),
				discussionUrl: discussion.html_url
			}
			sharedSnapshots.push(sharedSnapshot)
		}
		return sharedSnapshots
	})

	const handleCopySnapshotToClipboard = useCallback(() => {
		copySnapshotToClipboard()
	}, [])

	const handleDownloadSnapshot = useCallback(() => {
		downloadSnapshot()
	}, [])

	const handleShareSnapshotViaGitHub = useCallback(() => {
		window.open(
			'https://github.com/tientq64/particle-life-2d/discussions/new?category=show-and-tell',
			'_blank'
		)
	}, [])

	const handleImportSnapshotFromClipboard = useCallback(() => {
		importSnapshotFromClipboard()
	}, [])

	const handleImportSnapshotFromFile = useCallback(() => {
		importSnapshotFromFile()
	}, [])

	const handleSharedSnapshotClick = useCallback(async (snapshot: SharedSnapshot) => {
		importSnapshotFromJson(snapshot.content)
	}, [])

	useEffect(() => {
		updateSnapshot()
	}, [
		groups,
		skipRuleWhenSameGroup,
		gridSnapping,
		gridSnapSize,
		atomShapeName,
		atomRadius,
		interactiveRange
	])

	return (
		<div className="flex flex-col gap-2 min-h-0">
			<div className="font-bold text-base">Chia sẻ</div>

			<div className="pointer-events-auto">
				{snapshot !== undefined && (
					<div className="flex flex-col gap-2">
						<div>ID bản ghi: {snapshot.id}</div>

						<Space.Compact>
							<Button onClick={handleCopySnapshotToClipboard}>Sao chép</Button>
							<Button onClick={handleDownloadSnapshot}>Tải xuống</Button>
							<Button onClick={handleShareSnapshotViaGitHub}>
								Chia sẻ lên GitHub...
							</Button>
						</Space.Compact>

						<Space.Compact>
							<Button onClick={handleImportSnapshotFromClipboard}>
								Nhập từ khay nhớ tạm
							</Button>
							<Button onClick={handleImportSnapshotFromFile}>
								Nhập từ tập tin...
							</Button>
						</Space.Compact>

						{snapshot !== undefined && sharedSnapshots.data !== undefined && (
							<Table
								rowClassName="cursor-pointer"
								size="small"
								showHeader={false}
								onRow={(snapshot) => ({
									onClick: () => handleSharedSnapshotClick(snapshot)
								})}
								pagination={{
									className: '!mt-2 !mb-0',
									defaultPageSize: 4
								}}
								columns={[
									{
										dataIndex: 'title',
										className: '!py-1'
									},
									{
										className: '!py-1 text-right',
										render: (_, snapshot) => (
											<Link href={snapshot.discussionUrl} stopPropagation>
												Phản hồi
											</Link>
										)
									}
								]}
								dataSource={sharedSnapshots.data.toReversed()}
							/>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
