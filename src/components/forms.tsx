"use client";
import { cn } from "@/lib/utils";
import { calculatorFormFields, countriesList } from "./data";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TLoanCalculatorForm } from "./types";
import { useEffect, useState } from "react";
import { useCurrencyChange, useCurrencyConverter } from "./hooks";

export const LoanCalculatorForm = ({
  loanFormRegister,
  calculateEMI,
}: TLoanCalculatorForm) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = loanFormRegister;
  return (
    <form
      noValidate
      className="max-w-lg mx-auto mt-10"
      onSubmit={handleSubmit(async (data) => {
        calculateEMI({ ...data });
      })}
    >
      <div className="grid grid-cols-2 gap-x-4 gap-y-6 ">
        {calculatorFormFields.map(({ id, label }) => (
          <div
            key={id}
            className={cn("space-y-1.5", id === "amount" && "col-span-full")}
          >
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium leading-none inline-flex cursor-pointer",
                errors[id] && "text-danger"
              )}
            >
              {label}
            </label>
            <Input
              id={id}
              type="number"
              autoFocus={id === "amount"}
              {...register(id)}
              className={errors[id] && "border-danger"}
            />
            {errors[id] && (
              <p className="text-danger text-xs">
                {errors[id].message?.toString()}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Button type="submit">Calculate</Button>
      </div>
    </form>
  );
};

export const CurrencyConvertForm = () => {
  const [currencyOne, setCurrencyOne] = useState("USD");
  const [currencyTwo, setCurrencyTwo] = useState("INR");
  const [amount, setAmount] = useState("");
  const {  converted, fetchChangedCurrencyData } =
    useCurrencyChange();
  return (
    <>
      <div className="max-w-3xs flex flex-col items-center py-6 ">
        <p className="text-lg font-medium">currency convertor</p>
        <form
          noValidate
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (amount && currencyOne !== currencyTwo) {
              fetchChangedCurrencyData(currencyTwo, currencyOne, amount);
            }
          }}
        >
          <div className="flex items-center gap-1.5">
            <select
              className="cursor-default select-none rounded-sm py-2 px-4 bg-background border appearance-none hide-scrollbar"
              onChange={(e) => {
                setCurrencyOne(e.target.value);
              }}
            >
              {countriesList.map(({ currencyCode }) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
            =
            <select
              className="cursor-default select-none rounded-sm py-2 px-4 bg-background border appearance-none hide-scrollbar"
              onChange={(e) => {
                setCurrencyTwo(e.target.value);
              }}
            >
              <option value="INR">INR</option>
              {countriesList.map(({ currencyCode }) => (
                <option key={currencyCode} value={currencyCode}>
                  {currencyCode}
                </option>
              ))}
            </select>
          </div>
          <Input
            type="number"
            className="max-w-36 mt-4"
            autoFocus
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />

          <div className="flex justify-center mt-4">
            <Button type="submit">Convert</Button>
          </div>
        </form>
        {converted && (
          <p
            className="mt-8 place-self-start text-lg underline underline-offset-2 font-medium
        "
          >
            {converted} {currencyTwo}
          </p>
        )}
      </div>
    </>
  );
};

export const MoneyConverter = () => {
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 48;

  const { responseData, changeCurrency, error } = useCurrencyConverter();

  useEffect(() => {
    const fetchData = async () => {
      await changeCurrency(currencyCode);
    };
    fetchData();
  }, [currencyCode, changeCurrency]);

  if (error) {
    return (
      <p className="text-danger text-center font-medium text-base">
        Unknown network error
      </p>
    );
  }

  const entries = Object.entries(responseData || {});
  const totalPages = Math.ceil(entries.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentEntries = entries.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div>
      <div className="flex gap-1.5 items-center justify-center">
        <h2 className="text-xl font-semibold ">One</h2>
        <select
          className="cursor-default select-none rounded-sm py-2 px-4 bg-background border appearance-none hide-scrollbar"
          onChange={(e) => {
            setCurrencyCode(e.target.value);
          }}
        >
          {countriesList.map(({ currencyCode }) => (
            <option key={currencyCode} value={currencyCode}>
              {currencyCode}
            </option>
          ))}
        </select>
        <h2 className="text-xl font-semibold ">To</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {currentEntries.map(([currency, rate]) => (
          <p key={currency}>
            {currency}: {rate as number}
          </p>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center gap-6 mt-6 justify-center">
          <Button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};
