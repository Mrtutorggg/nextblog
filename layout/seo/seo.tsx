import { siteConfig } from '@/config/site.config'
import Head from 'next/head'
import { SeoProps } from './seo.props'

const SEO = ({
	children,
	metaTitle = siteConfig.metaTitle,
	metaDescription = siteConfig.metaDescription,
	metaKeywords = siteConfig.metaKeywords,
	author = siteConfig.author,
}: SeoProps) => {
	return (
		<>
			<Head>
				<meta charSet='utf-8' />
				<meta
					name='viewport'
					content='width=device-width, iniatial-scale=1, maximum-scale=5'
				/>
				<title>{metaTitle}</title>

				<meta http-equiv='X-UA-Compatible' content='ie=edge' />
				<meta name='keywords' content={metaKeywords} />
				<meta name='description' content={metaDescription} />
				<meta name='author' content={author} />
				<link rel='shortcut icon' href={`/favicon.ico`} type='image/x-icon' />
			</Head>
			{children}
		</>
	)
}

export default SEO
