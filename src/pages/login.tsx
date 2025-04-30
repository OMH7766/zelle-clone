import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    await axios.post('/api/auth/login', { email });
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border mb-4"/>
      <button onClick={handleLogin} className="w-full p-2 bg-blue-600 text-white rounded">Continue</button>
    </div>
  );
}
