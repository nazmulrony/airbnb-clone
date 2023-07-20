'use client';

interface HeadingProps {
	title: string;
	subtitle?: string;
	center?: boolean;
}

export default function Heading({ title, center, subtitle }: HeadingProps) {
	return (
		<div className={center ? 'text-center' : 'text-start'}>
			<p className="text-2xl font-bold">{title}</p>
			<p className="font-light text-neutral-500 mt-2 ">{subtitle}</p>
		</div>
	);
}
