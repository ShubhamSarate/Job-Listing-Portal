import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const hasVerified = useRef(false);

  const [message, setMessage] = useState("Verifying your email...");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // Prevent double API call
    if (hasVerified.current) return;

    hasVerified.current = true;

    const verifyEmail = async () => {
      try {

        const res = await axios.get(
          `http://localhost:8000/api/v1/user/verify-email/${token}`
        );

        setSuccess(true);
        setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 3000);

      } catch (error) {

        setSuccess(false);

        setMessage(
          error.response?.data?.message ||
          "Verification failed"
        );

      } finally {
        setLoading(false);
      }
    };

    verifyEmail();

  }, [token, navigate]);

  return (
    <div>
      {loading ? (
        <h1>Verifying...</h1>
      ) : (
        <>
          <h1>
            {success
              ? "Email Verified"
              : "Verification Failed"}
          </h1>

          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;