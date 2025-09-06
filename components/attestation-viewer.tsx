"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useFocusAttestation } from "@/hooks/use-focus-attestation"
import { ExternalLink, Shield, Clock, CheckCircle } from "lucide-react"

export function AttestationViewer() {
  const [attestationUID, setAttestationUID] = useState("")
  const [attestationData, setAttestationData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { verifyFocusAttestation, isConnected } = useFocusAttestation()

  const handleVerify = async () => {
    if (!attestationUID.trim() || !isConnected) return

    setIsLoading(true)
    try {
      const result = await verifyFocusAttestation(attestationUID)
      setAttestationData(result)
    } catch (error) {
      console.error("Verification failed:", error)
      setAttestationData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Verify Attestation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Input
            placeholder="Enter attestation UID"
            value={attestationUID}
            onChange={(e) => setAttestationUID(e.target.value)}
            className="font-mono text-sm"
          />
          <Button
            onClick={handleVerify}
            disabled={!attestationUID.trim() || !isConnected || isLoading}
            className="w-full"
          >
            {isLoading ? "Verifying..." : "Verify Attestation"}
          </Button>
        </div>

        {attestationData && (
          <div className="space-y-3 p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <Badge variant={attestationData.isValid ? "default" : "destructive"}>
                {attestationData.isValid ? "Valid" : "Invalid"}
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Attester:</span>
                <p className="font-mono text-xs break-all">{attestationData.attester}</p>
              </div>
              <div>
                <span className="font-medium">Recipient:</span>
                <p className="font-mono text-xs break-all">{attestationData.recipient}</p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3" />
                <span className="text-xs">{new Date(attestationData.timestamp * 1000).toLocaleString()}</span>
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
              <a
                href={`https://base-sepolia.easscan.org/attestation/view/${attestationUID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                View on EAS Scan
                <ExternalLink className="h-3 w-3" />
              </a>
            </Button>
          </div>
        )}

        {!isConnected && (
          <p className="text-sm text-muted-foreground text-center">Connect your wallet to verify attestations</p>
        )}
      </CardContent>
    </Card>
  )
}
