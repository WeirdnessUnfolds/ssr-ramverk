import '@testing-library/jest-dom'
import { fireEvent, act, render, screen, waitFor, within } from "@testing-library/react"
import App from "../App"




beforeEach(() => {

    render(<App />);

})

afterEach(() => {
    jest.clearAllMocks();
})

test("should render loading message", async () => {
    expect(screen.getByText("Laddar dokument...")).toBeInTheDocument();
});

test("When loading message displays no further elements should be displayed, eg doclist", async () => {
    expect(screen.queryByText("Dokument")).toBeNull();
});


test("Doclist length to be length of test database", async () => {
    // screen.debug(); // text initially not present
    await waitFor(() => {
        const doclist = screen.getByRole("Items")
        const documents = doclist.children
        expect(documents.length).toBe(3)

    }, { timeout: 3000 });

});



test("Renders create-view", async () => {
    const navLinks = screen.getAllByRole('listitem');

    await act(async () => {
        fireEvent.click(navLinks[1]);
    });

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());

});

test("Create-view sends post and alert is shown", async () => {
    const navLinks = screen.getAllByRole('listitem');
    await act(async () => {
        fireEvent.click(navLinks[1]);
    });
    const send = screen.getByRole('Send')
    const title = screen.getByRole('titlearea');
    const content = screen.getByRole('contentarea');
    await act(async () => {
        fireEvent.change(title, { target: { value: "New thing!" } });
        fireEvent.change(content, { target: { value: "Nytt innehåll" } });
        fireEvent.click(send);
    });

    waitFor(() => expect(screen.queryByText("Nytt innehåll")).toBeInTheDocument());
    waitFor(() => expect(screen.queryByText("Nu är innehållet nu sparat")).toBeInTheDocument());
});

test("Doclist extended with new document", async () => {
    waitFor(() => {
        expect(screen.getByText("Testdokument")).toBeInTheDocument();
        expect(screen.getByText("New Thing!")).toBeInTheDocument();
        screen.debug();
    });

});


test("Renders update view and updates a document", async () => {
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    const dokument = screen.getByText("Ett helt nytt testdokument");
    const button = within(dokument).getByLabelText('Update');
    await act(async () => {
        fireEvent.click(button);
    })
    await waitFor(async () => {
        expect(screen.getByText("Titel")).toBeInTheDocument();
        const updatedContent = screen.getByRole("titletext");
        const newText = "Uppdaterat innehåll";
        await act(async () => {
            fireEvent.change(updatedContent, { target: { value: newText } });
            fireEvent.click(screen.getByRole("Sendupdate"));
        })
        waitFor(() => {
            expect(screen.getByText("Nu är dokumentet uppdaterat")).toBeInTheDocument()
        });

    });
});

test("Doclist updated", async () => {
    waitFor(() => {
        expect(screen.getByText("Uppdaterat innehåll")).toBeInTheDocument();
        screen.debug();
    });

});