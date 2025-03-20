"use client";
import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Lab } from "@/models/Labs";
import LabContext from "@/context/labContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
// import { v4 } from "uuid";

interface RegisterationFormProps {
  lab: Lab;
  user: any;
}

const RegisterationForm: React.FC<RegisterationFormProps> = ({ lab, user }) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    yardName: Yup.string().required("Required"),
    samples: Yup.array()
      .of(Yup.string().required("Sample name is required"))
      .min(1, "At least one sample is required")
  });

  const router = useRouter();
  const labContext = useContext(LabContext);
  if (!labContext) {
    console.log("Lab context is not provided", labContext);

    console.error("Lab context is not provided");
    return <div>Error: Lab context is not provided.</div>;
  }

  const { registerSample } = labContext;

  return (
    <>
      <Formik
        initialValues={{
          yardName: "",
          samples: ["", "", "", ""],
          userId: user?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          const finalvalues = { ...values, labId: lab.id };
          console.log(values);
          const data = await registerSample(finalvalues);
          console.log(data);
          if (data.success) {
            setLoading(false);
            toast.success("sample registered successfull");
            router.push("/");
          }
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col mx-auto w-[500px] px-1 mt-5 overflow-auto">
            <label htmlFor="yardName" className="font-medium mb-2">
              Enter Your yard Name
            </label>
            <Field
              className="input-field custom-placeholder"
              id="yardName"
              name="yardName"
              type="text"
              placeholder="Ex. Gukesh Yard"
            />
            <div className="mb-7 h-5">
              <ErrorMessage
                name="yardName"
                component="div"
                className="text-sm text-red-400"
              />
            </div>

            <FieldArray name="samples">
              {({ remove, push }) => (
                <div>
                  <p className="font-medium mb-2">Add Samples</p>
                  {values.samples.length > 0 &&
                    values.samples.map((sample, index) => (
                      <div className="sample mb-4" key={index}>
                        <div className="mb-4 relative">
                          <Field
                            name={`samples.${index}`}
                            type="text"
                            className="input-field custom-placeholder"
                            placeholder="Enter Sample Name"
                          />
                          <button
                            type="button"
                            className="absolute right-3 text-2xl font-light text-primary_green"
                            onClick={() => remove(index)}
                          >
                            x
                          </button>
                          <ErrorMessage
                            name={`samples.${index}`}
                            component="div"
                            className="text-sm text-red-400"
                          />
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

            {lab.labName ? (
              <div className="bg-[#eeebeb] rounded-xl p-3 mt-6">
                <h2 className="text-lg">
                  {lab.labName}, {lab.address?.district}
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
              {loading ? "submitting..." : "submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default RegisterationForm;
