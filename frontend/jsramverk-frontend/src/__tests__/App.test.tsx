import '@testing-library/jest-dom'
import { fireEvent, getByText, render, screen, waitFor, within } from "@testing-library/react"
import App from "../App"
import ShowAll, { Item }  from "../views/ShowAll"


beforeEach(() => {
    render(<App />);
})




test("should render loading message", async () => {
    const { container } = render(<ShowAll data={[]} onSelected={() => {}} loading={true} />)
    expect(container).toHaveTextContent("Loading...")
});

test("When loading message displays no further elements should be displayed, eg doclist", async () => {
    const { container } = render(<ShowAll data={[]} onSelected={() => {}} loading={true} />)
    expect(container).not.toHaveTextContent("Dokument")
});

test("Doclist renders a list of documents", async () => {
    
    const data: Item[] = [
        {_id: '1', title: 'Document 1', content: "content 1"},
        {_id: '2', title: 'Document 2', content: "content 2"},
        {_id: '3', title: 'Document 3', content: "content 3"},
    ]
    const { container } = render(<ShowAll data={data} onSelected={() => {}} loading={false} />)
    expect(container).toHaveTextContent('Dokument')
    expect(container).toHaveTextContent('Document 1')
    expect(container).toHaveTextContent('Document 2')
    expect(container).toHaveTextContent('Document 3')

});
/*
test("Doclist length to be length of test database", async () => {
    // screen.debug(); // text initially not present
    await waitFor(() => {
        const doclist = screen.getByRole("Items")
        const documents = doclist.children
        expect(documents.length).toBe(3)

    });

});



test("Renders create-view", async () => {
    const navLinks = screen.getAllByRole('listitem');

    fireEvent.click(navLinks[1]);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());

});

test("Create-view sends post and alert is shown", async () => {
    const navLinks = screen.getAllByRole('listitem');
    fireEvent.click(navLinks[1]);
    const newdoc = {

    }
    const send = screen.getByRole('Send')
    fireEvent.click(send);
    
    await waitFor(() => expect(screen.getByText("Nu är dokumentet nu sparat")).toBeInTheDocument());
    
    

});



test("Renders update-view", async () => {
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    const dokument = screen.getByText("Ett helt nytt testdokument");
    const button = within(dokument).getByLabelText('Update');

    fireEvent.click(button);

    await waitFor(() => expect(screen.getByText("Titel")).toBeInTheDocument());
}); */