import { Listing, User } from '@prisma/client';

interface ListingClientProps {
	listing: Listing;
	currentUser: User | null;
}

export default function ListingClient({
	listing,
	currentUser,
}: ListingClientProps) {
	return <div>ListingClient</div>;
}
