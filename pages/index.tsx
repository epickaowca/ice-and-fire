import styled from 'styled-components'
import CharacterList from '../components/home/CharacterList'
import Header from '../elements/Header'

const Wrapper = styled.div`

`

const Home:React.FC = ()=> {
  return (
    <Wrapper>
      <Header />
      {/* <CharacterList /> */}
    </Wrapper>
    )
}


export default Home