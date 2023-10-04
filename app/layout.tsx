import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';
import RentModal from './components/modals/RentModal';
import SearchModal from './components/modals/SearchModal';
import Navbar from './components/navbar/Navbar';
import AuthProvider from './components/providers/AuthProvider';
import './globals.css';
import ToasterProvider from './providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Airbnb',
	description: 'Airbnb clone using nextjs',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={font.className}>
				<ToasterProvider />
				<RegisterModal />
				<LoginModal />
				<RentModal />
				<SearchModal />
				<AuthProvider>
					<Navbar />
				</AuthProvider>
				<div className="pb-20 pt-28 ">{children}</div>
			</body>
		</html>
	);
}
