export const LOAD_CHARACTERS = 'app/load_characters'
export const SET_PAGE = 'app/set_page'
export const SET_PAGE_SIZE = 'app/set_page_size'
export const LOAD_CHARACTERS_SUCCES = 'app/load_characters_succes'
export const LOAD_CHARACTERS_FAIL = 'app/load_characters_fail'


export interface appStateInterface{
    readonly characterList: object[]
    readonly loading: boolean
    readonly page: number
    readonly pageSize: 10,
}

const initialState:appStateInterface={
    characterList: [],
    loading: false,
    page: 1,
    pageSize: 10,
}

const reducer = (state = initialState, action:ActionTypes)=>{
    switch(action.type){
        case LOAD_CHARACTERS:
            return{
                ...state,
                loading: true,
                page: 1
            }
        case SET_PAGE:{
            return{
                ...state,
                loading: true,
                page: action.page
            }
        }
        case SET_PAGE_SIZE:{
            return{
                ...state,
                loading: true,
                pageSize: action.size
            }
        }
        case LOAD_CHARACTERS_SUCCES:{
            return{
                ...state,
                loading: false,
                characterList: action.payload
            }
        }
        case LOAD_CHARACTERS_FAIL:{
            return{
                ...state,
            }
        }
        default: return state
    }
}



export type LoadCharactersType = {type: typeof LOAD_CHARACTERS}
export type LoadCharactersSuccesType = {type: typeof LOAD_CHARACTERS_SUCCES, payload: [{}]}
export type LoadCharactersFailType = {type: typeof LOAD_CHARACTERS_FAIL, payload: string}
export type SetPageType = {type: typeof SET_PAGE, page: number}
export type SetPageSizeType = {type: typeof SET_PAGE_SIZE, size: number}


export const loadCharacters = ():ActionTypes=>({type:LOAD_CHARACTERS})
export const setPage = (page: number):ActionTypes=>({type:SET_PAGE, page})
export const setPageSize = (size: number):ActionTypes=>({type:SET_PAGE_SIZE, size})

export type ActionTypes = LoadCharactersType | LoadCharactersSuccesType | LoadCharactersFailType | SetPageType | SetPageSizeType

export default reducer