export const EXAMPLE = 'app/example'
export const EXAMPLE_SUCCES = 'app/example_succes'
export const EXAMPLE_FAIL = 'app/example_fail'


export interface appStateInterface{
    readonly example: string
    readonly exampleSaga: any
}

const initialState:appStateInterface={
    example: '',
    exampleSaga: '',
}

const reducer = (state = initialState, action:ActionTypes)=>{
    switch(action.type){
        case EXAMPLE:
            return{
                ...state,
                example: action.payload
            }
        case EXAMPLE_SUCCES:{
            return{
                ...state,
                exampleSaga: action.payload
            }
        }
        default: return state
    }
}



export type ExampleType = {type: typeof EXAMPLE, payload: string}
export type ExampleSuccesType = {type: typeof EXAMPLE_SUCCES, payload: any}
export type ExampleFailType = {type: typeof EXAMPLE_SUCCES, payload: any}


export const setExample = (payload):ActionTypes=>({type:EXAMPLE, payload})

export type ActionTypes = ExampleType | ExampleSuccesType | ExampleFailType

export default reducer