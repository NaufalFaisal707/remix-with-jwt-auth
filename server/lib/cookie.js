import { createCookie } from "@remix-run/node";
import { getAccessExp, getRefreshExp } from "./jwt.js";

let process;
if (typeof window === "undefined") {
  process = global.process;
} else {
  process = { env: {} };
}

const accessCookieName = "__r_a";
const refreshCookieName = "__r_r";

/**
 * Configuration object for refresh cookie settings
 * @type {Cookie}
 */
const refreshCookieConfig = {
  sameSite: "lax",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

/**
 * Cookie for storing access token
 * @type {Cookie}
 */
export const accessCookie = createCookie(accessCookieName, {
  maxAge: getAccessExp(),
});

/**
 * Cookie for storing refresh token with security config
 * @type {Cookie}
 */
export const refreshCookie = createCookie(refreshCookieName, {
  maxAge: getRefreshExp(),
  ...refreshCookieConfig,
});

/**
 * Cookie for clearing access token
 * @type {Cookie}
 */
export const clearAccessCookie = createCookie(accessCookieName, { maxAge: 0 });

/**
 * Cookie for clearing refresh token with security config
 * @type {Cookie}
 */
export const clearRefreshCookie = createCookie(refreshCookieName, {
  maxAge: 0,
  ...refreshCookieConfig,
});
