import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import AuthCheck from "../components/auth/AuthCheck";
import { toast, Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthCheck>
        <div>
          <Toaster
            position="top-left"
            reverseOrder={false}
            toastOptions={{
              loading: {
                className: "",
                duration: 5000,
                style: {
                  // background: "#2563eb",
                  height: 48,
                  color: "#6c757d",
                },
              },

              error: {
                duration: 5000,
              },
            }}
          />
        </div>
        <Component {...pageProps} />
      </AuthCheck>
    </Provider>
  );
}

export default MyApp;
