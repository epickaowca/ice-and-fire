import styled from 'styled-components'
import CharacterList from '../components/home/CharacterList'

const Wrapper = styled.div`

`

const Home:React.FC = ()=> {
  return (
    <Wrapper>
          <CharacterList />
    </Wrapper>
    )
}


export default Home