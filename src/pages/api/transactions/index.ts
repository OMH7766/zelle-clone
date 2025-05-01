import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wallet = await prisma.wallet.findFirst();

  // @ts-ignore: bypass include typing until Prisma client types are in sync
  const transactions = await prisma.transaction.findMany({
    include: { 
      fromUser: { select: { email: true } }, 
      toUser:   { select: { email: true } } 
    },
    orderBy: { createdAt: 'desc' },
  });

  const txs = transactions.map(tx => ({
    id: tx.id,
    // @ts-ignore
    fromUserEmail: tx.fromUser.email,
    // @ts-ignore
    toUserEmail:   tx.toUser.email,
    amount:        tx.amount,
    status:        tx.status,
  }));

  res.status(200).json({ wallet, transactions: txs });
}
