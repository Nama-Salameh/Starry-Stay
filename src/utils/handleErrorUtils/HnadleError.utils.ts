import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import localization from "../../localizationConfig";
import { notifyError } from "../toastUtils/Toast.utils";

type ErrorParams = {
  network?: string;
  unknown?: string;
  notFound?: string;
  badRequest?: string;
  noResponse?: string;
  conflict?: string;
  unauthorized?: string;
  timeout?: string;
};

const defaultErrorMessages: Record<ErrorTypes, string> = {
  [ErrorTypes.Network]: localization.networkError,
  [ErrorTypes.Unknown]: localization.serverIssues,
  [ErrorTypes.NotFound]: "Not found error",
  [ErrorTypes.BadRequest]: "Bad request error",
  [ErrorTypes.Conflict]: "Conflict error",
  [ErrorTypes.NoResponse]: "No Response error",
  [ErrorTypes.Unauthorized]: "Unauthorized error",
  [ErrorTypes.Timeout]: "Timeout error",
};

const handleErrorType = (errorType: ErrorTypes, params: ErrorParams = {}) => {
  const errorMessage =
    (params as Record<ErrorTypes, string>)[errorType] ||
    defaultErrorMessages[errorType] ||
    "Unexpected error occurred";
  if (errorType === ErrorTypes.Unauthorized) return;
  notifyError(errorMessage);
};

export default handleErrorType;
