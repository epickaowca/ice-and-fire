import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './duck'
import createSagaapplyMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaapplyMiddleware()

export type AppState = ReturnType<typeof reducer>

const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store