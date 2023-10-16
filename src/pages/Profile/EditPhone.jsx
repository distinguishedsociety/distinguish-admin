import React, { useEffect, useState } from "react";
import "./Profile.module.css";
import { useTimer } from "react-timer-hook";

export const EditPhone = () => {
  const [showEnterPhone, setShowEnterPhone] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [counterExpired, setCounterExpired] = useState(false);
  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => setCounterExpired(true),
    autoStart: false,
  });

  const handleSendOtp = () => {
    setOtpSent(true);
    start();
  };

  const handleResendOtp = () => {
    setOtpSent(true);
    setCounterExpired(false);
    const expiryTimestamp = new Date();
    expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 30);
    restart(expiryTimestamp);
  };

  return (
    <div className="edit-email accordion-collapse collapse" id="editPhone">
      <div className="row " id="usernameEditDiv">
        <div className="col-2"></div>
        <div class="alert alert-info col-8 h-100 p-2 mt-2" role="alert">
          You will be automatically logged out if you will change the phone
          number.
        </div>
        <div className="row">
          <div className="col-2"></div>

          <input
            class="col-6 mt-2 p-1 form-control w-50"
            type="text"
            placeholder="Enter Phone Number"
          />

          {otpSent === false && (
            <div className="d-flex col-4 justify-content-end">
              <button
                className="btn btn-light mt-2 ms-1 p-2"
                data-bs-toggle="collapse"
                data-bs-target="#editPhone"
                aria-expanded="false"
                aria-controls="editPhone"
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mt-2 ms-1 p-1 w-50"
                onClick={() => handleSendOtp()}
              >
                Send OTP
              </button>
            </div>
          )}
          {otpSent && (
            <div className="d-flex col-4 justify-content-end align-items-center ">
              <p>{seconds}</p>
            </div>
          )}
        </div>
        <div className="row">
          <div className="col-2"></div>
          {otpSent && !counterExpired && (
            <div className="d-flex col-4 justify-content-start align-items-center ">
              <p>OTP sent successfully.</p>
            </div>
          )}
          {counterExpired && (
            <div className="d-flex col-4 justify-content-start align-items-center ">
              <p onClick={() => handleResendOtp()}>OTP expired. Resend?</p>
            </div>
          )}
        </div>
      </div>
      {otpSent && (
        <div className="enter-otp">
          <div className="row " id="usernameEditDiv">
            <div className="col-2"></div>

            <div className="row">
              <div className="col-2"></div>

              <input
                class="col-6 mt-2 p-1 form-control w-50"
                type="text"
                placeholder="Enter OTP"
              />
              <div className="d-flex col-4 justify-content-end">
                <button
                  className="btn btn-primary mt-2 ms-1 p-1 w-50"
                  onClick={() => setShowEnterPhone(!showEnterPhone)}
                >
                  Validate OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
