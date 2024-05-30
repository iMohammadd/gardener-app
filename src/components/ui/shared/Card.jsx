import { NumericFormat } from 'react-number-format'

export default function Card({ icon, text, active = false, value = null, unit = null, has_alarm = false, alarming = null }) {
    return (
        <div className={`${active ? 'bg-cyan-800 text-white' : 'bg-white text-black'} ${has_alarm == true && (alarming ? 'shadow-red-500' : 'shadow-sky-600')} rounded py-6 flex flex-col items-center shadow-sm h-full place-content-center`}>
            {value && (<span className=" font-bold text-4xl mb-4"><NumericFormat displayType='text' value={value} decimalScale={2} suffix={' ' + unit} /></span>)}
            <img src={icon} className=" w-[64px] h-[64px]" />
            <span className=" font-medium">{text}</span>
        </div>
    )
}