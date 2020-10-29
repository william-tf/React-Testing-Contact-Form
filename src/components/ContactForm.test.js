import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import ContactForm from './ContactForm'


test('Contact from renders correctly', () => {
    render(<ContactForm />)
})


test('user can fill out and submit form', async () => {
    render(<ContactForm />)
    const firstName = screen.getByPlaceholderText(/edd/i)
    const lastName = screen.getByPlaceholderText(/burke/i)
    const email = screen.getByPlaceholderText(/email/i)
    const message = screen.getByPlaceholderText(/message/i)

    fireEvent.change(firstName, {target:{value:'wil', name:'firstName'}})
    fireEvent.change(lastName, {target:{value:'fletch', name:'lastName'}})
    fireEvent.change(email, {target:{value:'wfletch7@gmail.com', name:'email'}} )
    fireEvent.change(message, {target:{value:'hey', name:'message'}})

    expect(firstName).toHaveValue('wil')
    expect(lastName).toHaveValue('fletch')
    expect(email).toHaveValue('wfletch7@gmail.com')
    expect(message).toHaveValue('hey')

    const submit = screen.getByRole('submitter')
    fireEvent.click(submit)

    const newFirstName = await screen.findByText(/wil/i)
    expect(newFirstName).toBeTruthy()

    const newLastName = await screen.findByText(/fletch/i)
    expect(newLastName).toBeTruthy()
    const newEmail = await screen.findByText(/wfletch7@gmail.com/i)
    expect(newEmail).toBeTruthy()
    const newMessage = await screen.findByText(/hey/i)
    expect(newMessage).toBeTruthy()


})