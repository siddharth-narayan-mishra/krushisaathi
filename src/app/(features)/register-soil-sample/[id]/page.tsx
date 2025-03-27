"use client";
import React, { useEffect, useContext, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/common/Sidebar";
import navigationContext from "@/context/NavigationContext";
import Image from "next/image";
import globe from "../../../../../public/assets/icons/globe.svg";
import backArrow from "../../../../../public/assets/icons/back-arrow.svg";
import RegistrationForm from "@/components/soilTestingRegistration/RegisterationForm";
import labContext from "@/context/LabContext";
import UserContext from "@/context/UserContext";
import RegistrationSuccess from "@/components/soilTestingRegistration/RegistrationSuccess";

const Page = () => {
  const navContext = useContext(navigationContext);
  const labcontext = useContext(labContext);
  const userContext = useContext(UserContext);
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { id } = params;
  const [lab, setLab] = useState<any>({});
  const [createdYard, setCreatedYard] = useState(null);

  //@ts-ignore
  const { setActive, prevActive } = navContext;
  //@ts-ignore
  const { getLab } = labcontext;
  //@ts-ignore
  const { user } = userContext;

  useEffect(() => {
    if (!id) {
      router.push("/register-soil-sample");
      return;
    } else {
      getLab(id).then((data: any) => {
        setLab(data);
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
          <button onClick={() => setActive(prevActive)}>
            <Image src={backArrow} width={16} height={16} alt="back" />
          </button>
          {createdYard ? "Registeration Successful!" : "Sample Registeration"}
          <button>
            <Image src={globe} width={30} height={30} alt="globe" />
          </button>
        </div>
        {createdYard ? (
          <RegistrationSuccess createdYard={createdYard} lab={lab} />
        ) : (
          <RegistrationForm
            lab={lab}
            user={user}
            setCreatedYard={setCreatedYard}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
