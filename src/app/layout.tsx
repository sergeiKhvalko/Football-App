import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SearchBar from './components/searchBar/SearchBar'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'FootballAPP',
	description: 'Football/Soccer Stats, Matches, Team Info App',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="relative bg-black">
					<div className="absolute top-0 left-0 w-full h-full">
						<Image
							width={0}
							height={0}
							src="/background.png"
							alt="backgroundImage"
							className="h-screen w-full object-cover"
							sizes="100vw"
							style={{ width: '100%', height: 'auto' }}
						/>
					</div>
					<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 to-black" />
					<div className="relative">
						<SearchBar />
						{children}
					</div>
				</div>
			</body>
		</html>
	)
}
