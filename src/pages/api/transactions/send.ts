import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';
import type { IronSession } from 'iron-session';

export default async function handler(
  req: NextApiRequest & { session: IronSession },
  res: NextApiResponse
) {
  const { recipientEmail, amount } = req.body;
  const senderId = req.session.user?.id;
  if (!senderId) return res.status(401).json({ error: 'Unauthorized' });

  const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });
  if (!recipient) return res.status(404).json({ error: 'Recipient not found' });

  const tx = await prisma.transaction.create({
    data: {
      fromUserId: senderId,
      toUserId: recipient.id,
      amount,
      status: 'completed',
    },
  });
  res.status(200).json(tx);
}
