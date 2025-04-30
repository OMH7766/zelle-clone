import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link href="/login">
        <a className="px-4 py-2 bg-blue-600 text-white rounded">Login / Signup</a>
      </Link>
    </div>
  );
}
