import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

//Recoil 
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </RecoilRoot>
  )
}

export default MyApp
