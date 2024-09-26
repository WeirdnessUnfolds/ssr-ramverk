import '@testing-library/jest-dom'
import { render } from "@testing-library/react"
import ShowAll from '../views/ShowAll'

test("Renders the component", () => {
    render(<ShowAll/>)
    expect(true).toBeTruthy()
})
