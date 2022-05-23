import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import { NewTransactionsModal } from "./components/NewTransactionsModal";
import { useState } from "react";
import { TransactionsProvider } from './context/transactionsContext';

export function App() {

  const [isNewTransctionModalOpen, setIsNewTransctionModalOpen] = useState(false);

  function handleOpenIsNewTransctionModalOpen(){
    setIsNewTransctionModalOpen(true);
  }

  function handleCloseIsNewTransctionModalOpen(){
    setIsNewTransctionModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenIsNewTransctionModalOpen}/>
      <Dashboard />
      <GlobalStyle />
      <NewTransactionsModal 
        isOpen={isNewTransctionModalOpen}
        onRequestClose={handleCloseIsNewTransctionModalOpen}
      />
    </TransactionsProvider>
  );
}