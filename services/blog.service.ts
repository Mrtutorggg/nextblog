import { CategoryType } from '@/interfaces/category.interface'
import { gql, request } from 'graphql-request'
import { BlogTypes } from '../interfaces/blog.interface'
const graphAPI = process.env.NEXT_PUBLIC_HYGRAPH_ENDPOINT as string
export const BlogsService = {
	async getAllBlogs() {
		const query = gql`
			query GetBlogs {
				blogs {
					exerpt
					id
					slug
					title
					createdAt
					description {
						text
					}
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
				}
			}
		`
		const result = await request<{ blogs: BlogTypes[] }>(graphAPI, query)
		return result.blogs
	},

	async getLatestBlogs() {
		const query = gql`
			query GetLatestBlogs {
				blogs(last: 2) {
					id
					slug
					title
					createdAt
					description {
						text
					}
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
				}
			}
		`
		const result = await request<{ blogs: BlogTypes[] }>(graphAPI, query)
		return result.blogs
	},

	async getCategories() {
		const query = gql`
			query getCategories {
				categories {
					slug
					label
				}
			}
		`
		const result = await request<{ categories: CategoryType[] }>(
			graphAPI,
			query
		)
		return result.categories
	},

	async getDetailedBlog(slug: string) {
		const query = gql`
			query GetDetailedBlog($slug: String!) {
				blog(where: { slug: $slug }) {
					exerpt
					id
					slug
					title
					createdAt
					description {
						html
						text
					}
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
				}
			}
		`

		const result = await request<{ blog: BlogTypes }>(graphAPI, query, {
			slug,
		})
		return result.blog
	},

	async getDetailedCategoriesBlog(slug: string) {
		const query = gql`
			query getCategoriesBlog($slug: String!) {
				blogs(where: { category: { slug: $slug } }) {
					exerpt
					id
					slug
					title
					createdAt
					image {
						url
					}
					author {
						name
						avatar {
							url
						}
					}
					category {
						label
						slug
					}
					description {
						text
					}
				}
			}
		`

		const result = await request<{ blogs: BlogTypes[] }>(graphAPI, query, {
			slug,
		})
		return result.blogs
	},
}
