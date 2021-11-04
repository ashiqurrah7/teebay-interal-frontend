import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Register from '../Register';

const MockRegister = () =>{
    return <BrowserRouter>
        <Register />
    </BrowserRouter>
}

describe('Check if components are present', ()=> {
    it('Sign Up heading?', () => {
        render(<MockRegister />);
        const headingElement = screen.getByText(/SIGN UP/i);
      
        expect(headingElement).toBeInTheDocument();
      })
    it('First Name Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/First Name/i);
      
        expect(inputElement).toBeInTheDocument();
      })
    it('Last Name Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Last Name/i);
      
        expect(inputElement).toBeInTheDocument();
      })
    it('Address Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Address/i);
      
        expect(inputElement).toBeInTheDocument();
      })
    it('Email Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
      
        expect(inputElement).toBeInTheDocument();
      })
    it('Phone Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Phone/i);
        expect(inputElement).toBeInTheDocument();
      })
    it('Password Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText('Password');
        expect(inputElement).toBeInTheDocument();
      })
    it('Confirm Password Input?', () => {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Confirm Password/i);
        expect(inputElement).toBeInTheDocument();
      })
    it('Register Button?', () => {
        render(<MockRegister />);
        const button = screen.getByText(/Register/i);
        expect(button).toBeInTheDocument();
      })
    it('Sign In Link?', () => {
        render(<MockRegister />);
        const SignInLink = screen.getByText(/Already have an account/i);
        expect(SignInLink).toBeInTheDocument();
      })
})

describe('Checks onChange of text fields', () => {
  it('First Name Input Field', ()=> {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
        fireEvent.change(inputElement, {target: {value: 'Adam'}})
        expect(inputElement.value).toBe('Adam');
    })
  it('Last Name Input Field', ()=> {
        render(<MockRegister />);
        const inputElement = screen.getByPlaceholderText(/Email/i);
        fireEvent.change(inputElement, {target: {value: 'Sandler'}})
        expect(inputElement.value).toBe('Sandler');
    })
  it('Address Name Input Field', ()=> {
      render(<MockRegister />);
      const inputElement = screen.getByPlaceholderText(/Email/i);
      fireEvent.change(inputElement, {target: {value: 'hollywood'}})
      expect(inputElement.value).toBe('hollywood');
    })
  it('Email Input Field', ()=> {
      render(<MockRegister />);
      const inputElement = screen.getByPlaceholderText(/Email/i);
      fireEvent.change(inputElement, {target: {value: 'user@email.com'}})
      expect(inputElement.value).toBe('user@email.com');
    })
  it('Phone Input Field', ()=> {
      render(<MockRegister />);
      const inputElement = screen.getByPlaceholderText(/Email/i);
      fireEvent.change(inputElement, {target: {value: '+880'}})
      expect(inputElement.value).toBe('+880');
    })
  it('Password Input Field', ()=> {
      render(<MockRegister />);
      const inputElement = screen.getByPlaceholderText('Password');
      fireEvent.change(inputElement, {target: {value: 'testPass321'}})
      expect(inputElement.value).toBe('testPass321');
    })
  it('Confirm Password Input Field', ()=> {
      render(<MockRegister />);
      const inputElement = screen.getByPlaceholderText(/Confirm Password/i);
      fireEvent.change(inputElement, {target: {value: 'testPass321'}})
      expect(inputElement.value).toBe('testPass321');
    })
})


