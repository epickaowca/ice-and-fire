import { useDispatch, useSelector } from 'react-redux'
import { setPage, setPageSize } from '../../redux/duck/app'
import { AppState } from '../../redux/duck'
import styled from 'styled-components'

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 50px 15px;
    & > button {
        padding: 15px;
        margin: 15px;
        cursor: pointer;
    }
    & > div{
        & > p{
            color: white;
        }
    }
`

const Pagination:React.FC = () => {
    const dispatch = useDispatch()
    const currentPageH = useSelector((state:AppState)=>state.app.page)
    const lastPossiblePage = useSelector((state:AppState)=>state.app.lastPossiblePage)
    const clickHandler = (option)=>{
        if(option === 'previous'){
            if(currentPageH !== 1) {
                dispatch(setPage(currentPageH-1))
            }
        }else if(option === 'next'){
            if(currentPageH !== +lastPossiblePage){
                dispatch(setPage(currentPageH+1))
            }
        }else if(option === 'last'){
            if(currentPageH !== lastPossiblePage){
                dispatch(setPage(lastPossiblePage))
            }
        }else if(option === 'first'){
            if(currentPageH !== 1){
                dispatch(setPage(1))
            }
        }
    }
    return (
        <Wrapper>
            <button onClick={()=>clickHandler('first')}>first</button>
            <button onClick={()=>clickHandler('previous')}>previous</button>
            <button onClick={()=>clickHandler('next')}>next</button>
            <button onClick={()=>clickHandler('last')}>last</button>
            <div>
                <p>number of results per page</p>
                <select defaultValue={10} onChange={e=>dispatch(setPageSize(+e.target.value))}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
            </div>
        </Wrapper>
    )
}

export default Pagination
