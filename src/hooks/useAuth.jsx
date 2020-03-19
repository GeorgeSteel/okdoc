import { useState, useEffect } from 'react'
import { firebase } from '../firebase'

export default function useAuth() {
  const [authUser, setAuthUser] = useState(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser(user)
      } else {
        setAuthUser(null)
      }
    })
  }, [])
  return authUser
}