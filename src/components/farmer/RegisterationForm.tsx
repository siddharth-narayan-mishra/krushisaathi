"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { Lab } from "@/models/Labs";

interface RegisterationFormProps {
  lab: Lab;
}

const RegisterationForm: React.FC<RegisterationFormProps> = ({ lab }) => {
  const validationSchema = Yup.object({
    farmName: Yup.string().required("Required"),
    samples: Yup.array()
      .of(Yup.string())
      .required("At least one sample is required")
      .min(1, "At least one sample is required"),
  });

  return (
    <>
      <Formik
        initialValues={{
          farmname: "",
          samples: ["", "", "", ""],
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col mx-auto w-[500px] px-1 mt-5 overflow-auto">
            <label htmlFor="farmname" className="font-medium mb-2">
              Enter Your Farm Name
            </label>
            <Field
              className="input-field custom-placeholder"
              id="farmname"
              name="farmname"
              type="farmname"
              placeholder="Ex. Gukesh Yard"
            />
            <div className="mb-7 h-5">
              <ErrorMessage
                name="farmname"
                component="div"
                className="text-sm text-red-400"
              />
            </div>

            <FieldArray name="samples">
              {({ insert, remove, push }) => (
                <div>
                  <p className="font-medium mb-2">Add Samples</p>
                  {values.samples.length > 0 &&
                    values.samples.map((sample, index) => (
                      <div className="sample mb-4" key={index}>
                        <div className="flex mb-4 relative">
                          <Field
                            name={`samples.${index}`}
                            type="text"
                            className="input-field custom-placeholder"
                            placeholder="Enter Sample Name"
                          />
                          <ErrorMessage
                            name={`samples.${index}`}
                            component="div"
                            className="text-sm text-red-400"
                          />
                          <button
                            type="button"
                            className="absolute right-3 text-2xl font-light text-primary_green"
                            onClick={() => remove(index)}
                          >
                            x
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="flex mx-auto rounded-full text-2xl font-extralight my-auto bg-secondary_green px-2.5  pb-0.5"
                    onClick={() => push("")}
                  >
                    +
                  </button>
                </div>
              )}
            </FieldArray>

            {lab.name ? (
              <div className="bg-[#eeebeb] rounded-xl p-3 mt-6">
                <h2 className="text-lg">
                  {lab.name}, {lab.address?.district}
                </h2>
                <p className=" mt-2 font-light">
                  Address: {lab.address?.fulladdress}
                </p>
                <p className="mt-2 font-light">Phone: {lab.phone}</p>
              </div>
            ) : (
              <div>Loading...</div>
            )}

            <button type="submit" className="primary-green-bg-button">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterationForm;
