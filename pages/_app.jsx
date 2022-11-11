import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import AuthCheck from "../components/auth/AuthCheck";
import AdminNav from "../components/AdminNav";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AdminNav />
      <AuthCheck>
        <Component {...pageProps} />
      </AuthCheck>
    </Provider>
  );
}

export default MyApp;
