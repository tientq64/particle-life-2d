export type AtomShapeName = 'circle' | 'ring' | 'hexagon' | 'square' | 'diamond'
export type AtomShape = {
	value: AtomShapeName
	label: string
}

export const atomShapes: AtomShape[] = [
	{
		value: 'circle',
		label: 'Tròn'
	},
	{
		value: 'ring',
		label: 'Nhẫn'
	},
	{
		value: 'hexagon',
		label: 'Lục giác'
	},
	{
		value: 'square',
		label: 'Vuông'
	},
	{
		value: 'diamond',
		label: 'Thoi'
	}
]
