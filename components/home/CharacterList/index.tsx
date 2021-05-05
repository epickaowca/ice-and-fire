import CharacterItem from './CharacterItem'
import styled from 'styled-components'

const Wrapper = styled.section`
    padding: 25px;
`

const CharacterList:React.FC = () => {
    return (
        <Wrapper>
            <CharacterItem />
        </Wrapper>
    )
}

export default CharacterList
