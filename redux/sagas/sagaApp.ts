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
    const alreadyFetchedPages =  yield select((state:AppState)=>state.app.characterList)
    const pageSize =  yield select((state:AppState)=>state.app.pageSize)
    try{
        const res = yield call(()=>fetchData(payload, pageSize, alreadyFetchedPages))
        yield put({ type: types.LOAD_CHARACTERS_SUCCES, payload: res})
    }catch(e){
        yield put({ type: types.LOAD_CHARACTERS_FAIL, payload: e.message})
    }
}


const fetchData =  async(payload:ActionTypes, pageSize, alreadyFetchedPages)=>{
    let url = ''
    let pageH
    let resetPages = false
    let alreadyThere = false
    let lastPageR = false
    if(payload.type === types.LOAD_CHARACTERS){
        url = `${preUrl}?pageSize=${pageSize}`
        pageH = 1
        lastPageR = true
    }else if(payload.type === types.SET_PAGE){
        url = `${preUrl}?page=${payload.page}&pageSize=${pageSize}`
        pageH = payload.page
        const alreadyFetchedPagesH = Object.keys(alreadyFetchedPages)
        if(alreadyFetchedPagesH.includes(pageH.toString())) alreadyThere = true
    }else if(payload.type === types.SET_PAGE_SIZE){
        url = `${preUrl}?page=1&pageSize=${payload.size}`
        pageH = 1
        resetPages = true
        lastPageR = true
    }
    if(alreadyThere){
        return {alreadyThere}
    }else{
        return axios.get(url)
        .then(res=>{
            let lastPage
            if(lastPageR){
                let arrH = res.headers.link.split(',')
                let arrHLast = arrH[arrH.length-1] 
                let index1 = arrHLast.indexOf('page=')+5
                let index2 = arrHLast.indexOf('&pageSize')
                lastPage = arrHLast.slice(index1, index2)
            }
            const resData = {val:res.data, page:pageH, resetPages, lastPage}
            return resData
        })
        .catch(error=>{throw error})
    }
}









export default rootSaga