'use client';

import useCountries from '@/app/hooks/useCountries';
import { useRouter } from 'next/navigation';
import { Listing, Reservation, User } from '@prisma/client';
import { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
	data: Listing;
	reservation?: Reservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: User | null;
}

export default function ListingCard({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
	currentUser,
}: ListingCardProps) {
	const router = useRouter();
	const { getByValue } = useCountries();

	const location = getByValue(data.locationValue);

	const handleCancel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			if (disabled) {
				return;
			}
			onAction?.(actionId);
		},
		[disabled, actionId, onAction]
	);

	//calculating price
	const price = useMemo(() => {
		if (reservation) {
			return reservation.totalPrice;
		}
		return data.price;
	}, [reservation, data.price]);

	//reservation date formatting

	const reservationDate = useMemo(() => {
		if (!reservation) {
			return null;
		}
		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')}-${format(end, 'PP')}`;
	}, [reservation]);

	return (
		<div
			className="col-span-1 cursor-pointer group"
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className="flex flex-col w-full gap-2  ">
				<div className="aspect-square w-full relative overflow-hidden rounded-xl">
					<Image
						alt="listing"
						src={data.imageSrc}
						fill
						className="object-cover h-full w-full group-hover:scale-110 duration-[400ms]"
					/>
					<div className="absolute top-3 right-3">
						<HeartButton
							listingId={data.id}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<p className="font-semibold text-lg">
					{location?.label}, {location?.region}
				</p>
				<p className="font-light text-neutral-500 ">
					{reservationDate || data.category}
				</p>
				<div className="flex flex-row items-center gap-1">
					<p className="font-semibold">${price}</p>
					{!reservation && <p className="font-light">night</p>}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCancel}
					/>
				)}
			</div>
		</div>
	);
}
