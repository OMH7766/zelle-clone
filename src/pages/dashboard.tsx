import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [wallet, setWallet] = useState({ balance: 0, pending: 0 });

  useEffect(() => {
    axios.get('/api/transactions').then(res => setWallet(res.data.wallet));
  }, []);

  return (
    <div className="p-4">
      <div>Balance: ${wallet.balance}</div>
      <div>Pending: ${wallet.pending}</div>
    </div>
  );
}
