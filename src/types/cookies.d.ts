import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

declare module "next/headers" {
  // Augment the cookies function return type to include the methods we're using
  function cookies(): ReadonlyRequestCookies & {
    getAll(): { name: string; value: string }[];
    set(name: string, value: string, options?: any): void;
  };
}
