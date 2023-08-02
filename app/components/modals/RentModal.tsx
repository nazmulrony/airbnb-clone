'use client';
import useRentModal from '@/app/hooks/useRentModal';
import Modal from './Modal';
import { useMemo, useState } from 'react';
import Heading from '../Heading';
import { categories } from '../navbar/Categories';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CountrySelect from '../inputs/CountrySelect';
import dynamic from 'next/dynamic';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5,
}

export default function RentModal() {
	const rentModal = useRentModal();
	const router = useRouter();

	const [step, setStep] = useState(STEPS.CATEGORY);
	const [isLoading, setIsLoading] = useState(false);

	//hook form stuffs
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
		reset,
	} = useForm<FieldValues>({
		defaultValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: '',
		},
	});

	//extracting individual values from hook form. It can also e done using hook rom getValues function
	const category = watch('category');
	const location = watch('location');
	const guestCount = watch('guestCount');
	const roomCount = watch('roomCount');
	const bathroomCount = watch('bathroomCount');
	const imageSrc = watch('imageSrc');

	const Map = useMemo(
		() =>
			dynamic(() => import('../Map'), {
				ssr: false,
			}),
		[location]
	);

	const setCustomValue = (id: string, value: any) => {
		setValue(id, value, {
			shouldValidate: true,
			shouldDirty: true,
			shouldTouch: true,
		});
	};

	const onBack = () => {
		setStep((value) => value - 1);
	};

	const onNext = () => {
		setStep((value) => value + 1);
	};

	//submit handler function

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		if (step !== STEPS.PRICE) {
			return onNext();
		}
		setIsLoading(true);

		axios
			.post('/api/listings', data)
			.then(() => {
				toast.success('Listing Created!');
				router.refresh();
				reset();
				setStep(STEPS.CATEGORY);
				rentModal.onClose();
			})
			.catch((error) => {
				toast.error(error?.message);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const actionLabel = useMemo(() => {
		if (step === STEPS.PRICE) {
			return 'Create';
		}
		return 'Next';
	}, [step]);

	const secondaryActionLabel = useMemo(() => {
		if (step === STEPS.CATEGORY) {
			return undefined;
		}
		return 'Back';
	}, [step]);

	//body content
	//Category Step
	let bodyContent = (
		<div className="flex flex-col gap-8">
			<Heading
				title="Which of these best describe your place?"
				subtitle="Pick a category"
			/>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
				{categories.map((item) => (
					<div key={item.label} className="col-span-1">
						<CategoryInput
							label={item.label}
							icon={item.icon}
							onClick={(category) =>
								setCustomValue('category', category)
							}
							selected={category === item.label}
						/>
					</div>
				))}
			</div>
		</div>
	);
	//Location step
	if (step === STEPS.LOCATION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Where is your place located?"
					subtitle="Help guests find you!"
				/>
				<CountrySelect
					onChange={(value) => setCustomValue('location', value)}
					value={location}
				/>
				<Map center={location?.latlng} />
			</div>
		);
	}
	//Info step
	if (step === STEPS.INFO) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Share some basics about your place"
					subtitle="What amenities fo you have?"
				/>
				<Counter
					title="Guests"
					subtitle="How many guests do you allow?"
					value={guestCount}
					onChange={(value) => setCustomValue('guestCount', value)}
				/>
				<hr />
				<Counter
					title="Rooms"
					subtitle="How many rooms do you have?"
					value={roomCount}
					onChange={(value) => setCustomValue('roomCount', value)}
				/>
				<hr />
				<Counter
					title="Bathrooms"
					subtitle="How many bathrooms do you have?"
					value={bathroomCount}
					onChange={(value) => setCustomValue('bathroomCount', value)}
				/>
			</div>
		);
	}

	//image uploading step
	if (step === STEPS.IMAGES) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Add photos of your place"
					subtitle="Show guests what your place looks like!"
				/>
				<ImageUpload
					value={imageSrc}
					onChange={(value) => setCustomValue('imageSrc', value)}
				/>
			</div>
		);
	}

	//description step
	if (step === STEPS.DESCRIPTION) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="How would you describe your place?"
					subtitle="Short and sweet works best"
				/>
				<Input
					id="title"
					label="Title"
					register={register}
					disabled={isLoading}
					errors={errors}
					required
				/>
				<hr />
				<Input
					id="description"
					label="Description"
					register={register}
					disabled={isLoading}
					errors={errors}
					required
				/>
			</div>
		);
	}

	//price step
	if (step === STEPS.PRICE) {
		bodyContent = (
			<div className="flex flex-col gap-8">
				<Heading
					title="Now, set your price"
					subtitle="How much do you charge per night?"
				/>
				<Input
					id="price"
					label="Price"
					formatPrice
					type="number"
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
			</div>
		);
	}

	return (
		<Modal
			title="Airbnb Your Home"
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			actionLabel={actionLabel}
			secondaryActionLabel={secondaryActionLabel}
			secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			isLoading={isLoading}
		/>
	);
}
