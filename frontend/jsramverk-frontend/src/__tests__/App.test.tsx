import '@testing-library/jest-dom'
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../App"
import axios from 'axios'

test('demo', () => {
    expect(true).toBe(true)
})

test("Renders the main page", () => {
    render(<App />)
    expect(true).toBeTruthy()
})

test("should render loading message", async () => {
        render(<App />);
        const loadingText = screen.getByText("Loading...");
        expect(loadingText).toBeInTheDocument();
});

test("When loading message displays no further elements should be displayed, eg doclist", async() => {
    render(<App />);
    const doclist = screen.queryByRole("Items")
    expect(doclist).toBeNull();
})
test("Doclist length to be 3", async () => {
    render(<App />);
    // screen.debug(); // text initially not present
    await waitFor(() => {
        const doclist = screen.getByRole("Items")
        const documents = doclist.children
        expect(documents.length).toBe(3)

});
    // screen.debug(); // text is present
});

test("Renders create-view", async () => {
    render(<App />);
    const navLinks = screen.getAllByRole('listitem');

    fireEvent.click(navLinks[1]);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());

});
