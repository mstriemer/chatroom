import asyncio
import websockets
import json

def setup(handlers):
    @asyncio.coroutine
    def new_connection(websocket, uri):
        while websocket.open:
            raw_json = yield from websocket.recv()
            data = json.loads(raw_json)
            handler = handlers.get(uri, lambda d: raw_json)
            websocket.send(handler(data))
        websocket.close()
    return new_connection


def handle_message(message):
    print("[{room}] {from}: {text}".format(**message))
    return "Thanks, {}".format(message['from'])

server = setup({'/chatroom/': handle_message})
start_server = websockets.serve(server, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
