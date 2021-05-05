import * as types from '../duck/app'
import { call, put, takeEvery, takeLatest, StrictEffect, select} from 'redux-saga/effects'
import axios from 'axios'


function* rootSaga(): Generator<StrictEffect>{
    yield takeEvery(types.EXAMPLE, exampleWOrker)
}


function* exampleWOrker(){
    try{
        const exampleData = yield call(exampleFunc)
        yield put({ type: types.EXAMPLE_SUCCES, payload: exampleData})
    }catch(e){
        yield put({ type: types.EXAMPLE_FAIL, payload: e.message})
    }
}


const exampleFunc =  async()=>{
    return axios.get('https://anapioficeandfire.com/api/characters/583')
    .then(res=>res.data)
    .catch(error=>{throw error})
}









export default rootSaga