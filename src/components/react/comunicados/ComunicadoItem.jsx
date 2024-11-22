import Document1Icon from '../icons/Document1Icon'

function ComunicadoItem({ titulo, fecha, archivo = '#' }) {
  return (
    <div className="w-full rounded-xl bg-white p-4 shadow-lg">
      <div className="mx-auto max-w-6xl">
        <div className="flex border-b-2">
          <div className="text-3xl text-primary-800">
            <Document1Icon />
          </div>
          <div className="mb-3 ml-3">
            <h3 className="mb-3 leading-5 text-gray-900">{titulo}</h3>
            <p className="text-gray-500">{fecha}</p>
          </div>
        </div>
        <div className="flex">
          <a
            href={archivo}
            className="flex-1 border-r-2 pt-2 text-center text-primary-800 hover:font-semibold"
            download={true}>
            Descargar
          </a>
          <a
            href={archivo}
            className="flex-1 pt-2 text-center text-primary-800 hover:font-semibold">
            Ver
          </a>
        </div>
      </div>
    </div>
  )
}

export default ComunicadoItem
