import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const wallet = await prisma.wallet.findFirst();
  const transactions = await prisma.transaction.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Only return fields that actually exist on the Transaction model
  const txs = transactions.map(tx => ({
    id: tx.id,
    fromUserId: tx.fromUserId,
    toUserId: tx.toUserId,
    amount: tx.amount,
    status: tx.status,
    createdAt: tx.createdAt,
  }));

  res.status(200).json({ wallet, transactions: txs });
}
