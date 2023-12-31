'use client';

import Container from '@/app/components/Container';
import ListingHead from '@/app/components/listings/ListingHead';
import ListingInfo from '@/app/components/listings/ListingInfo';
import ListingReservation from '@/app/components/listings/ListingReservation';
import { categories } from '@/app/components/navbar/Categories';
import useLoginModal from '@/app/hooks/useLoginModal';
import { Listing, Reservation, User } from '@prisma/client';
import axios from 'axios';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';

//initial date range
const initialDateRange = {
	startDate: new Date(),
	endDate: new Date(),
	key: 'selection',
};

//interface
interface ListingClientProps {
	listing: Listing & { user: User };
	currentUser?: User | null;
	reservations?: Reservation[];
}

export default function ListingClient({
	listing,
	currentUser,
	reservations = [],
}: ListingClientProps) {
	const loginModal = useLoginModal();
	const router = useRouter();

	//disabled dates
	const disabledDates = useMemo(() => {
		let dates: Date[] = [];

		reservations.forEach((reservation) => {
			const range = eachDayOfInterval({
				//this method returns an array of dates within the specified time interval
				start: new Date(reservation.startDate),
				end: new Date(reservation.endDate),
			});
			dates = [...dates, ...range];
		});
		return dates;
	}, [reservations]);

	//necessary states
	const [isLoading, setIsLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(listing.price);
	const [dateRange, setDateRange] = useState<Range>(initialDateRange);

	//create reservation function
	const onCreateReservation = useCallback(() => {
		if (!currentUser) {
			loginModal.onOpen();
		}

		setIsLoading(true);

		axios
			.post('/api/reservations', {
				totalPrice,
				startDate: dateRange.startDate,
				endDate: dateRange.endDate,
				listingId: listing.id,
			})
			.then(() => {
				toast.success('Listing reserved');
				//redirect to trip
				router.push('/trips');
			})
			.catch(() => {
				toast.error('Something went wrong!');
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [totalPrice, dateRange, listing?.id, router, currentUser, loginModal]);

	//calculating the price depending on how user selects the date
	useEffect(() => {
		if (dateRange.startDate && dateRange.endDate) {
			console.log(dateRange.startDate, dateRange.endDate);
			const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);
			console.log(dayCount);

			if (dayCount && listing.price) {
				setTotalPrice(dayCount * listing.price);
			}
		} else {
			setTotalPrice(listing.price);
		}
	}, [dateRange, listing.price]);

	//finding the category details
	const category = useMemo(() => {
		return categories.find((item) => item.label === listing.category);
	}, [listing.category]);
	return (
		<Container>
			<div className="max-w-screen-lg mx-auto">
				<div className=" flex flex-col gap-6 ">
					<ListingHead
						title={listing.title}
						imageSrc={listing.imageSrc}
						locationValue={listing.locationValue}
						id={listing.id}
						currentUser={currentUser}
					/>
					<div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
						<ListingInfo
							user={listing.user}
							category={category}
							description={listing.description}
							roomCount={listing.roomCount}
							guestCount={listing.guestCount}
							bathroomCount={listing.bathroomCount}
							locationValue={listing.locationValue}
						/>
						<div className="order-first mb-10 md:order-last md:col-span-3">
							<ListingReservation
								price={listing.price}
								totalPrice={totalPrice}
								onChangeDate={(value) => setDateRange(value)}
								dateRange={dateRange}
								onSubmit={onCreateReservation}
								disabled={isLoading}
								disabledDates={disabledDates}
							/>
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
}
