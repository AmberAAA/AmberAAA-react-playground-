import { IUserDetailsProps, UserDetails } from ".";
import { act, screen} from '@testing-library/react'
import { createRoot } from "react-dom/client";
import exp from "constants";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div")
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
})


it("test user info", () => {
  const user: IUserDetailsProps = {
    name: 'Amber',
    age: 12,
    address: 'China.'
  }
  act(() => {
    createRoot(container).render(<UserDetails {...user} />)
  })

  const name = container.querySelector('strong');
  expect(name?.textContent).toEqual('12')

})