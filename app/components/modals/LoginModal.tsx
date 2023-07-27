'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';

export default function LoginModal() {
	const router = useRouter();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: { email: '', password: '' },
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		signIn('credentials', { ...data, redirect: false }).then((callback) => {
			setIsLoading(false);
			if (callback?.ok) {
				console.log(callback);
				toast.success('Logged in successfully');
				router.refresh();
				loginModal.onClose();
			}
			if (callback?.error) {
				toast.error(callback.error);
			}
		});
	};

	const bodyContent = (
		<div className="flex flex-col gap-4 ">
			<Heading title="Welcome back!" subtitle="Login to your account." />
			<Input
				id="email"
				label="Email"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
				type="email"
			/>
			<Input
				type="password"
				id="password"
				label="Password"
				disabled={isLoading}
				register={register}
				errors={errors}
				required
			/>
		</div>
	);

	//footer
	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className="text-neutral-500 text-center mt-4 font-light">
				<p>
					Already have an account?
					<span
						onClick={loginModal.onClose}
						className="cursor-pointer hover:underline text-neutral-800 ml-1"
					>
						Login
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			isLoading={isLoading}
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Login"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}
