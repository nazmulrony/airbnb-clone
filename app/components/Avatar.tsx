'use client';

import Image from 'next/image';

interface AvatarProps {
	src?: string | null;
}

export default function Avatar({ src }: AvatarProps) {
	return (
		<Image
			className="rounded-full "
			height="30"
			width="30"
			alt="avatar"
			src={src || '/images/placeholder.jpg'}
		/>
	);
}
