'use client';

import { User } from '@prisma/client';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from '../hooks/useFavorite';
import Spinner from './Spinner';

interface HeartButtonProps {
	listingId: string;
	currentUser?: User | null;
}
export default function HeartButton({
	listingId,
	currentUser,
}: HeartButtonProps) {
	const { hasFavorite, toggleFavorite, isLoading } = useFavorite({
		listingId,
		currentUser,
	});

	if (isLoading) {
		return <Spinner fill="rose-500" size="small" />;
	}

	return (
		<div
			onClick={toggleFavorite}
			className="relative hover:opacity-80 transition"
		>
			<AiOutlineHeart
				size={28}
				className="fill-white absolute  -left-[2px] -top-[2px] "
			/>
			<AiFillHeart
				size={24}
				className={` ${
					hasFavorite ? 'fill-red-500' : 'fill-neutral-500'
				}`}
			/>
		</div>
	);
}
