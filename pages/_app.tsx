import LayoutHOC from '../Components/Layout/LayoutHOC';
import {createStore} from 'redux';
import '../styles/global.css';
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import {reducer} from '../models/reducer';

const store = createStore(reducer);

export default function App({Component, pageProps}) {
	return (
			<Provider store={store}>
				<LayoutHOC>
					<Component {...pageProps} />
				</LayoutHOC>
			</Provider>

	)
}