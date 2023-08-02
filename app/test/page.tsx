import getCurrentUser from '../actions/getCurrentUser';

export default async function Test() {
	const user = await getCurrentUser();
	console.log(user);
	return (
		<div className="grid place-items-center ">Hello testing screen!</div>
	);
}
