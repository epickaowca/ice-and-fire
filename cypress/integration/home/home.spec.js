/// <reference types="cypress" />

export const name_and_aliases = (name, aliases) => {
  const arr = name ? [name, ...aliases] : [...aliases];
  const res = arr.map((elem, index) =>
    index === arr.length - 1 ? elem : `${elem}, `
  );
  return res;
};

const linkHeader =
  '<https://anapioficeandfire.com/api/characters?page=3&pageSize=10>; rel="next", <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel="prev", <https://anapioficeandfire.com/api/characters?page=1&pageSize=10>; rel="first", <https://anapioficeandfire.com/api/characters?page=214&pageSize=10>; rel="last"';

const charactersFakeBody = [
  {
    url: "https://anapioficeandfire.com/api/characters/1",
    name: "Fake name",
    gender: "Female",
    culture: "Fake Culture",
    aliases: ["Fake Alias, Another Fake Alias"],
    books: ["https://anapioficeandfire.com/api/books/5"],
    tvSeries: ["Season 3", "Season 4", "Season 6"],
  },
  {
    url: "https://anapioficeandfire.com/api/characters/2",
    name: "Walder",
    gender: "Male",
    culture: "Braavosi",
    aliases: ["Hodor"],
    books: [
      "https://anapioficeandfire.com/api/books/1",
      "https://anapioficeandfire.com/api/books/2",
      "https://anapioficeandfire.com/api/books/3",
      "https://anapioficeandfire.com/api/books/5",
      "https://anapioficeandfire.com/api/books/8",
    ],
    tvSeries: ["Season 1", "Season 2", "Season 3", "Season 4", "Season 6"],
  },
  {
    url: "https://anapioficeandfire.com/api/characters/2",
    name: "Wald",
    aliases: ["Hodorer"],
    books: ["https://anapioficeandfire.com/api/books/1"],
    tvSeries: [],
  },
];

const nameV = "Wald";
const genderV = "male";

const charactersFakeBodyNameFilter = [
  charactersFakeBody[1],
  charactersFakeBody[2],
];
const charactersFakeBodyNameAndGenderFilter = [charactersFakeBody[1]];
const page2CharactersContent = [charactersFakeBody[0]];

describe("home tests", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://anapioficeandfire.com/api/characters?page=1&pageSize=10&name=&gender=",
      {
        statusCode: 200,
        headers: {
          link: linkHeader,
        },
        body: charactersFakeBody,
      }
    ).as("getcharacters");
    cy.visit("/");
    cy.wait("@getcharacters");
  });

  it("correct character card display", () => {
    //for loop evry character
    cy.get("[data-cy=character_item]")
      .should("have.length", 3)
      .each(($item, index) => {
        //destruct fake character content
        const { name, aliases, gender, culture, books, tvSeries } =
          charactersFakeBody[index];

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
    cy.intercept(
      "GET",
      `https://anapioficeandfire.com/api/characters?page=1&pageSize=10&name=${nameV}&gender=`,
      {
        statusCode: 200,
        headers: {
          link: linkHeader,
        },
        body: charactersFakeBodyNameFilter,
      }
    ).as("filteredNames");

    //type filtered name and submit
    cy.get("[data-cy=name_filter]").type(`${nameV}{enter}`);

    //wait for request
    cy.wait("@filteredNames");

    //check if all characters have filtered name
    cy.get("[data-cy=character_item]")
      .should("have.length", 2)
      .find("[data-cy=character_item_names]")
      .should("include.text", nameV);

    //intercept a filtered by name and gender api request
    cy.intercept(
      "GET",
      `https://anapioficeandfire.com/api/characters?page=1&pageSize=10&name=${nameV}&gender=${genderV}`,
      {
        statusCode: 200,
        headers: {
          link: linkHeader,
        },
        body: charactersFakeBodyNameAndGenderFilter,
      }
    ).as("filteredNamesAndGender");

    //filter by gender request
    cy.get("[data-cy=gender_filter]").select(genderV);

    //wait for request
    cy.wait("@filteredNamesAndGender");

    //check if character have correct gender
    cy.get("[data-cy=character_item]")
      .should("have.length", 1)
      .find("[data-cy=character_item_gender]")
      .should("have.text", "Male");
  });
});
