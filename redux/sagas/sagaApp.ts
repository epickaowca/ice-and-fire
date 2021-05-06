import * as types from '../duck/app'
import { call, put, takeEvery, takeLatest, StrictEffect, select} from 'redux-saga/effects'
import axios from 'axios'
import { ActionTypes } from '../duck/app'
import { AppState } from '../duck'

const preUrl = 'https://anapioficeandfire.com/api/characters' 

function* rootSaga(): Generator<StrictEffect>{
    yield takeEvery(types.LOAD_CHARACTERS, GrabCharacters)
    yield takeEvery(types.SET_PAGE, GrabCharacters)
    yield takeEvery(types.SET_PAGE_SIZE, GrabCharacters)
}


function* GrabCharacters(payload:ActionTypes){
    const pageSize =  yield select((state:AppState)=>state.app.pageSize)
    const currentPage =  yield select((state:AppState)=>state.app.page)
    try{
        const res = yield call(()=>fetchData(payload, pageSize, currentPage))
        yield put({ type: types.LOAD_CHARACTERS_SUCCES, payload: res})
    }catch(e){
        yield put({ type: types.LOAD_CHARACTERS_FAIL, payload: e.message})
    }
}


const fetchData =  async(payload:ActionTypes, pageSize, currentPage)=>{
    let url = ''
    if(payload.type === types.LOAD_CHARACTERS){
        url = `${preUrl}?pageSize=${pageSize}`
    }else if(payload.type === types.SET_PAGE){
        url = `${preUrl}?page=${payload.page}&pageSize=${pageSize}`
    }else if(payload.type === types.SET_PAGE_SIZE){
        url = `${preUrl}?page=${currentPage}&pageSize=${payload.size}`
    }
    return axios.get(url)
    .then(res=>res.data)
    .catch(error=>{throw error})
}









export default rootSaga