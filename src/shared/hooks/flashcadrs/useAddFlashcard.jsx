import { addCard } from "../../../services/api"
import { useState } from "react"

export const useAddFlashcard = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createFlashcard = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await addCard(data)
      return res.data
    } catch (err) {
      setError(err)
      return { error: true, message: err.message }
    } finally {
      setLoading(false)
    }
  }

  return { createFlashcard, loading, error }
}
