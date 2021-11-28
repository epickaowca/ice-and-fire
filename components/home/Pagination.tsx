import { useDispatch, useSelector } from "react-redux";
import { setPage, setPageSize } from "../../redux/duck/app";
import { AppState } from "../../redux/duck";
import styled from "styled-components";

const Wrapper = styled.div`
  max-width: 300px;
  margin: 45px auto;
  & > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    & > button {
      &.disabled {
        opacity: 0.3;
        cursor: default;
        &:hover {
          opacity: 0.3;
        }
      }
      color: white;
      padding: 15px;
      margin: 15px;
      cursor: pointer;
      background: ${(p) => p.theme.colors.backgroundColor};
      font-size: 1rem;
      &:hover {
        opacity: 0.7;
      }
    }
    & > select {
      background: #494e6e;
      padding: 15px;
      color: white;
      border: none;
      font-size: 1rem;
    }
    & > p {
      margin: 25px 0px;
      color: white;
    }
  }
  ${(p) => p.theme.media.tablet} {
    margin: 45px auto;
    max-width: 900px;
    & > div {
      flex-direction: row;
      &:nth-child(1) {
        & > button {
          padding: 15px 25px;
        }
      }
      &:nth-child(2) {
        display: flex;
        align-items: center;
        & > select {
          width: 120px;
          padding: 10px;
          margin-left: 40px;
        }
      }
    }
  }
`;

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPageH = useSelector((state: AppState) => state.app.page);
  const lastPossiblePage = useSelector(
    (state: AppState) => state.app.lastPossiblePage
  );
  const loading = useSelector((state: AppState) => state.app.loading);
  const pageSize = useSelector((state: AppState) => state.app.pageSize);
  const clickHandler = (option) => {
    //prevent dispatch if pointless
    if (currentPageH === 1 && (option === "previous" || option === "first")) {
      return;
    } else if (
      currentPageH === lastPossiblePage &&
      (option === "next" || option === "last")
    ) {
      return;
    }

    const newPageH =
      option === "previous"
        ? currentPageH - 1
        : option === "next"
        ? currentPageH + 1
        : option === "last"
        ? lastPossiblePage
        : 1;

    dispatch(setPage(newPageH));
  };

  if (loading) {
    return null;
  } else {
    return (
      <Wrapper>
        <div>
          <button
            className={currentPageH === 1 && "disabled"}
            data-cy="page_first"
            onClick={() => clickHandler("first")}
          >
            first
          </button>
          <button
            className={currentPageH === 1 && "disabled"}
            data-cy="page_previous"
            onClick={() => clickHandler("previous")}
          >
            previous
          </button>
          <button
            className={currentPageH === lastPossiblePage && "disabled"}
            data-cy="page_next"
            onClick={() => clickHandler("next")}
          >
            next
          </button>
          <button
            className={currentPageH === lastPossiblePage && "disabled"}
            data-cy="page_last"
            onClick={() => clickHandler("last")}
          >
            last
          </button>
        </div>
        <div>
          <p>number of results per page:</p>
          <select
            data-cy="page_size"
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(+e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>
      </Wrapper>
    );
  }
};

export default Pagination;
