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
    & > h1{
        color: white;
    }
    ${p=>p.theme.media.tablet}{
        margin-top: 70px;
    }
`

const CharacterList:React.FC = () => {
    const characterList = useSelector((state:AppState)=>state.app.characterList)
    const loading = useSelector((state:AppState)=>state.app.loading)
    const page = useSelector((state:AppState)=>state.app.page)
    if(loading){
        return <Wrapper><h1>Loading</h1></Wrapper>
    }
    if(characterList[page]){
        return (
            <Wrapper>
                {characterList[page].length ? characterList[page].map((elem, index)=><CharacterItem key={index} props={elem} />) : <h1>no result found</h1>}
            </Wrapper>
        )
    }else{
        return (
            <Wrapper>
                <h1>Page not found</h1>
            </Wrapper>
        )
    }
}

export default CharacterList
