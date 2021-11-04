import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';

const MockLogin = () =>{
    return <BrowserRouter>
        <Login />
    </BrowserRouter>
}

describe('Check if components are present', ()=> {
    it('Sign In heading?', () => {
        render(<MockLogin />);
        const headingElement = screen.getByText(/SIGN IN/i);
      
        expect(headingElement).toBeInTheDocument();
      })
    it('Email Input?', () => {
        render(<MockLogin />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
      
        expect(inputElement).toBeInTheDocument();
      })
    it('Password Input?', () => {
        render(<MockLogin />);
        const inputElement = screen.getByPlaceholderText(/Password/i);
        expect(inputElement).toBeInTheDocument();
      })
    it('Login Button?', () => {
        render(<MockLogin />);
        const button = screen.getByText(/Login/i);
        expect(button).toBeInTheDocument();
      })
    it('Signup Link?', () => {
        render(<MockLogin />);
        const inputElement = screen.getByText(/Don't have an account/i);
        expect(inputElement).toBeInTheDocument();
      })
})

describe('Checks onChange of text fields', () => {
    it('Email Input Field', ()=> {
        render(<MockLogin />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
        fireEvent.change(inputElement, {target: {value: 'user@email.com'}})
        expect(inputElement.value).toBe('user@email.com');
    })
    it('Password Input Field', ()=> {
        render(<MockLogin />);
        const inputElement = screen.getByPlaceholderText(/Password/i);
        fireEvent.change(inputElement, {target: {value: 'testPass321'}})
        expect(inputElement.value).toBe('testPass321');
    })
})


