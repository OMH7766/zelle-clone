import prisma from '../../../lib/prisma';
export default async function handler(req, res) {
  const wallet = await prisma.wallet.findFirst();
  const txs = await prisma.transaction.findMany();
  res.json({ wallet, transactions: txs });
}
