'use client';
import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../Avatar';
import { useState, useCallback } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import { signOut, useSession } from 'next-auth/react';
import useRentModal from '@/app/hooks/useRentModal';
import { useRouter } from 'next/navigation';

export default function UserMenu() {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen] = useState(false);
	const session = useSession();

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	}, []);

	const onRent = useCallback(() => {
		if (!(session.status === 'authenticated')) {
			return loginModal.onOpen();
		}

		rentModal.onOpen();
	}, [session, loginModal, rentModal]);

	return (
		<div className="relative ">
			<div className="flex flex-row items-center gap-3">
				<div
					onClick={onRent}
					className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
				>
					Airbnb your home
				</div>
				<div
					onClick={toggleOpen}
					className="p-4 md:py-1 md:px-2 border border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
				>
					<AiOutlineMenu />
					<div className="hidden md:block">
						<Avatar src={session?.data?.user?.image} />
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
					<div className="flex flex-col cursor-pointer">
						{session.status === 'authenticated' ? (
							<>
								<MenuItem
									label="My Trips"
									onClick={() => {
										router.push('/trips');
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label="My Favorites"
									onClick={() => {
										router.push('/favorites');
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label="My Reservations"
									onClick={() => {
										router.push('/reservations');
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label="My Properties"
									onClick={() => {
										router.push('/properties');
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label="Airbnb My Home"
									onClick={() => {
										rentModal.onOpen();
										setIsOpen(false);
									}}
								/>
								<hr />
								<MenuItem
									label="Logout"
									onClick={() => {
										signOut();
										setIsOpen(false);
									}}
								/>
							</>
						) : (
							<>
								<MenuItem
									label="Login"
									onClick={() => {
										loginModal.onOpen();
										setIsOpen(false);
									}}
								/>
								<MenuItem
									label="Sign Up"
									onClick={() => {
										registerModal.onOpen();
										setIsOpen(false);
									}}
								/>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
