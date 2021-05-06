import styled from 'styled-components'
import Header from '../../elements/Header'
import Content from '../../components/book/Content'
import axios from 'axios'

const Wrapper = styled.div`
    padding: 25px 40px;
`


const Book = ({book}) => {
    return (
        <Wrapper>
            <Header />
            <Content props={book} />
        </Wrapper>
    )
}

export const getStaticProps = async(context)=>{
    const res = await axios(`https://anapioficeandfire.com/api/books/${context.params.id}`)
    const book = res.data

    return{
        props:{
            book
        }
    }
}
export const getStaticPaths = async()=>{
    const res = await axios(`https://anapioficeandfire.com/api/books?pageSize=100`)
    const books = res.data
    const ids = books.map((elem,index)=>index+1)
    const paths = ids.map(elem=>({params: {id: elem.toString()}}))

    return{
        paths,
        fallback: false
    }

}


export default Book
