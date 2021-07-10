
/**
 * This file contains commonly used constants, schemas and action creators
 */

// Schemas

export interface SideEffectSchema {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: string;
}

export interface ActionSchema<T> {
  type: string;
  payload: T;
}

/**
 * Properties sometimes included in a response from the API when there was an error.
 */
export interface APIErrorResponseSchema {
  errorCode?: number;
  message?: string;
  description?: string;
}

export interface V2ErrorResponseSchema {
  Description?: string;
  ErrorCode?: number;
  IsProviderError?: false;
  Message?: string;
  ProviderErrorResponse?: null | string;
}

/**
 * This is the error response schema used by AC backend express error handler
 * middleware.
 */
export interface ACBackendErrorResponseSchema {
  ErrorCode?: any;
  ErrorMessage?: string;
  ErrorDescription: string;
}

export interface ObjectSchema<T> {
  [key: string]: T;
}

// Constants
export const successSideEffectState: SideEffectSchema = {
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: "",
};

// Action Creators
export const loadingAction = (type: string, data = {}) => {
  return {
    type,
    payload: {
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: "",
      ...data,
    },
  };
};

export const errorAction = (type: string, error: string, data = {}) => {
  return {
    type,
    payload: {
      isLoading: false,
      isSuccess: false,
      isError: true,
      error,
      ...data,
    },
  };
};

export const generateConst = (constName: string, consts: string[]) => {
  const newObj: ObjectSchema<string> = {};
  for (let key of consts) {
    newObj[key] = `${constName}_${key}`;
    newObj[`${key}_LOADING`] = `${constName}_${key}_LOADING`;
    newObj[`${key}_SUCCESS`] = `${constName}_${key}_SUCCESS`;
    newObj[`${key}_ERROR`] = `${constName}_${key}_ERROR`;
  }
  return newObj;
};
//export const ActionsRoot = {...AuthAction,...UserAction};