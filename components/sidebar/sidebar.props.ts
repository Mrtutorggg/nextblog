import { BlogTypes } from '@/interfaces/blog.interface'
import { CategoryType } from '@/interfaces/category.interface'

export interface SideBarProps {
	latestBlogs: BlogTypes[]
	categories: CategoryType[]
}
