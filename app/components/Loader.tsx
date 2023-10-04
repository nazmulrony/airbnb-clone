'use client';

import { PuffLoader } from 'react-spinners';

export default function Loader() {
	return (
		<div className="h-[70vh] flex flex-col justify-center items-center">
			<PuffLoader color="red" size={100} />
		</div>
	);
}
