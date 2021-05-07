import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../redux/duck'
import { useEffect } from 'react'
import styled from 'styled-components'
import CharacterList from '../components/home/CharacterList'
import Header from '../elements/Header'
import Filters from '../components/home/Filters'
import { loadCharacters } from '../redux/duck/app'
import Pagination from '../components/home/Pagination'

const Wrapper = styled.div`
  padding: 25px;
`

const StyledH1 = styled.h1`
  color: white;
  text-align: center;
  margin: 50px 0px;
`

let firstLoad = false

const Home:React.FC = ()=> {
  const error = useSelector((state:AppState)=>state.app.error)
  
  console.log(error)
  
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!firstLoad){
      dispatch(loadCharacters())
      firstLoad = true
    }
  }, [])
  if(error){
    return <StyledH1>Error: {error}</StyledH1>
  }else{
    return (
      <Wrapper>
        <Header />
        <Filters />
        <CharacterList />
        <Pagination />
      </Wrapper>
    )
  }
}


export default Home