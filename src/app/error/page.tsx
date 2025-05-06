import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <>
      <section className="py-14 text-center space-y-6">
        <h1 className="text-4xl font-medium">
          something went wrong in the application.
        </h1>
        <Link
          href={"/"}
          replace
          className={buttonVariants({ variant: "danger" })}
        >
          Go Home
        </Link>
      </section>
    </>
  );
};

export default ErrorPage;
