import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createServer, Model } from 'miragejs';

createServer({
  models: {
    transaction: Model
  },

  seeds(server){
    server.db.loadData({
      transactions: [
        {
          id: 1,
          type: 'deposit',
          category: 'developer',
          title: 'Freelancer site',
          amount: 5000,
          createdAt: new Date('2022-03-20 09:00:00')
        },
        {
          id: 2,
          type: 'withdraw',
          category: 'home',
          title: 'Aluguel',
          amount: 1200,
          createdAt: new Date('2022-03-10 15:00:00')
        }
      ],
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data)
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);