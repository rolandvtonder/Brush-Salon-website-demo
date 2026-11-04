import {StrictMode, type ReactNode} from 'react';
import {createRoot} from 'react-dom/client';
import type {PageId} from '../content';
import {Layout} from '../components/Layout';
import '../index.css';

/** Every page entry renders through the shared layout. */
export function mount(page: PageId, children: ReactNode) {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Layout page={page}>{children}</Layout>
    </StrictMode>,
  );
}
