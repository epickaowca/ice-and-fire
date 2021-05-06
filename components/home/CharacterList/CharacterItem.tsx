import styled from 'styled-components'
import GenderIco from '../../../public/asset/gender.svg'
import Culture from '../../../public/asset/culture.svg'
import Book from '../../../public/asset/book.svg'
import Link from 'next/link'

const Wrapper = styled.article`
    max-width: 350px;
    background-color: ${p=>p.theme.colors.backgroundColor};
    border-radius: 15px;
    color: white;
    padding: 20px;
    padding-top: 40px;
    margin: 25px 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    & > h2{
        margin: 17px 0px;
        font-weight: 400;
    }
    & > p{
        &:nth-child(1){
            position: absolute;
            left: 20px;
            top: 20px;
        }
        &:nth-child(3){
            color: rgba(255,255,255,.7);
        }
        &:last-child{
            color: rgba(255,255,255,.7);
            & > span{
                color: white;
            }
        }
    }
    ${p=>p.theme.media.tablet}{
        margin: 25px;
        max-width: 400px;
        & > p{
            &:nth-child(3){
                width: 360px;
            }
            &:first-child{
                text-align: left;
            }
        }
        text-align: center;
    }
`

const StyledSection = styled.section`
    margin: 25px 0px;
    & > div{
        display: flex;
        align-items: center;
        margin: 25px 0px;
        & > div{
            width: 67px;
            display: flex;
            & > svg{
                margin: auto;
            }
        }
        & > p{
            margin-left: 35px;
        }
        &:nth-child(3){
            & > p{
                & > a{
                    color: ${p=>p.theme.colors.iceColor};
                    &:hover{
                        color: white;
                    }
                }
            }
        }
    }
    ${p=>p.theme.media.tablet}{
        padding: 0px 20px;
        margin: 20px 0px;
        display: flex;
        justify-content: space-between;
        & > div{
            flex-direction: column;
            & > p{
                margin-left: 0px;
                margin-top: 25px;
            }
            & > div{
                width: auto;
                height: 63px;
            }
        }
    }
`

interface RFInterface {
    props: string
}


const CharacterItem:React.FC<RFInterface> = ({props}) => {
    return (
        <Wrapper>
            <p>582</p>
            <h2>Name and aliases</h2>
            <p>{props}</p>
            <StyledSection>
                <div>
                    <div>
                        <GenderIco />
                    </div>
                    <p>Male</p>
                </div>
                <div>
                    <div>
                        <Culture />
                    </div>
                    <p>Northmen</p>
                </div>
                <div>
                    <div>
                        <Book />
                    </div>
                    <p>
                        <Link href="#">5, </Link>
                        <Link href="#">6, </Link>
                        <Link href="#">8 </Link>
                    </p>
                </div>
            </StyledSection>
            <p>
                the number of seasons of the series:
                <span> 6</span>
            </p>
        </Wrapper>
    )
}

export default CharacterItem
