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

test("should render loading message", () => {
    render(<App />);
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
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
