/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['media.graphassets.com', 'us-west-2.graphassets.com'],
	},
	swcMinify: true,
}

module.exports = nextConfig
