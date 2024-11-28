import CalendarIcon from '../icons/CalendarIcon'

function NoticiaItem({ image, fecha, titular }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 bg-white">
      <div className="h-52">
        <img src={image} className="h-full w-full object-cover" alt="" draggable="false" />
      </div>
      <div className="mx-3 mb-3 flex flex-1 flex-col gap-3 rounded-xl">
        <div className="mt-3 flex items-center gap-2 text-primary-800">
          <span className="mr-1">
            <CalendarIcon />
          </span>
          <span>{fecha}</span>
        </div>
        <h2 className="line-clamp-4 font-noto text-xl font-bold text-[#2A2A2A]">{titular}</h2>
      </div>
    </div>
  )
}
export default NoticiaItem
