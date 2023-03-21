import { createRoot } from 'react-dom/client';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from 'store';

import App from 'App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThirdwebProvider activeChain="goerli">
        <App />
      </ThirdwebProvider>
    </PersistGate>
  </ReduxProvider>
);
