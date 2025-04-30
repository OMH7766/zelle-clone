import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../lib/session';
import prisma from '../../lib/prisma';

export default withIronSessionApiRoute(async (req, res) => {
  const { email } = req.body;
  let user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, phone: "" }
  });
  req.session.user = { id: user.id, email: user.email };
  await req.session.save();
  res.json({ success: true });
});
