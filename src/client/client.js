import {render} from 'react-dom';
import React from 'react';
import {cashay} from 'cashay';
import ActionHTTPTransport from 'universal/utils/ActionHTTPTransport';
import makeStore from './makeStore';
import Root from './Root';
import {StyleSheet} from 'aphrodite-local-styles/no-important';
import cashaySchema from 'cashay!../server/utils/getCashaySchema.js'; // eslint-disable-line

// const {routing} = window.__INITIAL_STATE__;
const initialState = {};

(async () => {
  const store = await makeStore(initialState);
  // Create the Cashay singleton:
  const persistedToken = store.getState().auth.token;
  cashay.create({
    store,
    schema: cashaySchema,
    httpTransport: new ActionHTTPTransport(persistedToken)
  });
  if (__PRODUCTION__) {
    StyleSheet.rehydrate(window.__APHRODITE__);
    render(
      <Root store={store} />,
      document.getElementById('root')
    );
  } else {
    // eslint-disable-next-line global-require
    const {AppContainer} = require('react-hot-loader'); // eslint-disable-line import/no-extraneous-dependencies
    // ENABLE THIS FOR EXPLORING FRONT END PERFORMANCE
    // const {whyDidYouUpdate} = require('why-did-you-update');
    // whyDidYouUpdate(React);
    render(
      <AppContainer>
        <Root store={store} />
      </AppContainer>,
      document.getElementById('root')
    );

    if (module.hot) {
      /* eslint-disable global-require, no-shadow */
      module.hot.accept('./Root', () => {
        const Root = require('./Root').default;
        render(
          <AppContainer>
            <Root store={store} />
          </AppContainer>,
          document.getElementById('root')
        );
        /* eslint-enable global-require */
      });
    }
  }
})();
