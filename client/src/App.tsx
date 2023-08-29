import { useEffect, useMemo, useState } from 'react'
import './App.css'

function App () {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState('')
  const sendMessage = (e: React.MouseEvent) => {
    e.preventDefault()
    ws.send(input)
    setInput('')
  }
  //  wrap this in a useMemo
  const ws = useMemo(
    () => new WebSocket('ws://https://volkswagen.clientdev.ambithub.com/'),
    []
  )
  useEffect(() => {
    ws.onopen = () => {
      console.log('connected')
    }
    ws.onmessage = e => {
      setMessages(e.data)
    }
    return () => ws.close()
  }, [ws])

  return (
    <>
      <div>
        <input
          type='text'
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button onClick={e => sendMessage(e)}>Submit</button>
        <div>
          {messages &&
            messages.split('\n').map((message, i) => <p key={i}>{message}</p>)}
        </div>
      </div>
    </>
  )
}

export default App
