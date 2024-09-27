import '@testing-library/jest-dom'
import { fireEvent, getByText, render, screen, waitFor, within } from "@testing-library/react"
import App from "../App"


beforeEach(() => {
    render(<App />);
})



test("should render loading message", async () => {
    const loadingText = screen.getByText("Loading...");
    expect(loadingText).toBeInTheDocument();
});

test("When loading message displays no further elements should be displayed, eg doclist", async () => {
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

test("Renders update-view", async () => {
    render(<App />);
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    const dokument = screen.getByText("Ett helt nytt testdokument");
    const button = within(dokument).getByLabelText('Update');

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());
});