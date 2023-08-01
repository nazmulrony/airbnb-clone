'use client';

import { useCallback } from 'react';

interface CounterProps {
	title: string;
	subtitle: string;
	value: number;
	onChange: (value: number) => void;
}

export default function Counter({
	title,
	subtitle,
	value,
	onChange,
}: CounterProps) {
	const onAdd = useCallback(() => {
		onChange(value + 1);
	}, [value, onChange]);

	const onReduce = useCallback(() => {
		if (value === 1) {
			return;
		}

		onChange(value - 1);
	}, [value, onChange]);

	return (
		<div className="flex items-center justify-between">
			<div className="flex flex-col">
				<p className="font-medium">{title}</p>
				<p className="font-light text-gray-600">{subtitle}</p>
			</div>
			<div className="flex items-center gap-4"></div>
		</div>
	);
}
