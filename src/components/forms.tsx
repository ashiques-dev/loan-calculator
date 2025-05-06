import { cn } from "@/lib/utils";
import { calculatorFormFields } from "./data";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { TLoanCalculatorForm } from "./types";

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
