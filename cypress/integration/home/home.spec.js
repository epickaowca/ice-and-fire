/// <reference types="cypress" />

export const name_and_aliases = (name, aliases) => {
  const arr = name ? [name, ...aliases] : [...aliases];
  const res = arr.map((elem, index) =>
    index === arr.length - 1 ? elem : `${elem}, `
  );
  return res;
};

const linkk = `<https://anapioficeandfire.com/api/characters?page=3&pageSize=10>; rel='next', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='prev', <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel='first', <https://anapioficeandfire.com/api/characters?page=20&pageSize=10>; rel='last'`;

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
    cy.intercept(
      "GET",
      "https://anapioficeandfire.com/api/characters?*",
      (req) => {
        const url = new URL(req.url);
        const gender = url.searchParams.get("gender");
        const name = url.searchParams.get("name");

        if (name === nameV && gender === genderV) {
          req.reply({
            body: fixtureData.female_jul_name,
            headers: { link: linkk },
          });
        } else if (name === nameV) {
          req.reply({
            body: fixtureData.jul_name,
            headers: { link: linkk },
          });
        } else {
          req.reply({
            body: fixtureData.baseChar,
            headers: { link: linkk },
          });
        }
      }
    ).as("getcharacters");

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
    //type filtered name and submit
    cy.get("[data-cy=name_filter]").type(`${nameV}{enter}`);

    //wait for request
    cy.wait("@getcharacters");

    //check if all characters have filtered name
    cy.get("[data-cy=character_item]")
      .should("have.length", fixtureData.jul_name.length)
      .find("[data-cy=character_item_names]")
      .should("include.text", nameV);

    //filter by gender request
    cy.get("[data-cy=gender_filter]").select(genderV);

    //wait for request
    cy.wait("@getcharacters");

    //check if character have correct gender
    cy.get("[data-cy=character_item]")
      .should("have.length", fixtureData.female_jul_name.length)
      .find("[data-cy=character_item_gender]")
      .should("have.text", "Female");
  });
});
