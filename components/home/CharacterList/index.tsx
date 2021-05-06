import CharacterItem from './CharacterItem'
import styled from 'styled-components'

const Wrapper = styled.section`
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
    return (
        <Wrapper>
            <CharacterItem props="Jon Snow, Lord Snow, Ned Stark's Bastard, The Snow of Winterfell, The Crow-Come-Over, The 998th Lord Commander of the Night's Watch, The Bastard of Winterfell, The Black Bastard of the Wall, Lord Crow" />
            <CharacterItem props="Jon Snow, Lord Snow," />
            <CharacterItem props="Jon Snow, Lord Snow, Ned Stark's Bastard, The Snow of Winterfell, The Crow-Come-Over,"/>
            <CharacterItem props="Jon Snow,"/>
            <CharacterItem props="Jon Snow, Lord Snow, Ned Stark's Bastard, The Snow of Winterfell, The Crow-Come-Over, The 998th Lord Commander of the Night's Watch, The Bastard of Winterfell"/>
            <CharacterItem props='Jon'/>
        </Wrapper>
    )
}

export default CharacterList
