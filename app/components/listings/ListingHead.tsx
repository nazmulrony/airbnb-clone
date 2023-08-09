'use client';

import useCountries from '@/app/hooks/useCountries';
import { User } from '@prisma/client';
import Heading from '../Heading';
import Image from 'next/image';
import HeartButton from '../HeartButton';

interface ListingHeadProps {
	title: string;
	locationValue: string;
	imageSrc: string;
	id: string;
	currentUser?: User | null;
}

export default function ListingHead({
	title,
	locationValue,
	imageSrc,
	id,
	currentUser,
}: ListingHeadProps) {
	const { getByValue } = useCountries();

	const location = getByValue(locationValue);

	return (
		<>
			<Heading
				title={title}
				subtitle={`${location?.label}, ${location?.region}`}
			/>
			<div className="w-full h-[60vh]  overflow-hidden rounded-xl relative">
				<Image
					alt="Image"
					src={imageSrc}
					fill
					className="object-cover w-full"
				/>
				<div className="absolute top-5 right-5">
					<HeartButton listingId={id} currentUser={currentUser} />
				</div>
			</div>
		</>
	);
}
