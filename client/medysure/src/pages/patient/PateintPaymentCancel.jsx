import React from 'react'
import { XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function PateintPaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Cancelled
          </h1>

          <p className="text-gray-600 mt-2">
            Your payment was not completed. No amount has been charged.
          </p>

          <div className="mt-6 space-y-3">
            <Link to="/patient/view-appointment">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                Try Payment Again
              </Button>
            </Link>

            <Link to="/patient/dashboard">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            You can retry the payment anytime.
          </p>
        </CardContent>
      </Card>
    </div>  )
}

export default PateintPaymentCancel