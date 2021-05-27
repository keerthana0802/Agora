import { asyncLocalStorage } from 'redux-persist/storages';
import { persistStore } from 'redux-persist';
import ReduxPersist from '../Config/ReduxPersist';
import { Creators as StartupCreators } from '../Redux/StartupRedux';

const updateReducers = (store: Object) => {
  const { reducerVersion } = ReduxPersist;
  const config = ReduxPersist.storeConfig;
  const startup = () => store.dispatch(StartupCreators.startup());

  // Check to ensure latest reducer version
  asyncLocalStorage
    .getItem('reducerVersion')
    .then((localVersion) => {
      if (localVersion !== reducerVersion) {
        console.tron.display({
          name: 'sparkstudio',
          value: {
            'Old Version:': localVersion,
            'New Version:': reducerVersion
          },
          preview: 'Reducer Version Change Detected',
          important: true
        });
        // Purge store
        persistStore(store, config, startup).purge();
        asyncLocalStorage.setItem('reducerVersion', reducerVersion);
      } else {
        persistStore(store, config, startup);
      }
    })
    .catch(() => {
      persistStore(store, config, startup).purge();
      asyncLocalStorage.setItem('reducerVersion', reducerVersion);
    });
};

export default { updateReducers };
