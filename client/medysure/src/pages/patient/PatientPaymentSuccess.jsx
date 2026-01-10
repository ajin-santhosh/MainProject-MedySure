import { useEffect } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
function PatientPaymentSuccess() {
    const api_url = import.meta.env.VITE_API_URL;

    useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search)
      .get("session_id");

    if (sessionId) {
      axios.post(`${api_url}/payment/verifyAndSavePayment`, { sessionId },{
          withCredentials: true,
        });
    }
  }, []);
  return (
<div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <Card className="max-w-md w-full shadow-xl rounded-2xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Payment Successful
          </h1>

          <p className="text-gray-600 mt-2">
            Thank you! Your payment has been processed successfully.
          </p>

          <div className="mt-6 space-y-3">
            <Link to= "/patient/view-appointment">
            <Button className="w-full bg-green-600 hover:bg-green-700">
              View Appointment
            </Button>
            </Link>

            <Link to="/patient/dashboard">
              <Button variant="outline" className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-400 mt-6">
            If you have any issues, please contact support.
          </p>
        </CardContent>
      </Card>
    </div>  )
}

export default PatientPaymentSuccess