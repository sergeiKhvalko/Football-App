/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	experimental: { serverActions: true, outputStandalone: true },
	reactStrictMode: false,
	//optimizeFonts: false,
	poweredByHeader: false,
	// env: {
	// 	APP_URL: process.env.REACT_APP_URL,
	// 	APP_ENV: process.env.REACT_APP_ENV,
	// 	APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
	// },
	images: {
		domains: [
			'loremflickr.com',
			'www.aptronixindia.com',
			'cdn1.ozone.ru',
			'localhost',
			'avatars.githubusercontent.com',
			'cloudflare-ipfs.com',
			'media.api-sports.io',
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
