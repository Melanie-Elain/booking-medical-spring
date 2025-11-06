// RegisterPage.js
import { useState } from "react";
import Step1Phone from "./Step1OTP";
import Step2OTP from "./Step2Password";
import Step3Info from "./Step3Info";

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");

  return (
    <>
      {step === 1 && <Step1Phone onNext={(p) => { setPhone(p); setStep(2); }} />}
      {step === 2 && <Step2OTP phone={phone} onNext={() => setStep(3)} />}
      {step === 3 && <Step3Info phone={phone} />}
    </>
  );
};

export default RegisterPage;
