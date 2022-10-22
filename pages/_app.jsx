import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import AuthCheck from "../components/auth/AuthCheck";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </Provider>
  );
}

export default MyApp;
