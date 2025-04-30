import prisma from '../../../src/lib/prisma';
export default async function handler(req, res) {
  const { to, amount } = req.body;
  const tx = await prisma.transaction.create({ data: { fromUserId: "", toUserId: to, amount, status: "completed" } });
  res.json(tx);
}
