import getListingById from '@/app/actions/getListingById';

interface IParams {
	listingId?: string;
}

export default async function page({ params }: { params: IParams }) {
	const listing = await getListingById;
	return <div>page</div>;
}
