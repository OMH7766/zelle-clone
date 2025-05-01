import { useEffect, useState } from 'react';
import axios from 'axios';

interface Tx {
  id: string;
  amount: number;
  fromUserEmail?: string;
  toUserEmail?: string;
  status?: string;
}

export default function History() {
  const [txs, setTxs] = useState<Tx[]>([]);

  useEffect(() => {
    axios.get('/api/transactions').then(res => setTxs(res.data.transactions));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-4">Transaction History</h1>
      <ul>
        {txs.map(tx => (
          <li key={tx.id} className="border p-3 mb-2">
            {tx.id}: ${tx.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
