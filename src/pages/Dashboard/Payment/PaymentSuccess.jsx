import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data?.transactionId,
            trackingId: res.data?.trackingId,
          });
        })
        .catch(err => console.error(err));
    }
  }, [axiosSecure, sessionId]);


  return (
    <div>
      <h2 className="text-4xl">Payment Successful</h2>

      {paymentInfo ? (
        <>
          <p>Your Transaction Id: {paymentInfo.transactionId}</p>
          <p>Your Tracking Id: {paymentInfo.trackingId}</p>
        </>
      ) : (
        <p>Loading payment details...</p>
      )}
    </div>
  );
};

export default PaymentSuccess;
