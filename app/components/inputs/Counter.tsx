'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

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
				<p className="font-medium text-lg">{title}</p>
				<p className="font-light text-gray-600 ">{subtitle}</p>
			</div>
			<div className="flex items-center gap-4">
				<button
					onClick={onReduce}
					className=" w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600  hover:opacity-80 transition"
				>
					<AiOutlineMinus />
				</button>
				<p className="font-light text-xl text-neutral-600">{value}</p>
				<button
					onClick={onAdd}
					className=" w-10 h-10 rounded-full border border-neutral-400 flex items-center justify-center text-neutral-600  hover:opacity-80 transition"
				>
					<AiOutlinePlus />
				</button>
			</div>
		</div>
	);
}
