'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Logo() {
	const router = useRouter();
	return (
		<Image
			onClick={() => router.push('/')}
			alt=""
			height="100"
			width="100"
			src="/images/logo.png"
			className="hidden md:flex cursor-pointer"
		/>
	);
}
