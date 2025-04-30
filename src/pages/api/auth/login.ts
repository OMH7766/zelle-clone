import type { NextApiRequest, NextApiResponse } from 'next';
import type { IronSession } from 'iron-session';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '../../../lib/session';
import prisma from '../../../lib/prisma';

export default withIronSessionApiRoute(
  async (req: NextApiRequest & { session: IronSession }, res: NextApiResponse) => {
    const { email, phone } = req.body;
    if (!email || !phone) {
      return res.status(400).json({ error: 'Email and phone required' });
    }
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email, phone } });
      await prisma.wallet.create({ data: { userId: user.id } });
    }
    // Now req.session is correctly typed
    req.session.user = { id: user.id, email: user.email, phone: user.phone };
    await req.session.save();
    res.status(200).json({ success: true });
  },
  sessionOptions
);
