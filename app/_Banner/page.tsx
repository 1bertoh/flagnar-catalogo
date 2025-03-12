import Link from "next/link";

import Carousel from "../_components/Carousel";

export default function Banner() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full top-0 header">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="header__title text-2xl font-bold text-gray-800 bg-blend-lighten mix-blend-lighten">
              Mármore & Design
            </div>
            <div className="flex space-x-4">
              <Link
                className="text-gray-800 header__title hover:text-gray-600"
                href="/produtos"
              >
                Produtos
              </Link>
              <Link
                className="text-gray-800 header__title hover:text-gray-600"
                href="/aplicacoes"
              >
                Aplicações
              </Link>
              <Link
                className="text-gray-800 header__title hover:text-gray-600"
                href="/contato"
              >
                Contato
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Banner Principal com Vídeo de Fundo */}
      <div className="relative h-screen overflow-hidden ">
        {/* Vídeo de Fundo */}
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/banner.mp4" type="video/mp4" />
          Seu navegador não suporta vídeos HTML5.
        </video>

        {/* Overlay Escuro */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">
              Bem-vindo ao Mundo do Mármore
            </h1>
            <p className="text-xl mb-8">
              Descubra a beleza e a elegância em cada detalhe.
            </p>
            <div className="space-x-4">
              <Link
                className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
                href="/produtos"
              >
                Explorar Produtos
              </Link>
              <Link
                className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-800"
                href="/contato"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Destaques */}
      <div className="  py-12 px-4 ">
        <h2 className="text-3xl font-bold text-center mb-8">Destaques</h2>
        <div className="">
          <Carousel />
        </div>
      </div>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>&copy; 2023 Mármore & Design. Todos os direitos reservados.</p>
          <div className="mt-4 space-x-4">
            <Link
              className="hover:text-gray-400"
              href="/politica-de-privacidade"
            >
              Política de Privacidade
            </Link>
            <Link className="hover:text-gray-400" href="/termos-de-uso">
              Termos de Uso
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
