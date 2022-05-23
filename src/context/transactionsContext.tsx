import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface TransactionsObject{
  id: number;
  type: string;
  category: string;
  amount: number;
  title: string;
  createdAt: string;
}

type TransactionInput = Omit<TransactionsObject, 'id' | 'createdAt'>

interface Functionprops{
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: TransactionsObject[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;

}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider ({ children }: Functionprops){
  const [transactions, setTransactions] = useState<TransactionsObject[]>([]);

  useEffect(() => {
    api.get('transactions')
    .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('transactions', {
      ...transactionInput,
      createdAt: new Date()
    });

    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions , createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){
  const context = useContext(TransactionsContext);
  return context;
}