import { Provider as ReduxProvider } from 'react-redux';
import store from "../stores/store";

const Providers = ({ children }) => (
  <ReduxProvider store={store}>
    {children}
  </ReduxProvider>
);

export default Providers;
