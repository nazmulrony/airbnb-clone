import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function GET(request: Request) {
	const session = await getCurrentUser();
	console.log(session);
	if (!session) return NextResponse.json({ message: 'invalid session' });
	return NextResponse.json(session);
}
