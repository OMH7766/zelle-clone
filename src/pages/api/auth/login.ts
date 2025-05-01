import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Only POST allowed' });

  try {
    console.log('💡 Login body:', req.body);
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ error: 'Email and phone are required' });
    }
    const user = await prisma.user.upsert({
      where: { email },
      update: { phone },
      create: { email, phone },
    });
    console.log('✅ Upserted user:', user);
    return res.status(200).json({ success: true, userId: user.id });
  } catch (err: any) {
    console.error('❌ Login error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
