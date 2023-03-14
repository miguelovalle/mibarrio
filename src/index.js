//import ReactDOM from 'react-dom';
import React from 'react';
import { MiBarrio } from './MiBarrio';

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

//ReactDOM.render(<MiBarrio />, container);
const root = createRoot(container);

root.render(<MiBarrio />);
