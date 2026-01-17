import { Content, Sidebar } from '@/components'
import { BlogTypes } from '@/interfaces/blog.interface'
import { CategoryType } from '@/interfaces/category.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const CategoryDetailedPage = ({
	blogs,
	latestBlogs,
	categories,
}: GetDetailedCategoriesProps) => {
	const router = useRouter()
	const capitalize = (str: string) => {
		return str
			.split('-')
			.map(word => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ')
	}
	return (
		<SEO metaTitle={`${capitalize(router.query.slug as string)} - Category`}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						flexDirection: { xs: 'column', sm: 'row' },
						padding: '20px',
					}}
				>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
					<Content blogs={blogs} />
				</Box>
			</Layout>
		</SEO>
	)
}

export default CategoryDetailedPage

export const getServerSideProps: GetServerSideProps<
	GetDetailedCategoriesProps
> = async ({ query }) => {
	const blogs = await BlogsService.getDetailedCategoriesBlog(
		query.slug as string
	)
	const latestBlogs = await BlogsService.getLatestBlogs()
	const categories = await BlogsService.getCategories()
	return {
		props: {
			blogs,
			latestBlogs,
			categories,
		},
	}
}

interface GetDetailedCategoriesProps {
	blogs: BlogTypes[]
	latestBlogs: BlogTypes[]
	categories: CategoryType[]
}
