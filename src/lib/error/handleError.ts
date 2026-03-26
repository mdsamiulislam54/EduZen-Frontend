import { ZodError } from "zod";
import { AxiosError } from "axios";

export const handleError = (error: unknown) => {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof ZodError) {
    // Zod validation error → field-specific message
    errorMessage = error.issues.map(e => e.message).join(", ");
  } else if (error instanceof AxiosError) {
    // Axios error → API response message
    errorMessage = error.response?.data?.message || error.message || errorMessage;
  } else if (error instanceof Error) {
    // Generic JS error
    errorMessage = error.message;
  }

  console.error(error);
  return errorMessage;
};