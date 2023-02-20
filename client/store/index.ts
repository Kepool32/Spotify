// create a makeStore function
import {AnyAction, applyMiddleware, createStore, Store} from "redux";
import {State} from "@mui/system/cssVars/useCurrentColorScheme";
import {Context, createWrapper, MakeStore} from "next-redux-wrapper";
import {reducer, RootState} from "@/store/reducers";
import thunk, {ThunkDispatch} from "redux-thunk";


const makeStore = (context: Context) => createStore(reducer,applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});


export type NextThunkDispatch=ThunkDispatch<RootState, void, AnyAction>

/*

const makeStore = () => createStore(rootReducer);

// export an assembled wrapper
export const wrapper = createWrapper(makeStore, {debug: true});*/
