import { ErrorMessageProps } from ".";

export const ErrorMessage = (props: ErrorMessageProps) => {
  const { children } = props;

  return <span className="text-red-600 text-sm mt-1">{children}</span>;
};
