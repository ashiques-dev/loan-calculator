"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { calculatorFormSchema, countriesList, tableTitle } from "./data";
import { TCalculatorFormSchema, TLoanCalculationTable } from "./types";
import { LoanCalculatorForm } from "./forms";
import { useCurrencyChange, useEMICalculator } from "./hooks";
import { Button } from "./ui/button";
import { AnimatePresence, motion } from "motion/react";

export const LoanCalculator = () => {
  const loanFormRegister = useForm<TCalculatorFormSchema>({
    resolver: zodResolver(calculatorFormSchema),
    mode: "onChange",
    defaultValues: {
      amount: "100",
      rate: "1",
      years: "1",
    },
  });
  const { emi, schedule, calculateEMI, resetEMITable } = useEMICalculator();
  return (
    <>
      <motion.section
        initial={{
          opacity: 0,
          y: -100,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.35,
          ease: "linear",
        }}
        viewport={{
          once: true,
        }}
        className="width padding py-14"
      >
        <h1 className="text-4xl font-semibold leading-none tracking-tight text-center ">
          Loan calculator Dashboard
        </h1>

        <LoanCalculatorForm
          loanFormRegister={loanFormRegister}
          calculateEMI={calculateEMI}
        />
      </motion.section>
      <LoanCalculationTable
        emi={emi}
        schedule={schedule}
        resetEMITable={resetEMITable}
      />
    </>
  );
};

const LoanCalculationTable = ({
  emi,
  schedule,
  resetEMITable,
}: TLoanCalculationTable) => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const { error, fetchChangedCurrencyData, responseData } =
    useCurrencyChange();
  return (
    <AnimatePresence>
      {emi && (
        <>
          <motion.section
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "linear",
            }}
            viewport={{
              once: true,
            }}
            className="max-w-2xl mx-auto padding pt-10"
          >
            <h2 className="text-2xl font-medium leading-none tracking-tight">
              Monthly EMI :{" "}
              <span className="text-danger underline underline-offset-4">
                $ {emi}
              </span>
            </h2>

            <div className="mt-8 flex flex-col md:flex-row md:justify-between  gap-8">
              <div className="flex flex-col gap-4">
                <select
                  className="cursor-default select-none rounded-sm py-2 px-4 bg-background border appearance-none hide-scrollbar"
                  onChange={async (e) => {
                    await fetchChangedCurrencyData(e.target.value);
                    if (!error) {
                      setCurrencyCode(e.target.value);
                    }
                  }}
                >
                  {countriesList.map(({ country, currencyCode }) => (
                    <option key={currencyCode} value={currencyCode}>
                      {country} {currencyCode}
                    </option>
                  ))}
                </select>
                {!error && currencyCode !== "USD" && (
                  <p className="text-base px-2  font-medium">
                    Converted EMI :
                    <span className="text-danger ps-1 underline underline-offset-2">
                      {Math.floor(responseData * Number(emi) * 100) / 100}{" "}
                      {currencyCode}
                    </span>
                  </p>
                )}
                {error && (
                  <p className="text-danger">
                    Unable to convert currency try again later
                  </p>
                )}
              </div>
              <Button
                variant={"danger"}
                className="place-self-end md:place-self-auto"
                onClick={resetEMITable}
              >
                Reset Table
              </Button>
            </div>
            <h3 className="mt-10 text-2xl font-medium text-accent text-center">
              Amortization Schedule ({currencyCode})
            </h3>
          </motion.section>
          <motion.div
            initial={{
              opacity: 0,
              y: 100,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "linear",
            }}
            viewport={{
              once: true,
            }}
            className="width padding overflow-clip flex  justify-center pb-10 pt-6"
          >
            <div className="overflow-x-scroll w-fit">
              <table className="table-auto  text-center">
                <thead>
                  <tr className="divide-x shrink-0 whitespace-nowrap">
                    {tableTitle.map((title) => (
                      <th key={title} className="px-6 py-3 border-b">
                        {title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-accent">
                  {schedule.map((row) => (
                    <motion.tr
                      initial={{
                        opacity: 0,
                        y: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        ease: "linear",
                      }}
                      viewport={{
                        once: true,
                      }}
                      key={row.month}
                      className="divide-x odd:bg-accent/5"
                    >
                      <td className="p-4 border-b">
                        <p>{row.month}</p>
                      </td>
                      <td className="p-4 border-b">
                        <p className="space-x-2">
                          <span>
                            {Math.floor(
                              responseData * Number(row.principal) * 100
                            ) / 100}
                          </span>
                          <span>{currencyCode}</span>
                        </p>
                      </td>
                      <td className="p-4 border-b">
                        <p className="space-x-2">
                          <span>
                            {Math.floor(
                              responseData * Number(row.interest) * 100
                            ) / 100}
                          </span>
                          <span>{currencyCode}</span>
                        </p>
                      </td>
                      <td className="p-4 border-b">
                        <p className="space-x-2">
                          <span>
                            {Math.floor(
                              responseData * Number(row.balance) * 100
                            ) / 100}
                          </span>
                          <span>{currencyCode}</span>
                        </p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
