import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import EmptyState from '../components/EmptyState';
import TripsClient from './TripsClient';

export default async function TripsPage() {
	const currentUer = await getCurrentUser();

	if (!currentUer) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	const reservations = await getReservations({ userId: currentUer?.id });
	if (reservations?.length == 0) {
		return (
			<EmptyState
				title="No trips found"
				subtitle="Looks like you haven't reserved any trips"
			/>
		);
	}
	return <TripsClient reservations={reservations} currentUser={currentUer} />;
}
