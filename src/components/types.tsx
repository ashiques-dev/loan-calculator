import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
