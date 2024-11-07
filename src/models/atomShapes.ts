export type AtomShapeName = 'circle' | 'square' | 'ring'
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
		label: 'Vòng'
	},
	{
		value: 'square',
		label: 'Vuông'
	}
]
