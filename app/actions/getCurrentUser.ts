import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import prisma from '../libs/prismadb';

export default async function getCurrentUser() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.email) {
		return null;
	}
	const currentUser = await prisma.user.findUnique({
		where: {
			email: session?.user?.email,
		},
	});
	if (!currentUser) {
		return null;
	}
	return currentUser;
}
