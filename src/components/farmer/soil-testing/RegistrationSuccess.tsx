import { useRouter } from "next/navigation";
import React from "react";

interface RegistrationSuccessProps {
  createdYard: any;
  lab: any;
}

const RegistrationSuccess: React.FC<RegistrationSuccessProps> = ({
  createdYard,
  lab,
}) => {

  const router = useRouter();

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-secondary_green bg-opacity-75 my-7 max-w-[800px] mx-5 md:mx-auto p-3">
        <h3 className="text-center text-primary_black font-semibold text-xl">
          Farm Name - Gukesh Yard
        </h3>
        <table className="w-full text-left rtl:text-right font-medium">
          <thead className=" text-primary_green uppercase">
            <tr className="text-lg">
              <th scope="col" className="px-6 py-3 text-center">
                Samples
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {createdYard.samples.map((sample: any, index: number) => (
              <tr key={sample.sampleId}>
                <td className="px-6 py-4 text-center border-r-2 border-gray-400">
                  {index}
                </td>
                <td className="px-6 py-4 text-center border-r-2 border-gray-400">
                  {sample.sampleName}
                </td>
                <td className="px-6 py-4 text-center">{sample.sampleId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-primary_green font-semibold text-center">
        Write the Id number against each sample,then Please Submit all the
        samples in the selected Lab!
      </p>
      <div className="flex flex-col mx-auto w-[500px]">
        {lab.labName ? (
          <div className="bg-[#eeebeb] rounded-xl p-3 mt-6 ">
            <h2 className="text-lg font-medium">
              {lab.labName}, {lab.address?.district}
            </h2>
            <p className="mt-2 font-light">
              Address: {lab.address?.fulladdress}
            </p>
            <p className="mt-2 font-light">Phone: {lab.phone}</p>
          </div>
        ) : (
          <div>Loading...</div>
        )}

        <button onClick={() => router.push("/")} className="primary-green-bg-button">Go Back</button>
      </div>
    </>
  );
};

export default RegistrationSuccess;
