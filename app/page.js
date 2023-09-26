'use client'

import { BiArrowBack } from "react-icons/bi";
import { HiMiniWifi, HiMiniChartBar, HiBattery100 } from "react-icons/hi2";
import { Form } from "@/components/Form";


export default function Home() {
  
  return (
    <div className=" w-11/12 flex  flex-col justify-center items-center m-1 mt-0">
      <div className="flex flex-row w-full px-3 items-center mb-6">
        <div className="grow font-semibold">12:30</div>
        <div className="flex flex-row gap-1">
          <HiMiniChartBar />
          <HiMiniWifi />
          <HiBattery100 />
        </div>
      </div>
      <div className="flex flex-row w-full text-left items-center mb-6 mt-4">
        <BiArrowBack size={28} />
        <h2 className="font-bold text-2xl px-3">Submit form</h2>
      </div>
      <Form />
    </div>
  );
}
