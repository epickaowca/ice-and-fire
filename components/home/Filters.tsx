import styled from 'styled-components'

const Wrapper = styled.form`
display: flex;
flex-direction: column;
margin: auto;
max-width: 280px;
& > input, & > select{
    background-color: ${p=>p.theme.colors.backgroundColor};
    border: 1px solid #494E6E;
    padding: 15px;
    color: white;
    height: 50px;
}
& > select{
    margin-top: 25px;
}
${p=>p.theme.media.tablet}{
    flex-direction: row;
    max-width: 400px;
    & > input{
        width: 250px;
    }
    & > select{
        width: 125px;
        margin-top: 0px;
        margin-left: 25px;
    }
}
${p=>p.theme.media.desktop}{
    max-width: 500px;
    & > input, & > select{
        font-size: 1rem;
    }
    & > input{
        width: 350px;
    }
}
`

const Filters:React.FC = () => {
    return (
        <Wrapper>
            <input placeholder='name' type='text' />
            <select>
                <option value='all'>gender</option>
                <option value='male'>male</option>
                <option value='female'>female</option>
            </select>
        </Wrapper>
    )
}

export default Filters
