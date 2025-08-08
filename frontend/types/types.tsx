export type ToasterType = "SUCCESS" | "ERROR" | "INFO" | "WARNING" | "FAILURE";

export interface IAPIToasterMessage {
  message: string;
  type: ToasterType;
};

export interface IToasterProps {
  message: string | undefined;
  type: ToasterType | undefined;
  timeout?: number;
};
export enum ToasterColors {
  WARNING = "#FFA500",
  SUCCESS = "#4CAF50",
  ERROR = "#F44336",
  FAILURE = "#D32F2F",
  INFO = "#2196F3",
  DEFAULT = "#757575",
};
