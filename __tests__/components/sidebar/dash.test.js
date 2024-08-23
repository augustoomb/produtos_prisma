import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Sidebar from '@/components/sidebar/sidebar'
 
describe('Sidebar', () => {

  it('se os itens do menu são renderizados', () => {
    render(<Sidebar />)
 
    // const heading = screen.getByRole('heading', { level: 1 })
    const itemHomeMenu = screen.getByText('Home')
    const itemClientsMenu = screen.getByText('Clientes')
 
    expect(itemHomeMenu).toBeInTheDocument()
    expect(itemClientsMenu).toBeInTheDocument()
  })

  it('se o título do menu é carregado corretamente', () => {
    render(<Sidebar />)
 
    const titleExists = screen.getByRole('heading', { level: 1 })
 
    expect(titleExists).toBeInTheDocument()
  })

  it('se há uma logo e ela contém o alt text correto', () => {
    render(<Sidebar />)
 
    // const heading = screen.getByRole('heading', { level: 1 })
    const imageLogo = screen.getByAltText("Pagfreela Logo")
 
    expect(imageLogo).toBeInTheDocument()
  })
})