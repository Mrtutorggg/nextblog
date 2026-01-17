import { Sidebar } from '@/components'
import { calcEstimatedTimeToRead } from '@/helpers/time.format'
import { BlogTypes } from '@/interfaces/blog.interface'
import { CategoryType } from '@/interfaces/category.interface'
import Layout from '@/layout/layout'
import SEO from '@/layout/seo/seo'
import { BlogsService } from '@/services/blog.service'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import { GetServerSideProps } from 'next'
import Image from 'next/image'

const DetailedBlogPage = ({
	blog,
	latestBlogs,
	categories,
}: GetDetailedBlogProps) => {
	return (
		<SEO metaTitle={`${blog.title} - Blog`}>
			<Layout>
				<Box
					sx={{
						display: 'flex',
						gap: '20px',
						flexDirection: { xs: 'column', sm: 'row' },
						padding: '20px',
					}}
				>
					<Box sx={{ width: { xs: '100%', md: '70%' } }}>
						<Box
							sx={{
								backgroundColor: 'black',
								padding: '20px',
								boxShadow: '0px 8px 16px rgba(255,255,255,.1)',
								position: 'relative',
								height: { xs: '30vh', md: '50vh' },
								width: '100%',
								marginBottom: '20px',
								borderRadius: '10px',
							}}
						>
							<Image
								src={blog.image.url}
								alt={blog.title}
								priority
								fill
								style={{ objectFit: 'cover', borderRadius: '10px' }}
							/>
						</Box>
						<Box
							sx={{ display: 'flex', rowGap: '10px', flexDirection: 'column' }}
						>
							<Box
								sx={{
									display: 'flex',
									gap: '10px',
									marginTop: { xs: '15px', md: '20px' },
									alignItems: 'center',
								}}
							>
								<Avatar
									alt={blog.author.name}
									src={blog.author.avatar.url}
									sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
								/>
								<Box>
									<Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>
										{blog.author.name}
									</Typography>
									<Typography
										sx={{
											fontSize: { xs: '0.75rem', md: '0.875rem' },
											opacity: 0.9,
											color: 'gray',
										}}
									>
										{format(new Date(blog.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
										{calcEstimatedTimeToRead(blog.description.text)}min read
									</Typography>
								</Box>
							</Box>
							<Typography variant='h3'>{blog.title}</Typography>
							<Typography color='gray'>{blog.exerpt}</Typography>
							<Divider />
							<div
								style={{ opacity: '.8' }}
								dangerouslySetInnerHTML={{ __html: blog.description.html }}
							></div>
						</Box>
					</Box>
					<Sidebar latestBlogs={latestBlogs} categories={categories} />
				</Box>
			</Layout>
		</SEO>
	)
}

export default DetailedBlogPage

export const getServerSideProps: GetServerSideProps<
	GetDetailedBlogProps
> = async ({ query }) => {
	const blog = await BlogsService.getDetailedBlog(query.slug as string)
	const latestBlogs = await BlogsService.getLatestBlogs()
	const categories = await BlogsService.getCategories()
	return {
		props: {
			blog,
			latestBlogs,
			categories,
		},
	}
}

interface GetDetailedBlogProps {
	blog: BlogTypes
	latestBlogs: BlogTypes[]
	categories: CategoryType[]
}
