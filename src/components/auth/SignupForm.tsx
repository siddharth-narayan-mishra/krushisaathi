"use client";

import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UploadWidget from "./farmerDashboard/UploadWidget";
import toast from "react-hot-toast";
import UserContext from "@/context/UserContext";
import { Eye, EyeOff, MapPin, FileText } from "lucide-react";
import { indianStates } from "@/config/statesData";
import { motion } from "framer-motion";

interface ResultInfo {
  public_id: string;
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [initialRole, setInitialRole] = useState("farmer");
  const [isGeolocating, setIsGeolocating] = useState(false);

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { signup, loading } = userContext;

  const handleAutoDetect = (setFieldValue: any) => {
    setIsGeolocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFieldValue("latitude", position.coords.latitude.toFixed(6));
          setFieldValue("longitude", position.coords.longitude.toFixed(6));
          setIsGeolocating(false);
        },
        (error) => {
          toast.error("Unable to retrieve your location. Please enable location permissions.");
          setIsGeolocating(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setIsGeolocating(false);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Lab Name is required"),
    }),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    cpassword: Yup.string()
      .required("Confirming your password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords do not match"),
    labName: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Lab Name is required"),
    }),
    latitude: Yup.number().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Latitude is required"),
    }),
    longitude: Yup.number().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Longitude is required"),
    }),
    country: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Country is required"),
    }),
    state: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("State is required"),
    }),
    district: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("District is required"),
    }),
    streetAddress: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Street Address is required"),
    }),
    city: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("City is required"),
    }),
    pincode: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Pincode is required"),
    }),
    phone: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Phone number is required"),
    }),
    adhaar: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Aadhaar number is required"),
    }),
    address: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Address is required"),
    }),
    passbook: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Passbook details are required"),
    }),
    photo: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("A photo is required"),
    }),
    ekyf: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("e-KYC verification is required"),
    }),
  });

  const farmersDocConfig = [
    {
      id: "adhaar",
      label: "Aadhaar Card",
      buttonText: "Upload Aadhaar",
      successMessage: "Aadhaar card uploaded successfully"
    },
    {
      id: "address",
      label: "Address Proof",
      buttonText: "Upload Address",
      successMessage: "Address proof uploaded successfully"
    },
    {
      id: "passbook",
      label: "Bank Passbook",
      buttonText: "Upload Passbook",
      successMessage: "Bank passbook uploaded successfully"
    },
    {
      id: "photo",
      label: "Your Photo",
      buttonText: "Upload Photo",
      successMessage: "Photo uploaded successfully"
    },
    {
      id: "ekyf",
      label: "e-KYC Document",
      buttonText: "Upload e-KYC",
      successMessage: "e-KYC document uploaded successfully"
    }
  ];

  const soilAgentLocationFields = [
    { id: "streetAddress", label: "Street Address", type: "text", placeholder: "Enter street address", colSpan: "md:col-span-1" },
    { id: "city", label: "City", type: "text", placeholder: "Enter city", colSpan: "md:col-span-1" },
    { id: "district", label: "District", type: "text", placeholder: "Enter district", colSpan: "md:col-span-1" },
    {
      id: "state",
      label: "State",
      type: "select",
      placeholder: "Select State",
      options: indianStates,
      colSpan: "md:col-span-1"
    },
    { id: "pincode", label: "Pincode", type: "text", placeholder: "Enter pincode", colSpan: "md:col-span-1" },
    { id: "country", label: "Country", type: "text", placeholder: "Enter country", colSpan: "md:col-span-1" },
    { id: "phone", label: "Phone Number", type: "tel", placeholder: "Enter phone number", colSpan: "md:col-span-2" }
  ];

  const FarmerInitialValues = {
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
  };

  const SoilAgentInitialValues = {
    role: "soil-agent",
    username: "",
    password: "",
    cpassword: "",
    labName: "",
    latitude: "",
    longitude: "",
    country: "",
    state: "",
    district: "",
    streetAddress: "",
    city: "",
    pincode: "",
    phone: "",
  };

  const getInitialValues = () => {
    return initialRole === "farmer" ? FarmerInitialValues : SoilAgentInitialValues;
  };

  const handleUploadSuccess = (resultInfo: any, fieldName: any, setFieldValue: any, successMessage: any) => {
    setFieldValue(fieldName, resultInfo.public_id);
    toast.success(successMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Create Your Account</h1>
      <Formik
        initialValues={getInitialValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          signup(values);
        }}
      >
        {({ values, setFieldValue }) => {
          const isSoilAgent = values.role === "soil-agent";
          return (
            <Form className="space-y-6">
              <div className="flex justify-center gap-8 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Field
                    type="radio"
                    name="role"
                    value="farmer"
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                    onChange={() => {
                      setInitialRole("farmer");
                      setFieldValue("role", "farmer");
                    }}
                  />
                  <span className="text-lg font-medium text-gray-700">Farmer</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <Field
                    type="radio"
                    name="role"
                    value="soil-agent"
                    className="w-4 h-4 text-green-600 focus:ring-green-500"
                    onChange={() => {
                      setInitialRole("soil-agent");
                      setFieldValue("role", "soil-agent");
                    }}
                  />
                  <span className="text-lg font-medium text-gray-700">Soil Agent</span>
                </label>
              </div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {isSoilAgent ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Laboratory Name</label>
                      <Field
                        type="text"
                        id="labName"
                        name="labName"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                        placeholder="Enter laboratory name"
                      />
                      <ErrorMessage name="labName" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Username/Phone</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                        placeholder="Enter username or phone number"
                      />
                      <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Password field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                      </div>

                      {/* Confirm Password field */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                          <Field
                            type={showCPassword ? "text" : "password"}
                            id="cpassword"
                            name="cpassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowCPassword(!showCPassword)}
                          >
                            {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <ErrorMessage name="cpassword" component="div" className="text-sm text-red-500" />
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <MapPin className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Location Details</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Latitude</label>
                          <Field
                            type="number"
                            id="latitude"
                            name="latitude"
                            step="any"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter latitude"
                          />
                          <ErrorMessage name="latitude" component="div" className="text-sm text-red-500" />
                        </div>

                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">Longitude</label>
                          <Field
                            type="number"
                            id="longitude"
                            name="longitude"
                            step="any"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Enter longitude"
                          />
                          <ErrorMessage name="longitude" component="div" className="text-sm text-red-500" />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAutoDetect(setFieldValue)}
                        disabled={isGeolocating}
                        className="w-full mt-2 py-2 px-4 bg-green-50 text-green-700 rounded-lg border border-green-200 hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <MapPin size={18} />
                        {isGeolocating ? "Detecting Location..." : "Use Current Location"}
                      </button>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {soilAgentLocationFields.map((field) => (
                          <div key={field.id} className={`space-y-2 ${field.colSpan}`}>
                            <label className="block text-sm font-medium text-gray-700">{field.label}</label>
                            {field.type === "select" ? (
                              <Field
                                as="select"
                                id={field.id}
                                name={field.id}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                              >
                                <option value="">{field.placeholder}</option>
                                {field.options!.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </Field>
                            ) : (
                              <Field
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder={field.placeholder}
                              />
                            )}
                            <ErrorMessage name={field.id} component="div" className="text-sm text-red-500" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage name="name" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Username/Phone</label>
                      <Field
                        type="text"
                        id="username"
                        name="username"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                        placeholder="Enter username or phone number"
                      />
                      <ErrorMessage name="username" component="div" className="text-sm text-red-500" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                            placeholder="Enter password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <div className="relative">
                          <Field
                            type={showCPassword ? "text" : "password"}
                            id="cpassword"
                            name="cpassword"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-shadow duration-200"
                            placeholder="Confirm password"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowCPassword(!showCPassword)}
                          >
                            {showCPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                        <ErrorMessage name="cpassword" component="div" className="text-sm text-red-500" />
                      </div>
                    </div>

                    <motion.div
                      className="bg-white rounded-lg border border-gray-200 p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <div className="flex items-center space-x-2 mb-6">
                        <FileText className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-semibold text-gray-800">Required Documents</h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {farmersDocConfig.map((doc) => (
                          <div key={doc.id} className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700">{doc.label}</label>
                            <UploadWidget
                              text={doc.buttonText}
                              onUploadSuccess={(resultInfo: ResultInfo) => {
                                handleUploadSuccess(resultInfo, doc.id, setFieldValue, doc.successMessage);
                              }}
                            />
                            <ErrorMessage name={doc.id} component="div" className="text-sm text-red-500" />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}

                <motion.button
                  type="submit"
                  className="w-full py-3 px-4 text-lg font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-all duration-200 disabled:opacity-50 hover:shadow-lg"
                  disabled={loading}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </motion.button>
              </motion.div>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default SignupForm;