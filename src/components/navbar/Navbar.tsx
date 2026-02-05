function Navbar() {
  return (
    <>
      <div className="w-full flex justify-center py-4 bg-indigo-900 text-white">
        
        <div className="container flex justify-between text-lg mx-8">
        <Link to='/home' className="text-2xl font-bold">Blog Pessoal</Link>

          <div className="flex gap-4">
            <span>Postagens</span>
            <span>Temas</span>
            <span>Cadastrar tema</span>
            <span>Perfil</span>
            <span>Sair</span>
          </div>

        </div>

      </div>
    </>
  )
}

export default Navbar
