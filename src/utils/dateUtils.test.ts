import { formatDate } from "./dateUtils";

test("formats a date correctly", () => {
  const inputDate = "2025-04-24T20:09:44.344464+00:00";
  const formattedDate = formatDate(inputDate);
  expect(formattedDate).toBe("24/04/2025 20:09");
});