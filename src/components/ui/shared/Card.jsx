export default function Card({ icon, text, active = false }) {
    return (
        <div className={`${active ? 'bg-cyan-800 text-white' : 'bg-white text-black'} rounded border-black-1 py-6 flex flex-col items-center shadow-sm`}>
            <img src={icon} className=" w-[64px] h-[64px]" />
            <span className=" font-medium">{text}</span>
        </div>
    )
}