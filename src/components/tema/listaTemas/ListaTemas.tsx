import CardTema from "../cardTema/cardTema"
import { useEffect, useState, useContext } from "react"
import { buscar } from "../../../services/Services"
import type Tema from "../../../models/Tema"
import { SyncLoader } from "react-spinners"
import { AuthContext } from "../../../contexts/AuthContext"
import { useNavigate } from "react-router-dom"

function ListaTemas() {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [temas, setTemas] = useState<Tema[]>([])

  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!")
      navigate("/")
    }
  }, [token])

  useEffect(() => {
    buscarTemas()
  }, [temas.length])

  async function buscarTemas() {
    try {

      setIsLoading(true)

      await buscar(
        "/temas",
        setTemas,
        {
          headers: { Authorization: token }
        }
      )

    } catch (error: any) {

      if (error.toString().includes("401")) {
        handleLogout()
      }

    } finally {
      setIsLoading(false)
    }
  }


  return (
    <>
        {isLoading && (
        <div className="flex justify-center items-center h-96">
          <SyncLoader color="#4f46e5" size={20} />
        </div>
        )}
      <div className="flex justify-center w-full my-4">

        <div className="container flex flex-col">
            {(!isLoading && temas.length === 0 && (
                <span className="text-2xl text-center">Nenhum tema cadastrado!</span>
            ))}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {temas.map((tema) => (
              <CardTema key={tema.id} tema={tema} />
            ))}

          </div>

        </div>

      </div>
    </>
  )
}

export default ListaTemas
