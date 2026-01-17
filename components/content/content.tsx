import { calcEstimatedTimeToRead } from '@/helpers/time.format'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import { format } from 'date-fns'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ContenProps } from './content.props'

const Contents = ({ blogs }: ContenProps) => {
	const router = useRouter()

	return (
		<Box width={{ xs: '100%', md: '70%' }}>
			{blogs.map(item => (
				<Box
					key={item.id}
					sx={{
						backgroundColor: 'rgba(0,0,0,0.5)',
						padding: '20px',
						marginTop: '20px',
						borderRadius: '8px',
						boxShadow: '0px 8px 16px rgba(255,255,255,.1)',
						cursor: 'pointer',
					}}
					onClick={() => router.push(`/blog/${item.slug}`)}
				>
					<Box
						position={'relative'}
						width={'100%'}
						height={{ xs: '30vh', md: '50vh' }}
					>
						<Image
							src={item.image.url}
							alt={item.title}
							priority
							fill
							style={{ objectFit: 'cover', borderRadius: '10px' }}
						/>
					</Box>
					<Typography
						variant='h4'
						sx={{ fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' } }}
						marginTop={'30px'}
					>
						{item.title}
					</Typography>
					<Typography
						variant='body1'
						color={'gray'}
						sx={{ fontSize: { xs: '1rem', sm: '1.3rem', md: '1.6rem' } }}
					>
						{item.exerpt}
					</Typography>
					<Divider sx={{ marginTop: '20px' }} />
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
									color: 'gray',
								}}
							>
								{format(new Date(item.createdAt), 'dd MMM, yyyy')} &#x2022;{' '}
								{calcEstimatedTimeToRead(item.description.text)}min read
							</Typography>
						</Box>
					</Box>
				</Box>
			))}
		</Box>
	)
}

export default Contents
