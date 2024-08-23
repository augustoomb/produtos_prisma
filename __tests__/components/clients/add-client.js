import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event';
import AddClient from '@/components/clients/add-client'
 
describe('AddClient', () => {

  it('se o botão de adicionar cliente é renderizado', () => {
    render(<AddClient />)
 
    // const heading = screen.getByRole('heading', { level: 1 })
    const btnAddClient = screen.getByRole('button', { name: '+ Cliente' });
    expect(btnAddClient).toBeInTheDocument()

  })

})