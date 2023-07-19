'use client';

import Image from 'next/image';

export default function Logo() {
	return (
		<Image
			alt=""
			height="100"
			width="100"
			src="/images/logo.png"
			className="hidden md:flex cursor-pointer"
		/>
	);
}
