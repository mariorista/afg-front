import "../styles/globals.css";
import { Provider } from "react-redux";
import store from "./store";

import { StrictMode } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <StrictMode>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </StrictMode>
  );
}

export default MyApp;
