import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'

const Wrapper = styled.section`
    margin-top: 25px;
    & > div{
        color: white;
        &:nth-child(1){
            & > p{
                margin: 15px auto;
                max-width: 300px;
            }
            & > h1{
                margin: auto;
                max-width: 300px;
            }
        }
        &:nth-child(2){
            display: none !important;
        }
    }

    ${p=>p.theme.media.tablet}{
        max-width: 700px;
        margin: auto;
        margin-top: 45px;
        display: flex;
        flex-direction: column;
        & > div{
            &:nth-child(1){
                & > h1{
                    max-width: unset;
                    margin: unset;
                }
                & > p{
                    margin: 15px 0px;
                }
            }
            &:nth-child(2){
                display: block !important;
                max-width: 700px !important;
                margin: auto !important;
                margin-top: 45px !important;
            }
        }
    }
    ${p=>p.theme.media.desktop}{
        margin-top: 100px;
        max-width: unset;
        flex-direction: row;
        justify-content: center;
        & > div{
            &:nth-child(1){
                & > h1{
                    font-size: 3rem;
                }
                & > p{
                    font-size: 1.1rem;
                    max-width: 400px;
                }
            }
            &:nth-child(2){
                margin: unset !important;
            }
        }
    }
`
const StyledSection = styled.section`
    margin: 35px auto;
    max-width: 300px;
    & > div{
        margin: 25px 0px;
        & > p{
            &:nth-child(1){
                color: rgba(255,255,255,.7);
            }
        }
    }
    ${p=>p.theme.media.tablet}{
        max-width: unset;   
        & > div{
            display: flex;
            & > p{
                &:nth-child(1){
                    width: 150px;
                    margin-right: 100px;
                }
            }
        }
    }
    ${p=>p.theme.media.desktop}{
        margin: 45px auto;
        & > div{
            & > p{
                font-size: 1.2rem;
                &:nth-child(1){
                    width: 200px;
                }
            }
        }
    }
`


const Content = ({props}) => {
    const dateH = new Date(props.released)
    const { authors, mediaType, publisher, country, name, isbn, numberOfPages } = props
    return (
        <Wrapper>
            <div>
                <h1>{name}</h1>
                <StyledSection>
                    <div>
                        <p>ISBN:</p>
                        <p>{isbn}</p>
                    </div>
                    <div>
                        <p>number of pages:</p>
                        <p>{numberOfPages}</p>
                    </div>
                    <div>
                        <p>released:</p>
                        <p>{dateH.toString().slice(4,15)}</p>
                    </div>
                </StyledSection>
                <p>{authors.map(elem=>`${elem}, `)}</p>
                <p>{mediaType}</p>
                <p>{publisher}</p>
                <p>{country}</p>
            </div>
            <Image src='/asset/bookImg.svg' width={1036} height={569.97133} />
        </Wrapper>
    )
}

export default Content
