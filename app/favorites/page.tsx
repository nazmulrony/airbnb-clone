import getCurrentUser from '../actions/getCurrentUser';
import getFavoriteListings from '../actions/getFavoriteListings';
import EmptyState from '../components/EmptyState';
import FavoritesClient from './FavoritesClient';

export const dynamic = 'force-static';

export default async function FavoritesPage() {
	const listings = await getFavoriteListings();
	const currentUer = await getCurrentUser();

	if (listings?.length == 0) {
		return (
			<EmptyState
				title="No favorites found"
				subtitle="Looks like you have no favorite listings."
			/>
		);
	}

	return <FavoritesClient listings={listings} currentUser={currentUer} />;
}
