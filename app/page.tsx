import Image from 'next/image';
import Container from './components/Container';
import EmptyState from './components/EmptyState';
import getListings from './actions/getListings';

export default async function Home() {
	const listings = await getListings();

	if (listings.length === 0) {
		return <EmptyState />;
	}
	console.log(listings);

	return (
		<Container>
			<div>
				<div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
					Test
				</div>
			</div>
		</Container>
	);
}
