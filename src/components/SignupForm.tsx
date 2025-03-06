"use client";
import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import eyeClosed from "../../public/assets/icons/eyeClosed.svg";
import eyeOpen from "../../public/assets/icons/eyeOpen.svg";
import UploadWidget from "./farmer/UploadWidget";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";

interface ResultInfo {
  public_id: string;
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { signup, loading } = userContext;

  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    username: Yup.string().required("Required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Required"),
    cpassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
    adhaar: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    passbook: Yup.string().required("Required"),
    photo: Yup.string().required("Required"),
    ekyf: Yup.string().required("Required"),
  });

  return (
    <>
      <h1 className="font-bold text-4xl text-center my-6">Create Account</h1>
      <Formik
        initialValues={{
          role: "farmer",
          name: "",
          username: "",
          password: "",
          cpassword: "",
          adhaar: "",
          address: "",
          passbook: "",
          photo: "",
          ekyf: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("ONSUBMIT", values);
          signup(values);
        }}
      >
        {({ setFieldValue }) => (
          <Form className="flex flex-col mx-auto">
            <div
              role="group"
              aria-labelledby="radio-group"
              className="flex justify-around mt-9"
            >
              <label>
                <Field
                  type="radio"
                  name="role"
                  value="farmer"
                  className="mx-2"
                />
                Farmer
              </label>
              <label>
                <Field
                  type="radio"
                  name="role"
                  value="soil-agent"
                  className="mx-2"
                />
                Soil Agent
              </label>
            </div>
            <div className="mb-7 h-5">
              <ErrorMessage
                name="role"
                component="div"
                className="text-sm text-red-400"
              />
            </div>
            <Field
              className="input-field custom-placeholder"
              id="name"
              name="name"
              type="text"
              placeholder="Enter Your Name"
            />
            <div className="h-6">
              <ErrorMessage
                name="name"
                component="div"
                className="text-sm text-red-400"
              />
            </div>
            <Field
              className="input-field custom-placeholder"
              id="username"
              name="username"
              type="text"
              placeholder="Phone No/Username"
            />
            <div className="h-6">
              <ErrorMessage
                name="username"
                component="div"
                className="text-sm text-red-400"
              />
            </div>
            <div className="relative">
              <Field
                className="input-field custom-placeholder"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
              />
              <button
                type="button"
                className="absolute right-2 top-1.5 text-red-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Image
                  priority
                  src={showPassword ? eyeClosed : eyeOpen}
                  width={21}
                  height={21}
                  alt="Show Password"
                />
              </button>
            </div>
            <div className="h-6">
              <ErrorMessage
                name="password"
                component="div"
                className="text-sm text-red-400"
              />
            </div>
            <div className="relative">
              <Field
                className="input-field custom-placeholder"
                id="cpassword"
                name="cpassword"
                type={showCPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute right-2 top-1.5 text-red-600"
                onClick={() => setShowCPassword(!showCPassword)}
              >
                <Image
                  priority
                  src={showCPassword ? eyeClosed : eyeOpen}
                  width={21}
                  height={21}
                  alt="Show Password"
                />
              </button>
            </div>
            <div className="h-6">
              <ErrorMessage
                name="cpassword"
                component="div"
                className="text-sm text-red-400"
              />
            </div>
            <h1 className="font-bold text-xl mb-2">Upload Document</h1>
            <div className="flex justify-center ">
              <div className="uploadField">
                <label>Aadhar Card</label>
                <div className="upload-button">
                  <UploadWidget
                    text="Upload"
                    onUploadSuccess={(resultInfo: ResultInfo) => {
                      setFieldValue("adhaar", resultInfo.public_id);
                    }}
                  />
                </div>
                <div className="h-6 absolute">
                  <ErrorMessage
                    name="adhaar"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </div>
              </div>

              <div className="uploadField mx-6">
                <label>Address</label>
                <div className="upload-button">
                  <UploadWidget
                    text="Upload"
                    onUploadSuccess={(resultInfo: ResultInfo) => {
                      setFieldValue("address", resultInfo.public_id);
                    }}
                  />
                </div>
                <div className="h-6 absolute">
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </div>
              </div>

              <div className="uploadField">
                <label>Passbook Copy</label>
                <div className="upload-button">
                  <UploadWidget
                    text="Upload"
                    onUploadSuccess={(resultInfo: ResultInfo) => {
                      setFieldValue("passbook", resultInfo.public_id);
                    }}
                  />
                </div>
                <div className="h-6 absolute ">
                  <ErrorMessage
                    name="passbook"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-5">
              <div className="uploadField mr-6">
                <label>Photograph</label>
                <div className="upload-button">
                  <UploadWidget
                    text="Upload"
                    onUploadSuccess={(resultInfo: ResultInfo) => {
                      setFieldValue("photo", resultInfo.public_id);
                    }}
                  />
                </div>
                <div className="h-6 absolute ">
                  <ErrorMessage
                    name="photo"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </div>
              </div>

              <div className="uploadField">
                <label>e-KYF ID</label>
                <div className="upload-button">
                  <UploadWidget
                    text="Upload"
                    onUploadSuccess={(resultInfo: ResultInfo) => {
                      setFieldValue("ekyf", resultInfo.public_id);
                    }}
                  />
                </div>
                <div className="h-6 absolute">
                  <ErrorMessage
                    name="ekyf"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="primary-green-bg-button">
              {loading ? "Processing..." : "Create an Account"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SignupForm;
