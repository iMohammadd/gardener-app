import { useEffect, useState } from "react"

const initialAlarms = {
    cooler: false,
    heater: false,
    water: false,
    fire: false
}

const icons = {
    cooler: {
        sm: '/alarms/cooler-50.png',
        md: '/alarms/cooler-100.png'
    },
    heater: {
        sm: '/alarms/heater-50.png',
        md: '/alarms/heater-100.png'
    },
    fire: {
        sm: '/alarms/fire-50.png',
        md: '/alarms/fire-100.png'
    },
    water: {
        sm: '/alarms/water-50.png',
        md: '/alarms/water-100.png'
    }
}

export default function Alarm({ data, sensors }) {

    const handleAlarms = () => {
        const cooler = data.temp.max < sensors.temp
        const heater = data.temp.min > sensors.temp || data.moi.max < sensors.moi
        const fire = sensors.smoke
        const water = data.moi.min > sensors.moi

        setAlarms({
            cooler,
            heater,
            fire,
            water
        })
    }

    useEffect(() => {
        handleAlarms()
    }, [data, sensors])

    const [alarms, setAlarms] = useState(initialAlarms)
    return (
        <>
            {/* {JSON.stringify(alarms)} */}
            <div className="w-full flex">
                <div className="m-auto">
                    <div className=" grid grid-cols-2 gap-4 md:grid-cols-4">
                        <div className={`px-4 py-2 ${alarms.cooler ? 'animate-ping' : ''} rounded mx-2`}>
                            <img src={icons.cooler.sm} className="min-w-[16px] min-h-[16px] md:min-w-[32px] md:min-h-[32px]" />
                        </div>
                        <div className={`px-4 py-2 ${alarms.heater ? 'animate-ping' : ''} rounded mx-2`}>
                            <img src={icons.heater.sm} className="min-w-[16px] min-h-[16px] md:min-w-[32px] md:min-h-[32px]" />
                        </div>
                        <div className={`px-4 py-2 ${alarms.fire ? 'animate-ping' : ''} rounded mx-2`}>
                            <img src={icons.fire.sm} className="min-w-[16px] min-h-[16px] md:min-w-[32px] md:min-h-[32px]" />
                        </div>
                        <div className={`px-4 py-2 ${alarms.water ? 'animate-ping' : ''} rounded mx-2`}>
                            <img src={icons.water.sm} className="min-w-[16px] min-h-[16px] md:min-w-[32px] md:min-h-[32px]" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}