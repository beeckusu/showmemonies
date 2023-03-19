import React from 'react';

import Container from 'react-bootstrap/Container';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddExpenseForm from './components/preGeneration/FileUploadForm';
import { AppProvider } from './context/BudgetContext';
import GraphPage from './components/GraphPage';
import TransactionsPage from './components/TransactionsPage';
import SideTab from './components/utils/SideTab';

const App = () => (
  <AppProvider>
    <Container className="p-3">
      <AddExpenseForm />
      <GraphPage />
      <SideTab content={<TransactionsPage />} />
    </Container>
  </AppProvider>
);

export default App;
