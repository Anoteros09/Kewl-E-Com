import React from "react";
import Filter from "../component/Filter";

function layout({ children }) {
  return (
    <div className="flex w-screen ">
      <div className="w-100 flex-none w-[300px]">
        <div className=" bg-neutral2 m-6 rounded-lg p-5 text-white">
          <h2 className="text-center text-xl p-4">Filters</h2>
          <Filter />
        </div>
      </div>
      <div className="grow">{children}</div>
    </div>
  );
}

export default layout;
