import React from 'react';
import OTPForm from "../../components/widgets/OTPForm";

const OTP = () => {
  return (
    <div className="flex min-h-screen lg:h-screen w-full items-center justify-center bg-[#f8fafc] lg:bg-white antialiased selection:bg-blue-200">
      <div className="w-full flex-grow lg:h-full lg:overflow-y-auto bg-[#f8fafc] flex items-center justify-center">
         <OTPForm />
      </div>
    </div>
  )
}

export default OTP;
