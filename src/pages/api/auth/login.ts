import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, phone } = req.body;
  if (!email || !phone) {
    return res.status(400).json({ error: 'Email and phone required' });
  }
  const user = await prisma.user.upsert({
    where: { email },
    update: { phone },
    create: { email, phone },
  });
  res.status(200).json({ success: true, userId: user.id });
}
