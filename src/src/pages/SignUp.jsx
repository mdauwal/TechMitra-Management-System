import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import StudentImg from '../assets/img/student_img1.jpg'

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(5, "Full Name must be at least 5 characters")
    .required("Full Name is required"),

  email: Yup.string()
    .min(10, "Email must be at least 10 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "password must be at least 6 characters")
    .required("password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "password must match")
    .required("please confirm your password"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })



  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // alert("Account Created successfully!");
    console.log(values)
    setFormData((prev) => ({...prev, values}))
    setSubmitting(false);
    resetForm();

    setTimeout(() => {
      navigate("/_");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    }, 500);
  };

  return (
    <>
      <div className="flex h-[100vh] w-[100%] flex-1">
        {/* LEFT SIDE */}
        <div className="relative hidden w-[50%] flex-1 lg:block">
          <img
            alt="boy-img"
            src={StudentImg}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 flex-col w-[50%] relative justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create Account
            </h2>

            <Formik
              initialValues={formData}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, resetForm }) => (
                <Form className="space-y-6 mt-8">
                  <div>
                    <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                      Full Name
                    </label>
                    <div className="mt-1">
                      <Field
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Ahmad Abdulkareem"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                    
                      />
                      <ErrorMessage
                        name="fullName"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <div className="mt-1">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        placeholder="example@email.com"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="........"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-left text-sm font-medium leading-6 text-gray-900">
                      Confirm Password
                    </label>
                    <div className="mt-1">
                      <Field
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="........"
                        className="block w-full rounded-md border-0 px-2 py-1.5 shadow-sm ring-1 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component="p"
                        className="text-red-500 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-5">
                    {/* Updated Cancel Button */}
                    <button
                      type="button"
                      onClick={() => resetForm()} // Reset form fields when clicking cancel
                      className="btn bg-white p-2 px-5 text-[12px] ring-1 ring-[#5243AA] rounded-sm font-semibold"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn bg-[#5243AA] p-2 px-5 text-[12px] rounded-sm text-white font-semibold"
                    >
                      {isSubmitting ? "Submitting..." : "Register"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>

            <div className="mt- flex gap-1 absolute bottom-3">
              <p>Already have an account?</p>
              <Link to={"/sign-in"} className="text-[#5243AA] font-semibold">
                Login here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
