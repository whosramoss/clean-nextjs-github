import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import ms from "ms";

export default class Utils {

  static capitalize(str: string) {
    if (!str || typeof str !== "string") return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static truncate(str: string, length: number) {
    if (!str || str.length <= length) return str;
    return `${str.slice(0, length)}...`;
  }

  static cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  static timeAgo(timestamp: Date, timeOnly?: boolean): string {
    if (!timestamp) return "never";
    return `${ms(Date.now() - new Date(timestamp).getTime())}${timeOnly ? "" : " ago"
      }`;
  }

  static lerp(start: number, end: number, amt: number) {
    return (1 - amt) * start + amt * end;
  }
}
