import getCurrentUser from '../actions/getCurrentUser';
import getReservations from '../actions/getReservations';
import Button from '../components/Button';
import EmptyState from '../components/EmptyState';
import ReservationsClient from './ReservationsClient';

export default async function ReservationPage() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return <EmptyState title="Unauthorized" subtitle="Please login" />;
	}

	const reservations = await getReservations({ authorId: currentUser.id });
	if (reservations.length === 0) {
		return (
			<EmptyState
				title="No reservation found"
				subtitle="Looks like you have no reservations on your properties"
			/>
		);
	}
	return <ReservationsClient reservations={reservations} currentUser={currentUser} />;
}
