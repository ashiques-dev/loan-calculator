"use client";
import { useState } from "react";
import { TCalculatorFormSchema, TSchedule } from "./types";
import { axiosApi } from "./api";

export const useEMICalculator = () => {
  const [emi, setEmi] = useState("");
  const [schedule, setSchedule] = useState<TSchedule>([]);

  const resetEMITable = () => {
    setEmi("");
    setSchedule([]);
  };

  const calculateEMI = ({ amount, rate, years }: TCalculatorFormSchema) => {
    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const R = annualRate / 12 / 100;
    const N = parseInt(years) * 12;

    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setEmi(emiValue.toFixed(2));

    let balance = P;
    const scheduleArr = [];

    for (let i = 1; i <= N; i++) {
      const interest = balance * R;
      const principal = emiValue - interest;
      balance -= principal;

      scheduleArr.push({
        month: i,
        emi: emiValue.toFixed(2),
        interest: interest.toFixed(2),
        principal: principal.toFixed(2),
        balance: balance > 0 ? balance.toFixed(2) : "0.00",
      });
    }

    setSchedule(scheduleArr);
  };

  return {
    emi,
    schedule,
    calculateEMI,
    resetEMITable,
  };
};

export const useCurrencyChange = () => {
  const [responseData, setResponseData] = useState(1);
  const [error, setError] = useState("");
  const [converted, setconverted] = useState();

  const fetchChangedCurrencyData = async (
    currencyTwo?: string,
    currencyOne: string = "USD",
    amount: string = "1"
  ) => {
    try {
      const response = await axiosApi.get(
        `/pair/${currencyOne}/${currencyTwo}/${amount}`
      );

      setResponseData(response.data.conversion_rate);
      setconverted(response.data.conversion_result);
      setError("");
    } catch {
      setError("Error fetching data");
    }
  };

  return {
    responseData,
    error,
    fetchChangedCurrencyData,
    converted,
  };
};

export const useCurrencyConverter = () => {
  const [responseData, setResponseData] = useState({});
  const [error, setError] = useState("");

  const changeCurrency = async (currencyCode: string) => {
    try {
      const response = await axiosApi.get(`/latest/${currencyCode}`);
      console.log(response.data);
      setResponseData(response.data.conversion_rates);
      setError("");
    } catch {
      setError("Error fetching data");
    }
  };

  return {
    responseData,
    error,
    changeCurrency,
  };
};
