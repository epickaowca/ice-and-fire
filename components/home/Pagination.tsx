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
    const currentPage = useSelector((state:AppState)=>state.app.page)

    const clickHandler = (option)=>{
        if(option === 'previous'){
            if(currentPage !== 1) {
                dispatch(setPage(currentPage-1))
            }
        }else{
            dispatch(setPage(currentPage+1))
        }
    }
    return (
        <Wrapper>
            <button onClick={()=>clickHandler('previous')}>previous</button>
            <button onClick={()=>clickHandler('next')}>next</button>
            <div>
                <p>number of results per page</p>
                <select onChange={e=>dispatch(setPageSize(+e.target.value))}>
                    <option value={5}>5</option>
                    <option selected value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                </select>
            </div>
        </Wrapper>
    )
}

export default Pagination
