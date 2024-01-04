import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import { AuthProvider } from './context/AuthProvider.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
    <AuthProvider>
   <Routes>
    <Route path='/*' element={ <App />}/>
   </Routes>
    </AuthProvider>
        </Theme>
    </BrowserRouter>
)
