import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Form } from "./form";
import * as Fetch from "./fake-fetch";

// todo - mocks
// fakeThirdPartyLibrary
// localStorage
// fetch
// date

let getItemSpy;
let fakeFetch = jest.spyOn(Fetch, "fakeFetch");

const arrange = async ({ responseMock }) => {
  fakeFetch.mockImplementation(() => Promise.resolve(responseMock));
  await act(async () => {
    render(<Form />);
  });
};

describe("Form", () => {
  beforeEach(() => {
    global.fakeThirdPartyJSLibrary = "hello world";
    getItemSpy = jest
      .spyOn(global.Storage.prototype, "getItem")
      .mockReturnValue("hello");
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    delete global.fakeThirdPartyJSLibrary;
  });

  it("should render, fetch data from the api, localstorage and globals and display the data", async () => {
    const responseMock = {
      date: "2020-02-01",
      text: "#invalid",
    };

    await arrange({ responseMock });

    expect(
      screen.getByRole("heading", {
        name: "hello world",
      }).textContent
    ).toEqual("hello world");

    expect(
      (screen.getByLabelText(/enter a date:/i) as HTMLInputElement).value
    ).toEqual("2020-02-01");
    expect(
      (screen.getByRole("textbox", {
        name: /enter good text/i,
      }) as HTMLInputElement).value
    ).toEqual("#invalid");
  });

  xit("should display errors with invalid data and prevent form submit", async () => {
    await arrange();
  });

  xit("should display a success message with valid data on form submit", async () => {
    await arrange();
  });
});
