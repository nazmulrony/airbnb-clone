'use client';
import { Listing, Reservation, User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface ReservationClientParams {
	reservations: (Reservation & { listing: Listing })[];
	currentUser?: User | null;
}

export default function ReservationsClient({ reservations, currentUser }: ReservationClientParams) {
	const router = useRouter();
	const [deletingId, setDeletingId] = useState('');

	const onCancel = useCallback(
		(id: string) => {
			setDeletingId(id);
			axios
				.delete(`/api/reservations/${id}`)
				.then(() => {
					toast.success('Reservation canceled');
					router.refresh();
				})
				.catch((error) => {
					toast.error('Something went wrong!');
				})
				.finally(() => {
					setDeletingId('');
				});
		},
		[router]
	);
	return (
		<Container>
			<Heading title="Reservations" subtitle="Booking on your properties" />
			<div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
				{reservations.map((reservation) => (
					<ListingCard
						key={reservation.id}
						data={reservation.listing}
						reservation={reservation}
						actionId={reservation.id}
						onAction={onCancel}
						actionLabel="Cancel guest reservation"
						disabled={deletingId === reservation.id}
						isLoading={deletingId === reservation.id}
						currentUser={currentUser}
					/>
				))}
			</div>
		</Container>
	);
}
