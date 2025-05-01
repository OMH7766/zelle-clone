import type { NextApiRequest, NextApiResponse } from 'next';
import type { IronSession } from 'iron-session';
import prisma from '../../../lib/prisma';

// Match the SessionData interface used elsewhere
interface SessionData {
  user?: { id: string; email: string; phone: string };
}

export default async function handler(
  req: NextApiRequest & { session: IronSession<SessionData> },
  res: NextApiResponse
) {
  const { payerEmail, amount } = req.body;
  const requesterId = req.session.user?.id;
  if (!requesterId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const payer = await prisma.user.findUnique({ where: { email: payerEmail } });
  if (!payer) {
    return res.status(404).json({ error: 'Payer not found' });
  }

  const tx = await prisma.transaction.create({
    data: {
      fromUserId: payer.id,
      toUserId: requesterId,
      amount,
      status: 'pending',
    },
  });
  res.status(200).json(tx);
}
