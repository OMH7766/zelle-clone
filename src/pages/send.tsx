import { useState } from 'react';
import axios from 'axios';

export default function Send() {
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const handle = async () => { await axios.post('/api/transactions/send', { to, amount: Number(amount) }); };

  return (
    <div>
      <input placeholder="To" value={to} onChange={e => setTo(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
      <button onClick={handle}>Send</button>
    </div>
  );
}
