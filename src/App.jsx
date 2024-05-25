import { useEffect, useState } from "react"
import Card from "./components/ui/shared/Card"
import Form from "./components/ui/shared/Form"
import axios from "axios"
import Alarm from "./components/ui/shared/Alarm"


function App() {

  const base_url = 'https://havashenas.liara.run/api'
const getDataFromApi = async () => {

    const response = await axios.get(`${base_url}/status`)
    console.log('fetching data')
    if (response.status == 200) {
      const result = response.data.data
      const { temp, hum, moi, smoke } = result
      setData(prevState => ({
        ...prevState,
        temp,
        hum,
        moi,
        smoke
      }))
    }
  }

  const getSensorDataFromApi = async () => {
    const request = await axios.get(`${base_url}/sensor`)
    console.log('get sensor data')
    if (request.status == 200) {
      const result = request.data.data
      const { temp, hum, moi, smoke } = result
      setSensorData(prevState => ({
        ...prevState,
        temp,
        hum,
        moi,
        smoke
      }))
    }
  }

  const sendDataToApi = async ({ temp, hum, moi, smoke }) => {
    console.log('sending data to api');
    const request = await axios.post(`${base_url}/status`, {
      data: {
        temp,
        hum,
        moi,
        smoke
      }
    })
    console.log(request)
  }

  const [topic, setTopic] = useState(null)
  const [data, setData] = useState({
    temp: {
      min: 0,
      max: 0
    },
    hum: {
      min: 0,
      max: 0
    },
    moi: {
      min: 0,
      max: 0
    },
    smoke: false
  })

  const [sensorData, setSensorData] = useState({
    temp: 0,
    hum: 0,
    moi: 0,
    smoke: false
  })

  useEffect(() => {
    console.log(base_url);
    getDataFromApi()
    setInterval(() => {
      getSensorDataFromApi()
    }, 5000);
  }, [])

  return (
    <>
      {/* {sensorData && JSON.stringify(sensorData)} */}
      <div className={`h-screen w-full flex flex-col ${topic ? 'hidden' : ''}`}>
        <div className="w-2/3 m-auto">
          <div className="w-full mx-auto">
            <Alarm data={data} sensors={sensorData} />
          </div>
          <div className="grid p-4 w-full mx-auto grid-rows-2 grid-flow-col gap-4 text-center items-center">
            <a className=" cursor-pointer" onClick={() => setTopic('temp')}>
              <Card icon={'/thermometer.png'} text={'Temperature'} />
            </a>
            <a className=" cursor-pointer" onClick={() => setTopic('hum')}>
              <Card icon={'/humidity.png'} text={'Humidity'} />
            </a>
            <a className=" cursor-pointer" onClick={() => setTopic('moi')}>
              <Card icon={'/moisturizing.png'} text={'Soil Moisure'} onClick={() => setTopic('moi')} />
            </a>
            <a className=" cursor-pointer" onClick={() => {
              setData(prevState => ({
                ...prevState,
                smoke: !prevState.smoke
              }))
              console.log(data)
              sendDataToApi({
                ...data,
                smoke: !data.smoke
              })
            }}>
              <Card icon={'/smoke-detector.png'} text={'Smoke Sensor'} active={data.smoke} />
            </a>
          </div>
        </div>
      </div>
      <div>
        {topic == 'temp' ? <Form subject='temperature' data={data.temp} setSubject={({ min, max }) => {
          setData((prevState) => ({
            ...prevState,
            temp: {
              min,
              max
            }
          }))
          console.log(data)
          sendDataToApi({
            ...data,
            temp: {
              min,
              max
            }
          })
          setTopic(null)
        }} /> : null}
        {topic == 'hum' ? <Form subject='humidity' data={data.hum} setSubject={({ min, max }) => {
          setData((prevState) => ({
            ...prevState,
            hum: {
              min,
              max
            }
          }))
          console.log(data)
          sendDataToApi({
            ...data,
            hum: {
              min,
              max
            }
          })
          setTopic(null)
        }} /> : null}
        {topic == 'moi' ? <Form subject='Soil Moisore' data={data.moi} setSubject={({ min, max }) => {
          setData((prevState) => ({
            ...prevState,
            moi: {
              min,
              max
            }
          }))
          console.log(data)
          sendDataToApi({
            ...data,
            moi: {
              min,
              max
            }
          })
          setTopic(null)
        }} /> : null}
      </div>

    </>
  )
}

export default App
