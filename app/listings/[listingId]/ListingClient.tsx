import { Listing, Reservation, User } from '@prisma/client';

interface ListingClientProps {
	listing: Listing;
	currentUser: User | null;
	reservation?: Reservation[];
}

export default function ListingClient({
	listing,
	currentUser,
}: ListingClientProps) {
	return <div>ListingClient</div>;
}
