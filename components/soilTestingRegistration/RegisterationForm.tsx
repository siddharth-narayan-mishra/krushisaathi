import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Lab } from "@/models/Labs";
import LabContext from "@/context/LabContext";
import toast from "react-hot-toast";
import { Sprout, Trash2, Plus, MapPin, Phone } from "lucide-react";
import { Yard } from "@/models/Yard";

interface RegisterationFormProps {
  lab: Lab | null;
  user: { id: string; name?: string }; // Replace with the actual structure of the user object
  setCreatedYard: (yard: Yard) => void;
}

const RegisterationForm: React.FC<RegisterationFormProps> = ({
  lab,
  user,
  setCreatedYard,
}) => {
  const [loading, setLoading] = useState(false);
  const validationSchema = Yup.object({
    yardName: Yup.string().required("Yard name is required"),
    samples: Yup.array()
      .of(Yup.string().required("Sample name is required"))
      .min(1, "At least one sample is required"),
  });

  const labContext = useContext(LabContext);
  if (!labContext) {
    console.error("Lab context is not provided");
    return (
      <div className="text-center p-4 text-red-600">
        Error: Lab context is not provided.
      </div>
    );
  }

  const { registerSample } = labContext;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <Formik
        initialValues={{
          yardName: "",
          samples: [""],
          userId: user?.id,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          setLoading(true);
          if (!lab) {
            toast.error("Lab information is missing.");
            setLoading(false);
            return;
          }
          const finalvalues = { ...values, labId: lab.id };
          const data = await registerSample(finalvalues);

          if (data.success) {
            setLoading(false);
            toast.success(data.message);
            setCreatedYard(data.createdYard);
          } else {
            setLoading(false);
            toast.error(data.message);
          }
        }}
      >
        {({ values }) => (
          <Form className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-8"
            >
              <Sprout className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-semibold text-gray-800">
                Register Your Yard
              </h1>
            </motion.div>

            <div className="mb-6">
              <label
                htmlFor="yardName"
                className="block text-gray-700 font-medium mb-2"
              >
                Yard Name
              </label>
              <Field
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                id="yardName"
                name="yardName"
                type="text"
                placeholder="Enter your yard name (e.g., Gukesh Yard)"
              />
              <ErrorMessage
                name="yardName"
                component="div"
                className="mt-2 text-sm text-red-500"
              />
            </div>

            <FieldArray name="samples">
              {({ remove, push }) => (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium text-gray-700">
                      Samples
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => push("")}
                      className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition duration-200"
                    >
                      <Plus className="w-4 h-4" />
                      Add Sample
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {values.samples.map((sample, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="relative"
                      >
                        <Field
                          name={`samples.${index}`}
                          type="text"
                          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
                          placeholder="Enter sample name"
                        />
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          type="button"
                          onClick={() => remove(index)}
                          className="absolute top-1/4 right-3 text-gray-400 hover:text-red-500 transition duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                        <ErrorMessage
                          name={`samples.${index}`}
                          component="div"
                          className="mt-1 text-sm text-red-500"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </FieldArray>

            {lab && lab.labName && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Laboratory Details
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                    <div>
                      <p className="font-medium text-gray-700">
                        {lab.labName}, {lab.address?.district}
                      </p>
                      <p className="text-gray-600">
                        {lab.address?.fulladdress}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <p className="text-gray-600">{lab.phone}</p>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className={`w-full mt-8 py-4 rounded-xl text-white font-medium transition duration-200 ${
                loading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit Registration"
              )}
            </motion.button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterationForm;
