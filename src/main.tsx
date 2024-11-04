import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AppProvider } from "./context/app/App-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./store/store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider>
    <Provider store={store}>
      <App />
      </Provider>
    </AppProvider>
  </QueryClientProvider>
);
