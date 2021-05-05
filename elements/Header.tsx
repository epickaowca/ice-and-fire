import styled from 'styled-components'

const StyledHeader = styled.header`
    padding: 25px 0px;
    display: flex;
    justify-content: center;
    & > h1{
        &:nth-child(1){
            color: ${p=>p.theme.colors.fireColor};
        }
        &:nth-child(2){
            margin: 0px 20px;
            color: white;
        }
        &:nth-child(3){
            color: ${p=>p.theme.colors.iceColor};
        }
    }
    ${p=>p.theme.media.desktop}{
        padding: 45px 0px;
        & > h1{
            font-size: 3rem;
        }
    }
`

const Header:React.FC = () => {
    return (
        <StyledHeader>
            <h1>Fire</h1>
            <h1>And</h1>
            <h1>Ice</h1>
        </StyledHeader>
    )
}

export default Header
