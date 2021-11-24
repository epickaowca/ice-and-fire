/// <reference types="cypress" />

export const name_and_aliases = (name, aliases) => {
  const arr = name ? [name, ...aliases] : [...aliases];
  const res = arr.map((elem, index) =>
    index === arr.length - 1 ? elem : `${elem}, `
  );
  return res;
};

const nameV = "Jul";
const genderV = "female";

describe("home tests", () => {
  let fixtureData;
  before(() => {
    cy.fixture("example.json").then((data) => {
      fixtureData = data;
    });
  });
  beforeEach(() => {
    cy.stubApi(fixtureData.baseChar, {
      page: 1,
      pageSize: 10,
      name: "",
      gender: "",
      lastPage: "100",
    }).as("getcharacters");

    cy.visit("/");
    cy.wait("@getcharacters");
  });

  it("correct character card display", () => {
    //for loop evry character
    cy.get("[data-cy=character_item]")
      .should("have.length", fixtureData.baseChar.length)
      .each(($item, index) => {
        //destruct fake character content
        const { name, aliases, gender, culture, books, tvSeries } =
          fixtureData.baseChar[index];

        //convert special content
        const names_aliases = name_and_aliases(name, aliases);
        const genderH = gender ? gender : "unknow";
        const cultureH = culture ? culture : "unknow";

        //names and aliases assertion
        cy.wrap($item)
          .find("[data-cy=character_item_names]")
          .contains(...names_aliases, { matchWhitespaces: true });

        //gender assertion
        cy.wrap($item)
          .find("[data-cy=character_item_gender]")
          .contains(genderH);

        //culture assertion
        cy.wrap($item)
          .find("[data-cy=character_item_culture]")
          .contains(cultureH);

        //books assertion
        cy.wrap($item)
          .find("[data-cy=character_item_books_container]")
          .children()
          .should("have.length", books.length);

        //tvSeries assertion
        cy.wrap($item)
          .find("[data-cy=character_item_tvSeries]")
          .should("have.text", ` ${tvSeries.length}`);
      });
  });

  it("filters working", () => {
    //intercept a filtered by name api request
    cy.stubApi(fixtureData.jul_name, {
      page: 1,
      pageSize: 10,
      name: nameV,
      gender: "",
      lastPage: "100",
    }).as("filteredNames");

    //type filtered name and submit
    cy.get("[data-cy=name_filter]").type(`${nameV}{enter}`);

    //wait for request
    cy.wait("@filteredNames");

    //check if all characters have filtered name
    cy.get("[data-cy=character_item]")
      .should("have.length", fixtureData.jul_name.length)
      .find("[data-cy=character_item_names]")
      .should("include.text", nameV);

    //intercept a filtered by name and gender api request
    cy.stubApi(fixtureData.female_jul_name, {
      page: 1,
      pageSize: 10,
      name: nameV,
      gender: genderV,
      lastPage: "100",
    }).as("filteredNamesAndGender");

    //filter by gender request
    cy.get("[data-cy=gender_filter]").select(genderV);

    //wait for request
    cy.wait("@filteredNamesAndGender");

    //check if character have correct gender
    cy.get("[data-cy=character_item]")
      .should("have.length", fixtureData.female_jul_name.length)
      .find("[data-cy=character_item_gender]")
      .should("have.text", "Female");
  });
});
