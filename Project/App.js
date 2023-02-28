import { LogBox } from "react-native";
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
  "Reanimated 2",
  "EventEmitter.removeListener",
]);
import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Root from "./src/routes/Root_Stack";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { QueryClientProvider, QueryClient } from "react-query";

import { Provider } from "react-redux";
import store from "./src/redux/store";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import "./src/i18n";
// import appTheme from "./src/theme";

function App({ navigation }) {
  let persistor = persistStore(store);
  const queryClient = new QueryClient();
  return (
    <PaperProvider  >
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <BottomSheetModalProvider>
                  <Root navigation={navigation} />
                </BottomSheetModalProvider>
              </PersistGate>
            </Provider>
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
export default App;
