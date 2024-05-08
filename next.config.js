/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { serverActions: true },
	reactStrictMode: true,
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
		// config.module.rules.push({
		// 	loader: '@svgr/webpack',
		// 	issuer: /\.[jt]sx?$/,
		// 	options: {
		// 		prettier: false,
		// 		svgo: true,
		// 		svgoConfig: {
		// 			plugins: [
		// 				{
		// 					name: 'preset-default',
		// 					params: {
		// 						override: {
		// 							removeViewBox: false,
		// 						},
		// 					},
		// 				},
		// 			],
		// 		},
		// 		titleProp: true,
		// 	},
		// 	test: /\.svg$/,
		// })

		// return config

		// Grab the existing rule that handles SVG imports
		const fileLoaderRule = config.module.rules.find((rule) =>
			rule.test?.test?.('.svg'),
		)

		config.module.rules.push(
			// Reapply the existing rule, but only for svg imports ending in ?url
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /url/, // *.svg?url
			},
			// Convert all other *.svg imports to React components
			{
				test: /\.svg$/i,
				issuer: fileLoaderRule.issuer,
				resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
				use: ['@svgr/webpack'],
			},
		)

		// Modify the file loader rule to ignore *.svg, since we have it handled now.
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}

module.exports = nextConfig
