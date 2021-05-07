import * as types from '../duck/app'
import { call, put, takeEvery, StrictEffect, select} from 'redux-saga/effects'
import axios from 'axios'
import { ActionTypes } from '../duck/app'
import { AppState } from '../duck'

const preUrl = 'https://anapioficeandfire.com/api/characters' 

function* rootSaga(): Generator<StrictEffect>{
    yield takeEvery(types.LOAD_CHARACTERS, GrabCharacters)
    yield takeEvery(types.SET_PAGE, GrabCharacters)
    yield takeEvery(types.SET_PAGE_SIZE, GrabCharacters)
    yield takeEvery(types.SET_FILTERS, GrabCharacters)
}


function* GrabCharacters(payload:ActionTypes){
    const alreadyFetchedPages =  yield select((state:AppState)=>state.app.characterList)
    const pageSize =  yield select((state:AppState)=>state.app.pageSize)
    const filters =  yield select((state:AppState)=>state.app.filters)
    try{
        const res = yield call(()=>fetchData(payload, pageSize, alreadyFetchedPages, filters))
        yield put({ type: types.LOAD_CHARACTERS_SUCCES, payload: res})
    }catch(e){
        yield put({ type: types.LOAD_CHARACTERS_FAIL, payload: e.message})
    }
}


const fetchData =  async(payload:ActionTypes, pageSize, alreadyFetchedPages, storeFilters)=>{
    const helperObject = {pageH: 1, resetPages: false, alreadyThere: false, lastPageR: false, pageSizeH: pageSize, nameH: '', genderH: ''}
    let {pageH, resetPages, alreadyThere, lastPageR, pageSizeH, nameH, genderH} = helperObject

    //set the variables depending on the type of action
    if(payload.type === types.LOAD_CHARACTERS){
        lastPageR = true

    }else if(payload.type === types.SET_PAGE){

        pageH = payload.page
        const alreadyFetchedPagesH = Object.keys(alreadyFetchedPages)
        if(alreadyFetchedPagesH.includes(pageH.toString())) alreadyThere = true

    }else if(payload.type === types.SET_PAGE_SIZE){

        resetPages = true
        lastPageR = true
        pageSizeH = payload.size
        nameH = storeFilters.name
        genderH = storeFilters.gender

    }else if(payload.type == types.SET_FILTERS){

        const {name, gender} = payload.filters
        resetPages = true
        lastPageR = true
        nameH = name
        genderH = gender
    }

    //use variables to create url
    const url = `${preUrl}?page=${pageH}&pageSize=${pageSizeH}&name=${nameH}&gender=${genderH}`
    if(alreadyThere){
        //prevent fetch if page already fetched
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
                lastPage = +arrHLast.slice(index1, index2)
            }
            const resData = {val:res.data, page:pageH, resetPages, lastPage}
            return resData
        })
        .catch(error=>{throw error})
    }
}







export default rootSaga





