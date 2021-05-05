import { all } from 'redux-saga/effects'
import sagaApp from './sagaApp'

export default function* rootSaga(){
    yield all(([
        sagaApp()
    ]))
}