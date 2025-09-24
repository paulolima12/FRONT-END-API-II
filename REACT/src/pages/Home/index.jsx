import './style.css';
import { useEffect, useState, useRef } from 'react'
import { FaTrash, FaArrowAltCircleRight } from 'react-icons/fa'
import api from '../../services/api'

function Home() {
  const [usuarios, setUsuarios] = useState([])

  const inputNome = useRef()
  const inputIdade = useRef()
  const inputEmail = useRef()

  async function getUsuarios() {
    const usuariosDaApi = await api.get("/cadastro")
    setUsuarios(usuariosDaApi.data)
  }

  async function criarUsuario() {
    await api.post("/cadastro", {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios()
  }

  async function deletarUsuario(id) {
    await api.delete(`/cadastro/${id}`)
    getUsuarios()
  }

  async function editarUsuario(id) {
    await api.put(`/cadastro/${id}`, {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    })
    getUsuarios()
  }

  useEffect(() => {
    getUsuarios()
  }, [])

  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de usuários</h1>
          <input type="text" placeholder="Digite seu nome:" ref={inputNome} />
          <input type="number" placeholder="Digite sua idade:" ref={inputIdade} />
          <input type="email" placeholder="Digite seu email:" ref={inputEmail} />
          <button onClick={criarUsuario}>Cadastrar</button>
        </form>

        {usuarios.map(usuario => (
          <div key={usuario.id} className='card'>
            <div>
              <p>Nome: {usuario.nome}</p>
              <p>Idade: {usuario.idade}</p>
              <p>Email: {usuario.email}</p>
            </div>
            <button className="botverm" onClick={() => deletarUsuario(usuario.id)}><FaTrash /></button>
            <button className="botverde"onClick={() => editarUsuario(usuario.id)}><FaArrowAltCircleRight /></button>
          </div>
      ))}
      </div>
    </>
  )
}

export default Home;