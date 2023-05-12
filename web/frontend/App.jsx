import { BrowserRouter } from "react-router-dom";
import { NavigationMenu } from "@shopify/app-bridge-react";
import Routes from "./Routes";
import { store } from "./components/redux/store";

import {
  AppBridgeProvider,
  QueryProvider,
  PolarisProvider,
} from "./components";
import { Provider } from "react-redux";

export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
            <Provider store={store}>
            <NavigationMenu
              navigationLinks={[
                {
                  label: "Form",
                  destination: "/form",
                },
                {
                  label: "Submission",
                  destination: "/submission",
                },
                {
                  label: "Settings",
                  destination: "/settings",
                },
              ]}
            />
            <Routes pages={pages} />
            </Provider>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  );
}
