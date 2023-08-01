'use clinet';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useCallback } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

interface ImageUploadProps {
	onChange: (value: string) => void;
	value: string;
}

export default function ImageUpload({ onChange, value }: ImageUploadProps) {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange]
	);

	return (
		<CldUploadWidget
			onUpload={handleUpload}
			uploadPreset="nawo54xo"
			options={{ maxFiles: 1 }}
		>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300  flex flex-col justify-center items-center gap-4 text-neutral-600"
					>
						<TbPhotoPlus size={48} />
						<p className="font-semibold text-lg">Click to upload</p>
						{value && (
							<div className="absolute inset-0 w-full h-full">
								<Image
									alt="Upload"
									fill
									src={value}
									style={{ objectFit: 'cover' }}
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
}
