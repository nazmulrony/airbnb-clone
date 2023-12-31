import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

export interface IListingsParams {
	userId?: string;
	guestCount?: number;
	roomCount?: number;
	bathroomCount?: number;
	startDate?: string;
	endDate?: string;
	locationValue?: string;
	category?: string;
}

export default async function getListings(params: IListingsParams) {
	// const currentUser = await getCurrentUser();
	// const userId = currentUser?.id;
	try {
		const {
			userId,
			roomCount,
			guestCount,
			bathroomCount,
			locationValue,
			startDate,
			endDate,
			category,
		} = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		if (category) {
			query.category = category;
		}

		if (roomCount) {
			query.roomCount = {
				gte: +roomCount,
			};
		}

		if (guestCount) {
			query.guestCount = {
				gte: +guestCount,
			};
		}

		if (bathroomCount) {
			query.bathroomCount = {
				gte: +bathroomCount,
			};
		}

		if (locationValue) {
			query.locationValue = locationValue;
		}

		if (startDate && endDate) {
			const isoStartDate = new Date(startDate).toISOString();
			const isoEndDate = new Date(endDate).toISOString();

			query.NOT = {
				reservations: {
					some: {
						OR: [
							{
								endDate: { gte: isoStartDate },
								startDate: { lte: isoStartDate },
							},
							{
								startDate: { lte: isoEndDate },
								endDate: { gte: isoEndDate },
							},
						],
					},
				},
			};
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		return listings;
	} catch (error: any) {
		throw new Error(error);
	}
}
