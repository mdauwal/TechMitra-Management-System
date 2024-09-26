import { useState } from "react";
import { useRef } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { verifyUser } from "../features/auth/AuthSlice";
import { useDispatch } from "react-redux";


export default function EmailModal({ handleOtpSubmit }) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const inputRefs = useRef([]); // checks if inputs are empty
  const [openModal, setOpenModal] = useState(true);

  // Array to hold OTP values
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input if the value is not empty and not the last input
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Check if all OTP fields are filled
  if (newOtp.every((digit) => digit !== "")) {
    dispatch(verifyUser(otp))
    navigate("/home");
  }
  };

  const handleSubmit = () => {
    if (otp.every((digit) => digit !== "")) {
      // Check if all fields are filled
      handleOtpSubmit();
      
      setOpenModal(false);
      toast.success("account created successfully");
    } else {
      toast.info("Please fill in all the OTP fields.");
    }
  };

  return (
    openModal && (
      <Dialog open={openModal} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <CheckIcon
                  className="h-6 w-6 text-green-600"
                  aria-hidden="true"
                />
              </div>

              <div className="mt-3 text-center sm:mt-5">
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Please enter the verification code that was sent to your email
                </DialogTitle>

                <div className="mt-2">
                  <p className="text-sm mb-5 text-gray-500">Enter verification Codes</p>
                  <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) =>
                          handleInputChange(index, e.target.value)
                        }
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-12 h-12 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className="mt-5 sm:mt-10">
                <button
                  type="button"
                  onClick={handleSubmit} // Call handleSubmit on button click
                  className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                >
                  Submit
                </button>
              </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    )
  );
}