import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/api/auth/login', { email, phone });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An unexpected error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl mb-4">Login / Sign Up</h1>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border mb-4"
      />
      <input
        type="text"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full p-2 border mb-4"
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Continue
      </button>
    </div>
  );
}
