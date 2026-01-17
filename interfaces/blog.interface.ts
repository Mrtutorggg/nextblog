export interface BlogTypes {
	exerpt: string
	id: string
	slug: string
	createdAt: Date
	description: {
		text: string
		html: string
	}
	title: string
	image: {
		url: string
	}
	author: {
		name: string
		avatar: {
			url: string
		}
	}
	category: {
		label: string
		slug: string
	}
}
