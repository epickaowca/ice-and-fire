import styled from 'styled-components'
import CharacterList from '../components/home/CharacterList'
import Header from '../elements/Header'
import Filters from '../components/home/Filters'

const Wrapper = styled.div`
  padding: 25px;
`

const Home:React.FC = ()=> {
  return (
    <Wrapper>
      <Filters />
      {/* <Header /> */}
      {/* <CharacterList /> */}
    </Wrapper>
    )
}


export default Home