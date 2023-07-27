import Container from '../Container';
import { TbBeach } from 'react-icons/tb';
import { GiWindmill } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import CategoryBox from './CategoryBox';

export const categories = [
	{
		label: 'Beach',
		icon: TbBeach,
		description: 'This property is close to the beach!',
	},
	{
		label: 'Windmills',
		icon: GiWindmill,
		description: 'This property has windmills!',
	},
	{
		label: 'Modern',
		icon: MdOutlineVilla,
		description: 'This property is modern!',
	},
];

export default function Categories() {
	return (
		<Container>
			<div className="pt-4 flex flex-grow items-center justify-between overflow-x-auto">
				{categories.map((item) => (
					<CategoryBox
						key={item.label}
						label={item.label}
						description={item.description}
						icon={item.icon}
					/>
				))}
			</div>
		</Container>
	);
}
