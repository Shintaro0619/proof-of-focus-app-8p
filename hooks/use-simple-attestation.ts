"use client"

import { useState, useCallback } from "react"
import { SimpleWeb3 } from "@/lib/web3-simple"

export function useSimpleAttestation() {
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const web3 = SimpleWeb3.getInstance()

  const createAttestation = useCallback(
    async (sessionData: {
      duration: number
      startTime: number
      endTime: number
    }) => {
      setIsCreating(true)
      setError(null)

      try {
        const signature = await web3.createFocusAttestation(sessionData)

        // Store attestation locally for demo purposes
        const attestation = {
          id: `att_${Date.now()}`,
          signature,
          sessionData,
          timestamp: Date.now(),
        }

        // Save to localStorage
        const existingAttestations = JSON.parse(localStorage.getItem("focus_attestations") || "[]")
        existingAttestations.push(attestation)
        localStorage.setItem("focus_attestations", JSON.stringify(existingAttestations))

        return attestation
      } catch (err: any) {
        setError(err.message || "Failed to create attestation")
        throw err
      } finally {
        setIsCreating(false)
      }
    },
    [web3],
  )

  const getAttestations = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("focus_attestations") || "[]")
    } catch {
      return []
    }
  }, [])

  return {
    createAttestation,
    getAttestations,
    isCreating,
    error,
  }
}
