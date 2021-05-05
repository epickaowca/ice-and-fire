import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from '../redux/duck'
import { setExample } from '../redux/duck/app'

const Wrapepr = styled.div`
  background:${p=>p.theme.colors.backgroundColor}
  & > h1{
    color: green;
  }
  & > p{
    &:nth-child(2){
      color: ${p=>p.theme.colors.fireColor}
    }
    &:nth-child(4){
      color: ${p=>p.theme.colors.iceColor}
    }
  }
`

export default function Home() {
  const state = useSelector((state:AppState)=>state.app)
  const dispatch = useDispatch()
  console.log(state)
  
  return (
    <Wrapepr>
      <h1 onClick={()=>dispatch(setExample('example'))}>h1@@@@@@@@@@</h1>
      <p>Fire</p>
      <p>And</p>
      <p>Ice</p>
    </Wrapepr>
    )
}
