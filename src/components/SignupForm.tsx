"use client";
import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UploadWidget from "./farmer/UploadWidget";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import UserContext from "@/context/userContext";
import { Eye, EyeOff } from "lucide-react";
import { indianStates } from "@/config/statesData";

interface ResultInfo {
  public_id: string;
}

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [initialRole, setInitialRole] = useState("farmer");
  const [isGeolocating, setIsGeolocating] = useState(false);

  const handleAutoDetect = (
    setFieldValue: (field: string, value: any) => void
  ) => {
    setIsGeolocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFieldValue("latitude", position.coords.latitude.toFixed(6));
          setFieldValue("longitude", position.coords.longitude.toFixed(6));
          setIsGeolocating(false);
        },
        (error) => {
          toast.error(
            "Unable to retrieve your location. Please enable location permissions."
          );
          setIsGeolocating(false);
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
      setIsGeolocating(false);
    }
  };

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { signup, loading } = userContext;

  const validationSchema = Yup.object({
    name: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Lab Name is required")
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
      then: (schema) => schema.required("Lab Name is required")
    }),
    latitude: Yup.number().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Latitude is required")
    }),
    longitude: Yup.number().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Longitude is required")
    }),
    country: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Country is required")
    }),
    state: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("State is required")
    }),
    district: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("District is required")
    }),
    streetAddress: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Street Address is required")
    }),
    city: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("City is required")
    }),
    pincode: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Pincode is required")
    }),
    phone: Yup.string().when("role", {
      is: "soil-agent",
      then: (schema) => schema.required("Phone number is required")
    }),
    // Farmer specific fields
    adhaar: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Aadhaar number is required")
    }),
    address: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Address is required")
    }),
    passbook: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("Passbook details are required")
    }),
    photo: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("A photo is required")
    }),
    ekyf: Yup.string().when("role", {
      is: "farmer",
      then: (schema) => schema.required("e-KYC verification is required")
    })
  });

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
    ekyf: ""
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
    phone: ""
  };

  const getInitialValues = () => {
    return initialRole === "farmer"
      ? FarmerInitialValues
      : SoilAgentInitialValues;
  };

  return (
    <>
      <h1 className="font-bold text-4xl text-center my-6">Create Account</h1>
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
            <Form className="flex flex-col mx-auto font-roboto">
              {/* Radio buttons remain same */}
              <div
                role="group"
                aria-labelledby="radio-group"
                className="flex justify-around w-full mt-9"
              >
                <label>
                  <Field
                    type="radio"
                    name="role"
                    value="farmer"
                    className="mx-2"
                    onChange={() => {
                      setInitialRole("farmer");
                      setFieldValue("role", "farmer");
                    }}
                  />
                  Farmer
                </label>
                <label>
                  <Field
                    type="radio"
                    name="role"
                    value="soil-agent"
                    className="mx-2"
                    onChange={() => {
                      setInitialRole("soil-agent");
                      setFieldValue("role", "soil-agent");
                    }}
                  />
                  Soil Agent
                </label>
              </div>
              <div className="mb-7 h-5">
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-[12px] text-red-400 mb-2"
                />
              </div>

              {isSoilAgent ? (
                <>
                  <Field
                    className="input-field custom-placeholder"
                    id="labName"
                    name="labName"
                    type="text"
                    placeholder="Laboratory Name"
                  />
                  <div className="h-6">
                    <ErrorMessage
                      name="labName"
                      component="div"
                      className="text-[10px] text-red-400 mb-2"
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
                      className="text-[12px] text-red-400 mb-2"
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
                      {showPassword ? (
                        <EyeOff size={20} color="green" />
                      ) : (
                        <Eye size={20} color="green" />
                      )}
                    </button>
                  </div>
                  <div className="h-6">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-[12px] text-red-400 mb-2"
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
                      {showCPassword ? (
                        <EyeOff size={20} color="green" />
                      ) : (
                        <Eye size={20} color="green" />
                      )}
                    </button>
                  </div>
                  <div className="h-6">
                    <ErrorMessage
                      name="cpassword"
                      component="div"
                      className="text-[12px] text-red-400 mb-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Field
                        className="input-field custom-placeholder"
                        id="latitude"
                        name="latitude"
                        type="number"
                        placeholder="Latitude"
                        step="any"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          name="latitude"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Field
                        className="input-field custom-placeholder"
                        id="longitude"
                        name="longitude"
                        type="number"
                        placeholder="Longitude"
                        step="any"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          name="longitude"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-2 mb-4">
                    <span className="text-gray-500">or</span>
                    <button
                      type="button"
                      onClick={() => handleAutoDetect(setFieldValue)}
                      disabled={isGeolocating}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-primary_green border border-primary_green rounded-md hover:bg-primary_green/20 disabled:opacity-50"
                    >
                      {isGeolocating ? "Detecting..." : "Use Current Location"}
                    </button>
                  </div>

                  <Field
                    className="input-field custom-placeholder"
                    id="streetAddress"
                    name="streetAddress"
                    type="text"
                    placeholder="Street Address"
                  />
                  <div className="h-6">
                    <ErrorMessage
                      name="streetAddress"
                      component="div"
                      className="text-[10px] text-red-400 mb-2"
                    />
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Field
                        className="input-field custom-placeholder"
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Field
                        className="input-field custom-placeholder"
                        id="district"
                        name="district"
                        type="text"
                        placeholder="District"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          name="district"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Field
                        as="select"
                        className="input-field custom-placeholder placeholder:text-black/[0.4] text-[10px]"
                        name="state"
                        placeholder="Select State"
                      >
                        <option value="">Select State</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Field>
                      <div className="h-6">
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <Field
                        className="input-field custom-placeholder"
                        id="pincode"
                        name="pincode"
                        type="text"
                        placeholder="Pincode"
                      />
                      <div className="h-6">
                        <ErrorMessage
                          name="pincode"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                  </div>

                  <Field
                    className="input-field custom-placeholder"
                    id="country"
                    name="country"
                    type="text"
                    placeholder="Country"
                  />
                  <div className="h-6">
                    <ErrorMessage
                      name="country"
                      component="div"
                      className="text-[10px] text-red-400 mb-2"
                    />
                  </div>

                  <Field
                    className="input-field custom-placeholder"
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Phone Number"
                  />
                  <div className="h-6">
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-[10px] text-red-400 mb-2"
                    />
                  </div>
                </>
              ) : (
                <>
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
                      className="text-[12px] text-red-400 mb-2"
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
                      className="text-[12px] text-red-400 mb-2"
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
                      {showPassword ? (
                        <EyeOff size={20} color="green" />
                      ) : (
                        <Eye size={20} color="green" />
                      )}
                    </button>
                  </div>
                  <div className="h-6">
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-[12px] text-red-400 mb-2"
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
                      {showCPassword ? (
                        <EyeOff size={20} color="green" />
                      ) : (
                        <Eye size={20} color="green" />
                      )}
                    </button>
                  </div>
                  <div className="h-6">
                    <ErrorMessage
                      name="cpassword"
                      component="div"
                      className="text-[12px] text-red-400 mb-2"
                    />
                  </div>
                  <h1 className="font-bold text-xl text-center mb-2">
                    Upload Document
                  </h1>
                  <div className="flex flex-wrap gap-2 justify-center">
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
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>

                    <div className="uploadField mx-3 sm:mx-6">
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
                          className="text-[10px] text-red-400 mb-2"
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
                      <div className="h-6 absolute">
                        <ErrorMessage
                          name="passbook"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center flex-wrap mx-3 gap-2 mt-5">
                    <div className="uploadField ">
                      <label>Photograph</label>
                      <div className="upload-button">
                        <UploadWidget
                          text="Upload"
                          onUploadSuccess={(resultInfo: ResultInfo) => {
                            setFieldValue("photo", resultInfo.public_id);
                          }}
                        />
                      </div>
                      <div className="h-6 absolute">
                        <ErrorMessage
                          name="photo"
                          component="div"
                          className="text-[10px] text-red-400 mb-2"
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
                          className="text-[10px] text-red-400 mb-2"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-center">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full mt-5 max-w-lg px-6 py-3 flex-none text-white bg-primary_green hover:bg-green-700 font-semibold rounded-3xl transition duration-300"
                >
                  {loading ? "Creating..." : "Create an Account"}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default SignupForm;
