interface currentCategoryId {
	type: string,
	id: string
}

interface IBCPath {
	title: string,
	path: string
}


export interface ICategoryState {
	currentCategoryId: string,
	currentSubcategoryId: currentCategoryId,
	currentLanguage: number,
	breadCrumb: IBCPath[],
	currentTitle: string,
	role: string,
	userId: string,
	token: string,
	// cart: []
}