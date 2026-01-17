import { calcEstimatedTimeToRead } from '@/helpers/time.format'
import { Avatar, Box, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { HeroType } from './hero.props'

const Hero = ({ blogs }: HeroType) => {
	const router = useRouter()
	const responsive = {
		mobile: {
			breakpoint: { max: 4000, min: 0 },
			items: 1,
			slidesToSlide: 1,
		},
	}

	return (
		<Box width={'100%'} height={{ xs: '50vh', md: '70vh' }}>
			<Carousel responsive={responsive}>
				{blogs.map(item => (
					<Box
						key={item.id}
						sx={{
							position: 'relative',
							height: { xs: '50vh', md: '70vh' },
							width: '100%',
							cursor: 'pointer',
						}}
						onClick={() => router.push(`/blog/${item.slug}`)}
					>
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								right: 0,
								bottom: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundColor: 'rgba(0,0,0,0.5)',
								zIndex: 1,
							}}
						/>
						<Image
							src={item.image.url}
							alt={item.title}
							fill
							style={{ objectFit: 'cover' }}
							priority
						/>
						<Box
							width={{ xs: '95%', sm: '80%', md: '70%' }}
							position={'absolute'}
							color={'white'}
							sx={{
								top: '50%',
								transform: 'translateY(-50%)',
								paddingLeft: { xs: '15px', sm: '30px', md: '50px' },
							}}
							zIndex={2}
						>
							<Typography
								variant='h3'
								sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}
							>
								{item.title}
							</Typography>
							<Typography
								variant='body1'
								sx={{
									fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
									marginTop: { xs: '8px', md: '12px' },
									color: 'gray',
								}}
							>
								{item.exerpt}
							</Typography>
							<Box
								sx={{
									display: 'flex',
									gap: '10px',
									marginTop: { xs: '15px', md: '20px' },
									alignItems: 'center',
								}}
							>
								<Avatar
									alt={item.author.name}
									src={item.author.avatar.url}
									sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 } }}
								/>
								<Box>
									<Typography sx={{ fontSize: { xs: '0.85rem', md: '1rem' } }}>
										{item.author.name}
									</Typography>
									<Typography
										sx={{
											fontSize: { xs: '0.75rem', md: '0.875rem' },
											opacity: 0.9,
										}}
									>
										{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
										{calcEstimatedTimeToRead(item.description.text)}min read
									</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Carousel>
		</Box>
	)
}

export default Hero
