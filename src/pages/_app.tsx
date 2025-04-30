-import '../styles/globals.css';
-import { SessionProvider } from 'next-auth/react';
-
-export default function App({ Component, pageProps }) {
-  return (
-    <SessionProvider session={pageProps.session}>
-      <Component {...pageProps} />
-    </SessionProvider>
-  );
-}
+import '../styles/globals.css';
+import { SessionProvider } from 'next-auth/react';
+import type { AppProps } from 'next/app';
+
+export default function App({ Component, pageProps }: AppProps) {
+  return (
+    <SessionProvider session={pageProps.session}>
+      <Component {...pageProps} />
+    </SessionProvider>
+  );
+}
