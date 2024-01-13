import React from 'react'
import ReactDOM from 'react-dom/client'
import ToDo from './components/todo/todo';
import Login from './components/userRegistration/login';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Login />
  </React.StrictMode>,
)