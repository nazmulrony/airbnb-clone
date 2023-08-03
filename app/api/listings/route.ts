import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		guestCount,
		bathroomCount,
		location,
		price,
	} = body;

	Object.keys(body).forEach((key) => {
		if (!body[key]) {
			return NextResponse.error();
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			price: parseInt(price, 10),
			userId: currentUser.id,
		},
	});
	return NextResponse.json(listing);
}
