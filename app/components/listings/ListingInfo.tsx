'use client';

import { User } from '@prisma/client';
import { IconType } from 'react-icons';

interface ListingInfoProps {
	user: User;
	description: string;
	guestCount: number;
	roomCount: number;
	bathroomCount: number;
	category:
		| {
				icon: IconType;
				label: string;
				description: string;
		  }
		| undefined;
	locationValue: string;
}

export default function ListingInfo({}: ListingInfoProps) {
	return <div>ListingInfo</div>;
}
