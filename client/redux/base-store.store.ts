import { createStore } from "redux";
import rootReducer from "./reducers/root.reducer";
import { MakeStore, createWrapper, Context } from 'next-redux-wrapper';

// create a makeStore function
const makeStore: MakeStore<any> = (context: Context) => createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper<any>(makeStore, {debug: true});
