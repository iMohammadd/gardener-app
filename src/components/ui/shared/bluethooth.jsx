import { Button } from "../button";

export default function Bluethooth() {
    const connect = () => {
        navigator.bluetooth.requestDevice({
            acceptAllDevices: true
        })
        .then(device => {
            console.log(device)
        })
        .catch(error => {
            console.log(error)
        })
    }
    return (
        <>
            <div className="w-full bg-slate-400 flex">
                <div className="mx-auto w-3/4">
                    <Button onClick={connect}>
                        Connect
                    </Button>
                </div>
            </div>
        </>
    )
}