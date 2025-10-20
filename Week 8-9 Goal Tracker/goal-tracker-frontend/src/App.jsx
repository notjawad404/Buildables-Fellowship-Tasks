import { Provider } from "react-redux";
import { store } from "./app/store";
import Home from "./pages/Home";

export default function App() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
