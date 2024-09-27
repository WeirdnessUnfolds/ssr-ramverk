import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../App"
import axios from 'axios'

beforeEach(() => {
    render(<App />);
})



test("should render loading message", async () => {
        const loadingText = screen.getByText("Loading...");
        expect(loadingText).toBeInTheDocument();
});

test("When loading message displays no further elements should be displayed, eg doclist", async() => {
    const doclist = screen.queryByRole("Items")
    expect(doclist).toBeNull();
});

test("Doclist renders", async () => {
    // screen.debug(); // text initially not present
    await waitFor(() => {
        const doclist = screen.getByRole("Items")
        expect(doclist).toBeInTheDocument();

});

});

test("Doclist length to be length of test database", async () => {
    // screen.debug(); // text initially not present
    await waitFor(() => {
        const doclist = screen.getByRole("Items")
        const documents = doclist.children
        expect(documents.length).toBe(3)

});
    // screen.debug(); // text is present
});



test("Renders create-view", async () => {
    const navLinks = screen.getAllByRole('listitem');

    fireEvent.click(navLinks[1]);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());

});
