import styled from 'styled-components'
import Header from '../../elements/Header'
import Content from '../../components/book/Content'

const Wrapper = styled.div`
    padding: 25px 40px;
`

const Book = () => {
    return (
        <Wrapper>
            <Header />
            <Content />
        </Wrapper>
    )
}

export default Book
