import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styled from 'styled-components'
import CharacterList from '../components/home/CharacterList'
import Header from '../elements/Header'
import Filters from '../components/home/Filters'
import { loadCharacters } from '../redux/duck/app'
import Pagination from '../components/home/Pagination'
import { AppState } from '../redux/duck'

const Wrapper = styled.div`
  padding: 25px;
`

let firstLoad = false

const Home:React.FC = ()=> {
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!firstLoad){
      dispatch(loadCharacters())
      firstLoad = true
    }
  }, [])

  return (
    <Wrapper>
    <Header />
    <Filters />
    <CharacterList />
    <Pagination />
    </Wrapper>
  )
}


export default Home