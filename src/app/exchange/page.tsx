import { CurrencyConvertForm, MoneyConverter } from "@/components/forms";
import React from "react";

const Exchange = () => {
  return (
    <>
      <section className="width padding py-10 flex flex-col items-center md:flex-row md:items-start md:justify-around gap-6">
        <CurrencyConvertForm />
        <MoneyConverter/>
      </section>
    </>
  );
};

export default Exchange;
