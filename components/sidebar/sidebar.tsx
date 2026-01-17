import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment } from 'react'
import { SideBarProps } from './sidebar.props'

const Sidebar = ({ latestBlogs, categories }: SideBarProps) => {
	const router = useRouter()
	return (
		<Box width={{ xs: '100%', md: '30%' }}>
			<Box
				position={'sticky'}
				top={'100px'}
				sx={{ transition: 'all .3s ease' }}
			>
				<Box padding={'20px'} border={'1px solid gray'} borderRadius={'8px'}>
					<Typography variant='h5'>Latest blog</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						{latestBlogs.map(item => (
							<Box
								sx={{ cursor: 'pointer' }}
								onClick={() => router.push(`/blog/${item.slug}`)}
								marginTop={'20px'}
								key={item.id}
							>
								<Box
									display={'flex'}
									sx={{ gap: '20px', alignItems: 'center' }}
								>
									<Image
										src={item.image.url}
										alt={item.title}
										width={100}
										height={100}
										priority
										style={{ objectFit: 'cover', borderRadius: '8px' }}
									/>
									<Box display={'flex'} flexDirection={'column'} gap={'10px'}>
										<Typography variant='body1'>{item.title}</Typography>
										<Box
											sx={{
												display: 'flex',
												gap: '10px',
												alignItems: 'center',
											}}
										>
											<Avatar
												alt={item.author.name}
												src={item.author.avatar.url}
												sx={{
													width: { xs: 32, md: 40 },
													height: { xs: 32, md: 40 },
												}}
											/>
											<Box>
												<Typography
													sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}
												>
													{item.author.name}
												</Typography>
												<Typography
													sx={{
														fontSize: { xs: '0.75rem', md: '0.875rem' },
														opacity: 0.6,
													}}
													variant='body2'
												>
													{format(new Date(item.createdAt), 'dd MMM, yyyy')}
												</Typography>
											</Box>
										</Box>
									</Box>
								</Box>
								<Divider sx={{ marginTop: '20px' }} />
							</Box>
						))}
					</Box>
				</Box>
				<Box
					padding={'20px'}
					marginTop={'20px'}
					border={'1px solid gray'}
					borderRadius={'8px'}
				>
					<Typography variant='h5'>Category</Typography>
					<Box
						sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}
					>
						{categories.map(nav => (
							<Fragment key={nav.slug}>
								<Button
									onClick={() => router.push(`/category/${nav.slug}`)}
									fullWidth
									sx={{ justifyContent: 'flex-start', height: '50px' }}
								>
									{nav.label}
								</Button>
								<Divider />
							</Fragment>
						))}
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default Sidebar
