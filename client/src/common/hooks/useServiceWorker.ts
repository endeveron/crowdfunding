import { useEffect, useState } from 'react';

import { useSnackbar } from 'components';
import * as serviceWorker from '../../serviceWorker';
import { useAppSelector } from 'store';
import { selectSnackbarAction } from 'store/ui';

// With this React Hook we'll be able to access `isUpdateAvailable` and `updateAssets`
export const useServiceWorker = () => {
  const { showSnackbar } = useSnackbar();
  const snackbarAction = useAppSelector(selectSnackbarAction);

  const [waitingServiceWorker, setWaitingServiceWorker] =
    useState<ServiceWorker | null>(null);

  // Show a snackbar
  useEffect(() => {
    serviceWorker.register({
      onUpdate: (registration) => {
        console.log('A new version available.');
        setWaitingServiceWorker(registration.waiting);
        showSnackbar({
          message: 'A new version available.',
          btnTitle: 'Update',
        });
      },
    });
  }, []); // eslint-disable-line

  // Update assets
  useEffect(() => {
    if (waitingServiceWorker && snackbarAction === 'updateApp') {
      // Send the SKIP_WAITING message to tell the Service Worker
      // to update its cache and flush the old one
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }, [snackbarAction, waitingServiceWorker]);

  // Automatically reload the page
  useEffect(() => {
    // Setup an event listener to automatically reload the page
    // after the Service Worker has been updated, this will trigger
    // on all the open tabs of our application, so that we don't leave
    // any tab in an incosistent state
    waitingServiceWorker?.addEventListener('statechange', (event) => {
      const sw = event?.target as ServiceWorker;
      if (sw?.state === 'activated') {
        window.location.reload();
      }
    });
  }, [waitingServiceWorker]);
};
