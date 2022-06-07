import LayoutHOC from '../src/Components/Layout/LayoutHOC';
import '../styles/global.css';
import 'antd/dist/antd.css';
import {Provider} from "react-redux";
import store, { persistor } from "../src/store";
import { PersistGate } from 'redux-persist/integration/react';


export default function App({Component, pageProps}) {
	return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor} >
					<LayoutHOC>
						<Component {...pageProps} />
					</LayoutHOC>
				</PersistGate>
			</Provider>
	)
}