import SockJS from 'sockjs-client'
import {Stomp} from '@stomp/stompjs'

let stompClient = null
const handlers = []

export function connect() {
    const socket = new SockJS('/gs-guide-websocket')
    stompClient = Stomp.over(function(){ // i fixed stomp.over on auto-reconnect
        return new WebSocket('ws://localhost:15674/ws') // i fixed stomp.over on auto-reconnect

        stompClient.debug = () => {}
        stompClient.connect({}, frame => {
            stompClient.subscribe('/topic/activity', message => {
                handlers.forEach(handler => handler(JSON.parse(message.body)))
            })
        })

    }); // i fixed stomp.over on auto-reconnect
}
export function addHandler(handler) {
    handlers.push(handler)
}

export function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect()
    }
    console.log("Коля, вчи Autoit !")
}

export function sendMessage(message) {
    stompClient.send("/app/changeMessage", {}, JSON.stringify(message))
}