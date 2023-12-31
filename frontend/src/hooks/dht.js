import { useEffect, useState } from 'react'
import DHT from '@hyperswarm/dht-relay'
import Stream from '@hyperswarm/dht-relay/ws'
import b4a from 'b4a'
import sodium from 'sodium-universal'

export default function useDHT() {
  const [dht, setDHT] = useState(null)

  useEffect(() => {
    let primaryKey = window.localStorage.getItem('primary-key')
    if (!primaryKey) {
      primaryKey = b4a.toString(randomBytes(32), 'hex')
      window.localStorage.setItem('primary-key', primaryKey)
    }

    console.log("primaryKey",primaryKey)
    const ws = new WebSocket('ws://localhost:8080')
    const dht = new DHT(new Stream(true, ws), {
      keyPair: DHT.keyPair(b4a.from(primaryKey, 'hex'))
    })

    setDHT(dht)

    return () => {
      dht.destroy()
    }
  }, [])

  return [dht]
}

function randomBytes (n) {
  const buf = b4a.allocUnsafe(n)
  sodium.randombytes_buf(buf)
  return buf
}
