/// <reference types="cypress" />
import data from "../../fixtures/example.json";

const arrH = Array.from(Array(100).keys());
const rightArr = arrH.map((item, index) => data.baseChar[0]);

describe.only("pagination tests", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://anapioficeandfire.com/api/characters?*",
      (req) => {
        const url = new URL(req.url);
        const pageSize = +url.searchParams.get("pageSize");
        const page = +url.searchParams.get("page");
        const pageMinus = page - 1;
        const startSlice = pageMinus * pageSize;
        const endSlice = startSlice + pageSize;

        req.reply({
          body: rightArr.slice(startSlice, endSlice),
          headers: {
            link: `<https://anapioficeandfire.com/api/characters?page=3&pageSize=10>; rel='next', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='prev', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='first', <https://anapioficeandfire.com/api/characters?page=${
              100 / pageSize
            }&pageSize=${pageSize}>; rel='last'`,
          },
        });
      }
    ).as("getcharacters");
    cy.visit("/");
    cy.wait("@getcharacters");
  });

  it("buttons pagination", () => {
    cy.get("[data-cy=page_size]").select("25");
    cy.wait("@getcharacters");

    //nextButton
    clickingBtn("next");
    cy.get("[data-cy=page_next]").should("have.class", "disabled");

    //previousButton
    clickingBtn("previous");
    cy.get("[data-cy=page_previous]").should("have.class", "disabled");

    //last button
    cy.get("[data-cy=page_last]").then(($btn) => {
      cy.wrap($btn).click();
      cy.get("[data-cy=page_last]").should("have.class", "disabled");
    });

    //first button
    cy.get("[data-cy=page_first]").then(($btn) => {
      cy.wrap($btn).click();
      cy.get("[data-cy=page_first]").should("have.class", "disabled");
    });
  });
});

const clickingBtn = (btnOption) => {
  cy.get(`[data-cy=page_${btnOption}]`).then(($btn) => {
    if ($btn.hasClass("disabled")) {
      return;
    }
    cy.wrap($btn).click();
    if (btnOption === "next") {
      cy.wait("@getcharacters");
    }
    clickingBtn(btnOption);
  });
};
