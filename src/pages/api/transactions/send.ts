import type { NextApiRequest, NextApiResponse } from 'next';
import type { IronSession } from 'iron-session';
import prisma from '../../../lib/prisma';

interface SessionData {
  user?: { id: string; email: string; phone: string };
}

export default async function handler(
  req: NextApiRequest & { session: IronSession<SessionData> },
  res: NextApiResponse
) {
  const { recipientEmail, amount } = req.body;
  const senderId = req.session.user?.id;
  if (!senderId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const recipient = await prisma.user.findUnique({ where: { email: recipientEmail } });
  if (!recipient) {
    return res.status(404).json({ error: 'Recipient not found' });
  }

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
