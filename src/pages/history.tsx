import { useEffect, useState } from 'react';
import axios from 'axios';

export default function History() {
  const [txs, setTxs] = useState([]);
  useEffect(() => { axios.get('/api/transactions').then(res => setTxs(res.data.transactions)); }, []);
  return <ul>{txs.map(tx => <li key={tx.id}>{tx.id}: {tx.amount}</li>)}</ul>;
}
