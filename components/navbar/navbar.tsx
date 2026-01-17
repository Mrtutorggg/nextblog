'use client'
import { navItems } from '@/config/constants'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import {
	AppBar,
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Toolbar,
} from '@mui/material'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { NavProps } from './navbar.props'

const Navbar = ({ window }: NavProps) => {
	const [mobileOpen, setMobileOpen] = useState(false)
	const router = useRouter()
	const handleDrawerToggle = () => {
		setMobileOpen(prevState => !prevState)
	}

	const container =
		window !== undefined ? () => window().document.body : undefined

	const drawer = (
		<Box sx={{ textAlign: 'center' }}>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					px: 2,
				}}
			>
				<Box sx={{ my: 2, display: 'flex', alignItems: 'center', gap: '5px' }}>
					<Image
						src={'/android-chrome-512x512.png'}
						alt={'Logo'}
						width={30}
						height={30}
					/>
					<Typography variant='h5' fontFamily={'fantasy'} component='div'>
						Temmi
					</Typography>
				</Box>
				<CloseIcon onClick={handleDrawerToggle} sx={{ cursor: 'pointer' }} />
			</Box>
			<Divider />
			<List>
				{navItems.map(item => (
					<ListItem key={item.route} disablePadding>
						<ListItemButton
							onClick={() => router.push(item.route)}
							sx={{ textAlign: 'center' }}
						>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	)

	return (
		<Box sx={{ display: 'flex', height: '9vh' }}>
			<AppBar
				sx={{ backgroundColor: '#141414', height: '9vh' }}
				component='nav'
			>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: 'none' } }}
					>
						<MenuIcon />
					</IconButton>

					<Box
						onClick={() => router.push('/')}
						sx={{
							cursor: 'pointer',
							my: '2',
							flexGrow: 1,
							display: 'flex',
							alignItems: 'center',
							gap: '5px',
							flexDirection: { xs: 'row-reverse', sm: 'row' },
						}}
					>
						<Image
							src={'/android-chrome-512x512.png'}
							alt={'Logo'}
							width={40}
							height={40}
						/>
						<Typography variant='h4' fontFamily={'fantasy'} component='div'>
							Temmi
						</Typography>
					</Box>

					<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
						{navItems.map(item => (
							<Button
								onClick={() => router.push(`${item.route}`)}
								key={item.route}
								sx={{ color: '#fff' }}
							>
								{item.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component='nav'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: 'block', sm: 'none' },
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							width: '100%',
						},
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	)
}

export default Navbar
