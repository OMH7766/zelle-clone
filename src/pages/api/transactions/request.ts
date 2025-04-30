import prisma from '../../../src/lib/prisma';
export default async function handler(req, res) {
  const { from, amount } = req.body;
  const tx = await prisma.transaction.create({ data: { fromUserId: from, toUserId: "", amount, status: "pending" } });
  res.json(tx);
}
