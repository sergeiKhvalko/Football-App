/** @type {import('next').NextConfig} */
const nextConfig = {
	// output: 'export',
	// distDir: 'dist',
	// experimental: { outputStandalone: true },
	reactStrictMode: false,
	//optimizeFonts: false,
	poweredByHeader: false,
	// env: {
	// 	APP_URL: process.env.REACT_APP_URL,
	// 	APP_ENV: process.env.REACT_APP_ENV,
	// 	APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'res.cloudinary.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'www.aptronixindia.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'cdn1.ozone.ru',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'localhost',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'cloudflare-ipfs.com',
				pathname: '**',
			},
			{
				protocol: 'https',
				hostname: 'media.api-sports.io',
				pathname: '**',
			},
		],
		// loader: 'custom',
		// loaderFile: './my-loader.ts',
	},
	// async rewrites() {
	// 	return [
	// 		{
	// 			source: '/api/:path*',
	// 			destination: 'http://localhost:4200/api/:path*',
	// 		},
	// 		{
	// 			source: '/static/uploads/:path*',
	// 			destination: 'http://localhost:4200/static/uploads/:path*',
	// 		},
	// 	]
	// },
	webpack(config, options) {
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},

			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
				use: ['@svgr/webpack'],
			},
		)

		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}

module.exports = nextConfig
