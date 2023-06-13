import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './component/header';
import 'bootstrap/dist/css/bootstrap.min.css';

const container = document.getElementById('header');
const header = createRoot(container);
header.render(<Header compiler="TypeScript" framework="React" />);