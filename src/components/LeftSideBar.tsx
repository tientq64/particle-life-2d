import { Form, Select, Slider, Switch } from 'antd'
import { useForm } from 'antd/es/form/Form'
import FormItem from 'antd/es/form/FormItem'
import { FieldData, InternalNamePath } from 'rc-field-form/es/interface'
import { ReactNode, useCallback, useEffect } from 'react'
import { atomShapes } from '../models/atomShapes'
import { Configs, setAppStore, useAppStore } from '../store/useAppStore'

export function LeftSideBar(): ReactNode {
	const skipRuleWhenSameGroup = useAppStore((state) => state.skipRuleWhenSameGroup)
	const gridSnapping = useAppStore((state) => state.gridSnapping)
	const gridSnapSize = useAppStore((state) => state.gridSnapSize)
	const atomShapeName = useAppStore((state) => state.atomShapeName)
	const atomRadius = useAppStore((state) => state.atomRadius)
	const canvasFillMode = useAppStore((state) => state.canvasFillMode)
	const interactiveRange = useAppStore((state) => state.interactiveRange)
	const groups = useAppStore((state) => state.groups)

	const [configsForm] = useForm<Configs>()

	const handleConfigsChange = useCallback((changedFields: FieldData[]) => {
		for (const changedField of changedFields) {
			const names = changedField.name as InternalNamePath
			for (const name of names) {
				setAppStore({ [name]: changedField.value })
			}
		}
	}, [])

	useEffect(() => {
		configsForm.setFieldsValue({
			skipRuleWhenSameGroup,
			gridSnapping,
			gridSnapSize,
			atomShapeName,
			atomRadius,
			canvasFillMode,
			interactiveRange
		})
	}, [
		skipRuleWhenSameGroup,
		gridSnapping,
		gridSnapSize,
		atomShapeName,
		atomRadius,
		configsForm,
		canvasFillMode,
		interactiveRange
	])

	return (
		<div className="w-96 overflow-auto pointer-events-auto">
			<div className="px-4 pt-4 font-bold text-base">Bảng điều khiển</div>

			<Form
				form={configsForm}
				className="p-4"
				labelCol={{ span: 14 }}
				labelWrap
				colon={false}
				requiredMark={false}
				onFieldsChange={handleConfigsChange}
			>
				<FormItem className="mb-4">
					<table className="w-full table-fixed text-right select-none">
						<thead>
							<tr>
								<td></td>
								{groups.map((group) => (
									<td key={group.index}>
										<div
											className="rounded"
											style={{ backgroundColor: group.color }}
										>
											{'\xa0'}
										</div>
									</td>
								))}
							</tr>
						</thead>
						<tbody>
							{groups.map((group) => (
								<tr key={group.index}>
									<td>
										<div
											className="rounded text-center"
											style={{ backgroundColor: group.color }}
										>
											{group.atoms.length}
										</div>
									</td>
									{group.forces.map((force, index) => (
										<td key={index} className="pr-2">
											{force * 10}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</FormItem>

				<FormItem name="interactiveRange" label="Phạm vi tương tác giữa 2 hạt">
					<Slider
						range
						min={0}
						max={480}
						step={10}
						marks={{ 0: 0, 160: 160, 480: 480 }}
					/>
				</FormItem>

				<FormItem
					name="skipRuleWhenSameGroup"
					label="Các hạt cùng nhóm không tương tác với nhau"
				>
					<Switch />
				</FormItem>

				<FormItem name="gridSnapping" label="Đồ họa dạng lưới">
					<Switch />
				</FormItem>

				<FormItem name="gridSnapSize" label="Khoảng cách ô lưới">
					<Slider min={1} max={10} marks={{ 1: 1, 5: 5, 6: 6, 10: 10 }} />
				</FormItem>

				<FormItem name="atomShapeName" label="Hình dạng hạt">
					<Select options={atomShapes}></Select>
				</FormItem>

				<FormItem name="atomRadius" label="Bán kính hạt">
					<Slider min={1} max={10} marks={{ 1: 1, 4: 4, 10: 10 }} />
				</FormItem>

				<FormItem name="canvasFillMode" label="Kiểu khung hình hiển thị">
					<Select
						options={[
							{
								label: 'Vừa màn hình',
								value: 'contain'
							},
							{
								label: 'Đầy màn hình',
								value: 'fill'
							}
						]}
					/>
				</FormItem>
			</Form>
		</div>
	)
}
