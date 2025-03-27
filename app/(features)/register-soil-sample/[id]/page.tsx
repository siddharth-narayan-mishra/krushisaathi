"use client";
import React, { useEffect, useContext, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";
import navigationContext from "@/context/NavigationContext";
import Image from "next/image";
import RegistrationForm from "@/components/soilTestingRegistration/RegisterationForm";
import labContext from "@/context/LabContext";
import UserContext from "@/context/UserContext";
import RegistrationSuccess from "@/components/soilTestingRegistration/RegistrationSuccess";
import { Yard } from "@/models/Yard";
import { User } from "@/models/User"; // Assuming you have a User model
import { Lab } from "@/models/Labs";

const Page = () => {
  const navContext = useContext(navigationContext);
  const labcontext = useContext(labContext);
  const userContext = useContext(UserContext);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [lab, setLab] = useState<Lab | null>(null);
  const [createdYard, setCreatedYard] = useState<Yard | null>(null);

  const { setActive, prevActive } = navContext || {};
  const { getLab } = labcontext || {};
  const { user } = userContext || {};

  useEffect(() => {
    if (!id) {
      router.push("/register-soil-sample");
      return;
    } else if (getLab) {
      getLab(id)
        .then((data: Lab) => {
          setLab(data);
        })
        .catch((error: Error) => {
          console.error("Error fetching lab:", error);
          // Optionally handle the error, e.g., show a notification
        });
    }
  }, [router, getLab, id]);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="block lg:flex">
      <div className="w-full lg:w-fit">
        <Sidebar />
      </div>
      <div className="w-full">
        <div className="flex justify-between text-2xl px-3 py-2 border-b-2 border-b-gray-400">
          <button onClick={() => setActive && setActive(prevActive || "")}>
            <Image
              src="/assets/icons/back-arrow.svg"
              width={16}
              height={16}
              alt="back"
            />
          </button>
          {createdYard ? "Registration Successful!" : "Sample Registration"}
          <button>
            <Image
              src="/assets/icons/globe.svg"
              width={30}
              height={30}
              alt="globe"
            />
          </button>
        </div>
        {createdYard ? (
          <RegistrationSuccess createdYard={createdYard} lab={lab} />
        ) : (
          <RegistrationForm
            lab={lab}
            user={user as User}
            setCreatedYard={(yard: Yard) => setCreatedYard(yard)}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
