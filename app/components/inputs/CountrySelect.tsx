'use client';

import useCountries from '@/app/hooks/useCountries';
import Image from 'next/image';
import Select from 'react-select';

export type CountrySelectValue = {
	flag: string;
	label: string;
	latlng: number[];
	region: string;
	value: string;
};

interface CountrySelectProps {
	value?: CountrySelectValue;
	onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
	const { getAll } = useCountries();
	return (
		<div>
			<Select
				placeholder="Anywhere"
				isClearable
				options={getAll()}
				value={value}
				onChange={(value) => onChange(value as CountrySelectValue)}
				formatOptionLabel={(option: any) => {
					return (
						<div className=" flex flex-row items-center gap-3">
							<Image
								alt={option.flag}
								src={`https://flagcdn.com/${option.value.toLowerCase()}.svg`}
								width={16}
								height={16}
							/>
							<div>
								{option.label},
								<span className="text-neutral-400 ml-1 text-sm">
									{option.region}
								</span>
							</div>
						</div>
					);
				}}
				classNames={{
					control: () => 'p-3 border-2',
					input: () => 'text-lg',
					option: () => 'text-lg',
				}}
				theme={(theme) => ({
					...theme,
					borderRadius: 6,
					colors: {
						...theme.colors,
						primary: 'black',
						primary25: '#f7f7f7f7',
						primary50: '#ccc',
					},
				})}
			/>
		</div>
	);
}
