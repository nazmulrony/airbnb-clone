'use client';
import { IconType } from 'react-icons';

interface ButtonProps {
	label: string;
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
	disabled?: boolean;
	outline?: boolean;
	small?: boolean;
	isLoading?: boolean;
	icon?: IconType;
}

export default function Button({
	label,
	onClick,
	disabled,
	icon: Icon,
	outline,
	small,
	isLoading,
}: ButtonProps) {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`
    relative disabled:opacity-70 flex justify-center gap-2 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full 
    ${outline ? 'bg-white' : 'bg-rose-500'}
    ${outline ? 'border-black' : 'border-rose-500'}
    ${outline ? 'text-black' : 'text-white'}
    ${small ? 'py-1' : 'py-3'}
    ${small ? 'text-sm' : 'text-md'}
    ${small ? 'font-light' : 'font-semibold'}
    ${small ? 'border' : 'border-2'}
    `}
		>
			{Icon && <Icon size={24} className="absolute left-4 top-3 " />}
			{isLoading && (
				<svg className="h-6 w-6 animate-spin" viewBox="3 3 18 18">
					<path
						className="fill-rose-300"
						d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
					></path>
					<path
						className="fill-white"
						d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
					></path>
				</svg>
			)}
			{label}
		</button>
	);
}
