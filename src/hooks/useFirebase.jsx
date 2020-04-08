import { useEffect, useState } from 'react'
// import getFirebase from '../firebase' // import our getFirebase function
import { fireConfig } from '../firebase/config'

export default function useFirebase() {
  const [app, setApp] = useState(null)

  useEffect(() => {
    // setInstance(getFirebase())
    const getApp = async () => {
      if (typeof window !== 'undefined') {
        const firebase = await import('firebase/app')

        await import('firebase/auth')
        await import('firebase/firestore')
        await import('firebase/storage')
        await import('firebase/analytics')

        if (firebase.apps.length !== 0) return setApp(firebase)

        firebase.initializeApp(fireConfig)
        setApp(firebase)
        console.log(app)
      }
    }
    getApp()
  }, [app])

  return app
}
