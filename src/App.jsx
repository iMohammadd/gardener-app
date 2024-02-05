import { useEffect, useState } from "react"
import Card from "./components/ui/shared/Card"
import mqtt from 'mqtt'
import Form from "./components/ui/shared/Form"

function App() {
  const clientId = 'mqttx_b70cb280'
  const username = ''
  const password = ''
  const [client, setClient] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const [topic, setTopic] = useState(null)
  const [data, setData] = useState({
    temp: {
      min: 0,
      max: 0,
      current: 0
    },
    hum: {
      min: 0,
      max: 0,
      current: 0
    },
    moi: {
      min: 0,
      max: 0,
      current: 0
    },
    smoke: false
  })

  

  const init = () => {
    const _client = mqtt.connect('ws://127.0.0.1:9001/mqtt', {
      username,
      password,
      clientId,
      keepalive: 60
    })

    setClient(_client)
    setIsConnected(true)

    _client.on("message", (topic, message) => {
      console.log(topic, JSON.parse(message))
      setData(prevState => ({
        ...prevState,
        topic: JSON.parse(message)
      }))
    })
  }

  useEffect(() => {
    const publish = {
      topic: 'hum',
      qos: 0,
      payload: JSON.stringify({
        min: 0,
        max: 0,
        current: 0
      })
    }

    init()

    if(client) {
      client.subscribe('hum', { qos: 0 }, (error, granted) => {
        if (error) {
          console.log("subscribe error:", error)
          return
        }
        console.log("subscribe successfully:", granted)
      })

      client.subscribe('temp', { qos: 0 }, (error, granted) => {
        if (error) {
          console.log("subscribe error:", error)
          return
        }
        console.log("subscribe successfully:", granted)
        
      })

      client.subscribe('moi', { qos: 0 }, (error, granted) => {
        if (error) {
          console.log("subscribe error:", error)
          return
        }
        console.log("subscribe successfully:", granted)
      })

      const { topic, qos, payload } = publish
      client.publish(topic, payload, { qos }, (error) => {
        console.log('publish error', error)
      })
    }
  }, [isConnected])

  return (
    <>
      <div className={`h-screen w-full flex ${topic ? 'hidden' : ''}`}>
        <div className="grid p-4 w-2/3 mx-auto my-auto grid-rows-2 grid-flow-col gap-4 text-center items-center">
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
          }}>
            <Card icon={'/smoke-detector.png'} text={'Smoke Sensor'} active={data.smoke} />
          </a>
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
          setTopic(null)
        }} /> : null}
      </div>
    </>
  )
}

export default App
