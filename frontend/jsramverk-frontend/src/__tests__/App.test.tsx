import '@testing-library/jest-dom'
import { fireEvent, getByText, render, screen, waitFor, within } from "@testing-library/react"
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

test("When loading message displays no further elements should be displayed, eg doclist", async () => {
    render(<App />);
    const doclist = screen.queryByRole("doclist")
    expect(doclist).toBeNull();
});

test("Renders doclist", async () => {
    render(<App />);
    // screen.debug(); // text initially not present
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    // screen.debug(); // text is present
});

test("Renders create-view", async () => {
    render(<App />);
    const navLinks = screen.getAllByRole('listitem');

    fireEvent.click(navLinks[1]);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());

});

test("Renders update-view", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    const dokument = screen.getByText("Ett helt nytt testdokument");
    const button = within(dokument).getByLabelText('Update');

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText("Ett helt nytt testdokument")).toBeInTheDocument());
});