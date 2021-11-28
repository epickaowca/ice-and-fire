import { useSelector } from "react-redux";
import styled from "styled-components";
import GenderIco from "../../../public/asset/gender.svg";
import Culture from "../../../public/asset/culture.svg";
import Book from "../../../public/asset/book.svg";
import Link from "next/link";

const Wrapper = styled.article`
  max-width: 350px;
  background-color: ${(p) => p.theme.colors.backgroundColor};
  border-radius: 15px;
  color: white;
  padding: 20px;
  padding-top: 40px;
  margin: 25px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  & > h2 {
    margin: 17px 0px;
    font-weight: 400;
  }
  & > p {
    &:nth-child(1) {
      position: absolute;
      left: 20px;
      top: 20px;
    }
    &:nth-child(3) {
      color: rgba(255, 255, 255, 0.7);
    }
    &:last-child {
      color: rgba(255, 255, 255, 0.7);
      & > span {
        color: white;
      }
    }
  }
  ${(p) => p.theme.media.tablet} {
    margin: 25px;
    max-width: 400px;
    & > p {
      &:nth-child(3) {
        width: 360px;
      }
      &:first-child {
        text-align: left;
      }
    }
    text-align: center;
  }
`;

const StyledSection = styled.section`
  margin: 25px 0px;
  & > div {
    display: flex;
    align-items: center;
    margin: 25px 0px;
    & > div {
      width: 67px;
      display: flex;
      & > svg {
        margin: auto;
      }
    }
    & > p {
      margin-left: 35px;
    }
    &:nth-child(3) {
      & > p {
        & > a {
          color: ${(p) => p.theme.colors.iceColor};
          &:hover {
            color: white;
          }
        }
      }
    }
  }
  ${(p) => p.theme.media.tablet} {
    padding: 0px 20px;
    margin: 20px 0px;
    display: flex;
    justify-content: space-between;
    & > div {
      flex-direction: column;
      & > p {
        margin-left: 0px;
        margin-top: 25px;
      }
      & > div {
        width: auto;
        height: 63px;
      }
    }
  }
`;

const CharacterItem = ({ props }) => {
  let nameArrH: string[];
  nameArrH = props.name ? [props.name, ...props.aliases] : [...props.aliases];
  const { gender, culture, tvSeries, books } = props;
  const bookIdArr = books.map((elem) => {
    //return only id from url
    let index = elem.indexOf("books/") + 6;
    let id = elem.slice(index);
    return id;
  });
  return (
    <Wrapper data-cy="character_item">
      <p data-cy="character_item_index">{props.url.slice(45)}</p>
      <h2>Name and aliases</h2>
      <p data-cy="character_item_names">
        {nameArrH.map((elem, index) =>
          index === nameArrH.length - 1 ? elem : `${elem}, `
        )}
      </p>
      <StyledSection>
        <div>
          <div>
            <GenderIco />
          </div>
          <p data-cy="character_item_gender">{gender ? gender : "unknow"}</p>
        </div>
        <div>
          <div>
            <Culture />
          </div>
          <p data-cy="character_item_culture">{culture ? culture : "unknow"}</p>
        </div>
        <div>
          <div>
            <Book />
          </div>
          <p data-cy="character_item_books_container">
            {bookIdArr.map((elem, index) => {
              const childrenH =
                index === bookIdArr.length - 1 ? elem : `${elem}, `;
              return (
                <Link key={index} href={`/book/${elem}`}>
                  {childrenH}
                </Link>
              );
            })}
          </p>
        </div>
      </StyledSection>
      <p>
        the number of seasons of the series:
        <span data-cy="character_item_tvSeries">
          {" "}
          {tvSeries.length === 1 && tvSeries[0] === "" ? 0 : tvSeries.length}
        </span>
      </p>
    </Wrapper>
  );
};

export default CharacterItem;
