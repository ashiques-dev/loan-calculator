import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react'

const NotFound = () => {
  return (
    <section className="py-14 text-center space-y-6">
      <h1 className="text-4xl font-medium">
        Not Found!. Could not find requested resource
      </h1>
      <Link
        href={"/"}
        replace
        className={buttonVariants({ variant: "danger" })}
      >
        Return Home
      </Link>
    </section>
  );
}

export default NotFound