
import LeftPanel from "../../components/widgets/LeftPanel";
import OTPForm from "../../components/widgets/OTPForm";

const OTP = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen lg:h-screen w-full bg-[#f8fafc] lg:bg-white antialiased selection:bg-blue-200">

      {/* LEFT SIDE (DESKTOP) / TOP (MOBILE) */}
      <div className="w-full lg:w-1/2 flex-shrink-0 lg:h-full lg:overflow-y-auto">
        <LeftPanel />
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="flex w-full lg:w-1/2 flex-grow lg:h-full lg:overflow-y-auto bg-[#f8fafc]">
         <OTPForm />
      </div>

    </div>
  )
}

export default OTP;
