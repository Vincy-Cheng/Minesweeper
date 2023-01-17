import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store, persistor } from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import CustomText from './src/components/CustomText';
import Navigation from './src/layout/Navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate
          loading={<CustomText content={'Loading ...'} />}
          persistor={persistor}
        >
          <Navigation />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
