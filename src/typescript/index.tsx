import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '/src/css/bootstrap-customize.css';
import '/src/css/sequenser.css';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Layout } from './layout';

const container = document.getElementById('container');
const header = createRoot(container);

header.render(
  <StrictMode>
    <Layout />
  </StrictMode>
);