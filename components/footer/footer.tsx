import InstagramIcon from '@mui/icons-material/Instagram'
import TelegramIcon from '@mui/icons-material/Telegram'
import YouTubeIcon from '@mui/icons-material/YouTube'
import { Box, Typography } from '@mui/material'
import { format } from 'date-fns'

const Footer = () => {
	return (
		<Box
			sx={{
				p: '20px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'space-between',
				backgroundColor: '#141414',
				color: 'white',
			}}
			borderTop={'1px solid rgba(255, 255, 255, .5)'}
		>
			<Typography>
				©{format(new Date(), 'yyyy')} Temmi. All Rights Reserved.
			</Typography>
			<Box sx={{ display: 'flex', gap: '15px' }}>
				<TelegramIcon sx={{ cursor: 'pointer' }} />
				<InstagramIcon sx={{ cursor: 'pointer' }} />
				<YouTubeIcon sx={{ cursor: 'pointer' }} />
			</Box>
		</Box>
	)
}

export default Footer
