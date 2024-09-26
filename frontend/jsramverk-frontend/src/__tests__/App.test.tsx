import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from "@testing-library/react"
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
    await act(async () => {
        render(<App />);
        const loadingText = screen.getByText("Loading...");
        await waitFor(() => expect(loadingText).toBeInTheDocument);
    })
});

test("Renders one document", async () => {
    await act(async () => {
        render(<App />);
        await waitFor(() => expect(screen.getByText("Testdokument")).toBeInTheDocument)
    
    })
})
