import React from 'react';
import { createRoot } from 'react-dom/client';
import { Header } from './component/header';

const container = document.getElementById('header');
const header = createRoot(container);
header.render(<Header compiler="TypeScript" framework="React" />);