import '@testing-library/jest-dom'
import { fireEvent, act, render, screen, waitFor, within } from "@testing-library/react"
import App from "../App"
import axios from 'axios';
import url from '../helpers/url';
import ShowAll from '../views/ShowAll';


beforeEach(() => {
    window.alert = jest.fn();
    // jest.mock('axios');

    render(<App />);
})


afterAll(() => {
    jest.clearAllMocks();
})

describe('Login view', () => {
    test("Login view renders", async () => {
        expect((screen.getByRole("loginform"))).toBeInTheDocument();
    })
})
const gotoSignup = () => {
    const registerbutton = screen.getByRole("register")
    act(() => {
        fireEvent.click(registerbutton);
    });
}

const signup = async () => {

    const username = screen.getByRole("username");
    const email = screen.getByRole("email");
    const password = screen.getByRole("password");
    await act(async () => {
        fireEvent.change(username, { target: { value: "testuser" } });
        fireEvent.change(email, { target: { value: "testemail@test.se" } });
        fireEvent.change(password, { target: { value: "testpassword" } });
    });

}

const login = (username, password) => {
    const usernameInput = screen.getByRole("username");
    const passwordInput = screen.getByRole("password");
    act(() => {
        fireEvent.change(usernameInput, { target: { value: username } });
        fireEvent.change(passwordInput, { target: { value: password } });
    });
}


describe('Signup view', () => {
    test("Signup view renders", async () => {
        gotoSignup();
        await waitFor(() => expect(screen.getByText("File Editor - Registrera")).toBeInTheDocument());
    })
    test("Signup view sends post and alert is shown upon entering of nothing", async () => {
        gotoSignup();
        await act(async () => {
            fireEvent.click(screen.getByRole("signupbtn"))
        });
        expect(window.alert).toHaveBeenCalledWith("Fyll i alla fält.");
    })
    test("Signup successful", async () => {
        gotoSignup();
        await signup();
        await act(async () => {
            await fireEvent.click(screen.getByRole("signupbtn"));
        });

        expect(window.alert).toHaveBeenCalledTimes(0);
    })
})

describe("Login handling", () => {
    test("Login fails", async () => {
        login("testuser", "wrongpass");
        await act(async () => {
            fireEvent.click(screen.getByRole("loginbtn"));
        });

        await waitFor(() => expect(screen.getByText("Fel lösenord eller användare.")).toBeInTheDocument());
    })

    test("Login successful", async () => {
        login("testuser", "testpassword");
        await act(async () => {
            fireEvent.click(screen.getByRole("loginbtn"));
        });
        await waitFor(() => expect(screen.getByText("Laddar dokument...")).toBeInTheDocument());
    })

})




test("should render loading message after login", async () => {
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
        console.log(doclist)
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
    waitFor(() => expect(screen.getByText("Testdokument")).toBeInTheDocument());
    waitFor(() => expect(screen.getByText("New Thing!")).toBeInTheDocument());
    screen.debug();

});


test("Renders edit view and updates a document", async () => {
    await waitFor(() => expect(screen.getByText("Dokument")).toBeInTheDocument());
    const dokument = screen.getByText("Ett helt nytt testdokument");
    const button = within(dokument).getByLabelText('Update');
    await act(async () => {
        fireEvent.click(button);
    })
    await waitFor(async () => {
        expect(screen.getByText("Titel")).toBeInTheDocument();
        const updatedContent = screen.getByRole("titletext");
        const newText = "Uppdaterad titel";
        await act(async () => {
            fireEvent.change(updatedContent, { target: { value: newText } });
        })
        waitFor(() => {
            expect(updatedContent).toHaveValue(newText);
            screen.debug();
        });
    });
});

test("Doclist updated", async () => {
    waitFor(() => expect(screen.getByText("Uppdaterat innehåll")).toBeInTheDocument());
    screen.debug();

});