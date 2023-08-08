import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useLoginModal from './useLoginModal';
import { useCallback, useMemo, useState } from 'react';
import axios from 'axios';

interface IUseFavorite {
	listingId: string;
	currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
	const router = useRouter();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	//check if the id is already in favorite list
	const hasFavorite = useMemo(() => {
		const list = currentUser?.favoriteIds || [];
		return list.includes(listingId);
	}, [currentUser, listingId]);

	//toggle favorite item
	const toggleFavorite = useCallback(
		async (e: React.MouseEvent<HTMLDivElement>) => {
			setIsLoading(true);
			e.stopPropagation();

			if (!currentUser) {
				return loginModal.onOpen();
			}
			try {
				let request;

				if (hasFavorite) {
					request = () => axios.delete(`/api/favorites/${listingId}`);
				} else {
					request = () => axios.post(`/api/favorites/${listingId}`);
				}

				await request();
				router.refresh();
				toast.success('Success');
			} catch (error) {
				toast.error('Something went wrong!');
			} finally {
				setIsLoading(false);
			}
		},
		[listingId, currentUser, router, hasFavorite, loginModal]
	);
	return { hasFavorite, toggleFavorite, isLoading };
};

export default useFavorite;
