import { useState, useEffect } from 'react'
import useFirebase from './useFirebase'

export default function useDoctors(type, order) {
  const [records, setRecords] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const firebase = useFirebase()

  useEffect(() => {
    const getDocs = async () => {
      await firebase
        .firestore()
        .collection('users')
        .where('type', '==', type)
        .orderBy(order, 'desc')
        .onSnapshot(manageSnap)
    }
    getDocs()
  }, [order, type, firebase])

  function manageSnap(snapshot) {
    const record = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })

    setRecords(record)
    setIsLoading(false)
  }

  return { records, isLoading }
}
