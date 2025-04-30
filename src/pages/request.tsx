import { useState } from 'react';
import axios from 'axios';

export default function Request() {
  const [from, setFrom] = useState('');
  const [amount, setAmount] = useState('');
  const handle = async () => { await axios.post('/api/transactions/request', { from, amount: Number(amount) }); };

  return (
    <div>
      <input placeholder="From" value={from} onChange={e => setFrom(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handle}>Request</button>
    </div>
  );
}
