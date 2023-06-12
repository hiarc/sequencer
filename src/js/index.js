import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './component/header.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Header />);