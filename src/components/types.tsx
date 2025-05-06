import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { z } from "zod";
import { calculatorFormSchema } from "./data";
import { UseFormReturn } from "react-hook-form";

export type TNavItems = {
  router: AppRouterInstance;
  pathname: string;
  className?: string;
  forMobile?: boolean;
};

export type TMobileNavMenu = {
  router: AppRouterInstance;
  pathname: string;
  mobileNav: boolean;
  mobileNavButtonClick: () => void;
};

export type TCalculatorFormFields = {
  id: "amount" | "rate" | "years";
  label: string;
}[];

export type TCalculatorFormSchema = z.infer<typeof calculatorFormSchema>;

export type TLoanCalculatorForm = {
  loanFormRegister: UseFormReturn<
    TCalculatorFormSchema,
    undefined,
    TCalculatorFormSchema
  >;
  calculateEMI: ({ amount, rate, years }: TCalculatorFormSchema) => void;
};

export type TSchedule = {
  month: number;
  emi: string;
  interest: string;
  principal: string;
  balance?: string;
}[];

export type TLoanCalculationTable = {
  emi: string;
  schedule: TSchedule;
  resetEMITable: () => void;
  
};