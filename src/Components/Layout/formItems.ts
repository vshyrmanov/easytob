export const Items = {
	categories: {
		inputs: [
			{ label: "Category name", name: "name" }
		],
		buttons: [
			{ text: "Add new category" }
		]
	},
	positions: {
		inputs: [
			{ label: "Position name", name: "name" },
			{ label: "Position description", name: "desc" },
			{ label: "Price", name: "price" }
		],
		buttons: [
			{text: "Add new position"}
		]
	},
	select: {label: "Choose category", name: "owner", items: []}
};