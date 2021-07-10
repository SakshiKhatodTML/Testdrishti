import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga"
import rootReducer from "../redux/reducer"
import rootSaga from "../redux/saga";


function configureStore(){
    const sagaMiddleware = createSagaMiddleware()

    const appliedMiddlewares = applyMiddleware(sagaMiddleware);

    const middleware = composeWithDevTools(appliedMiddlewares);

    const store = createStore(rootReducer, middleware);

    sagaMiddleware.run(rootSaga);

    return store;
}

export default configureStore;