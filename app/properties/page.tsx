import getCurrentUser from '../actions/getCurrentUser';
import getListings from '../actions/getListings';
import EmptyState from '../components/EmptyState';
import PropertiesClient from './PropertiesClient';

export default async function PropertiesPage() {
	const currentUer = await getCurrentUser();

	if (!currentUer) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	const listings = await getListings({ userId: currentUer?.id });
	if (listings?.length == 0) {
		return (
			<EmptyState title="No properties found" subtitle="Looks like you have no properties" />
		);
	}
	return <PropertiesClient listings={listings} currentUser={currentUer} />;
}
