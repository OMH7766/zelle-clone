

import type { SessionOptions } from 'iron-session';

export const sessionOptions: SessionOptions = {
  password: process.env.NEXTAUTH_SECRET!,
  cookieName: 'zelle-clone-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

declare module 'iron-session' {
  interface IronSessionData {
    user?: { id: string; email: string };
  }
}
