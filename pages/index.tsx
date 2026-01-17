import { Content, Hero, Sidebar } from '@/components'
import { BlogTypes } from '@/interfaces/blog.interface'
import { CategoryType } from '@/interfaces/category.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Box } from '@mui/material'
import { GetServerSideProps } from 'next'

const IndexPage = ({ blogs, latestBlogs, categories }: HomePageProps) => {
	return (
		<SEO>
			<Layout>
				<Hero blogs={blogs.slice(0, 3)} />
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

export default IndexPage

export const getServerSideProps: GetServerSideProps<
	HomePageProps
> = async () => {
	const blogs = await BlogsService.getAllBlogs()
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

interface HomePageProps {
	blogs: BlogTypes[]
	latestBlogs: BlogTypes[]
	categories: CategoryType[]
}
