import CharacterItem from './CharacterItem'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/duck'

const Wrapper = styled.section`
    color: white;
    margin: auto;
    margin-top: 50px;
    display: flex;
    max-width: 1400px;
    flex-wrap: wrap;
    justify-content: center;
    ${p=>p.theme.media.tablet}{
        margin-top: 70px;
    }
`

const CharacterList:React.FC = () => {
  const characterList = useSelector((state:AppState)=>state.app.characterList)
  const loading = useSelector((state:AppState)=>state.app.loading)
    return (
        <Wrapper>
            {loading ? <h1>Loading</h1> : characterList.length ? characterList.map((elem, index)=><CharacterItem key={index} props={elem} />) : <h1>no result found</h1>}
        </Wrapper>
    )
}

export default CharacterList
