import React, { CSSProperties } from "react";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
type InputAtributes = InputHTMLAttributes<HTMLInputElement>;
interface inputProps
  extends DetailedHTMLProps<InputAtributes, HTMLInputElement> {
  id: string;
  inputRef?: any;
  lable?: string;
  lableSize?: number;
  row?: number;
  required?: boolean;
  lastrow?: boolean;
  backgroundColor?: string;
  labelColor?: string;
  textColor?: string;
}
const Input: React.FC<inputProps> = ({
  id,
  inputRef,
  lable,
  required = false,
  lastrow = false,
  className,
  lableSize = 3,
  backgroundColor,
  labelColor,
  textColor,
  row = 1,
  ...others
}) => {
  const inputclass = `form-control ${className ? className : ""}`;
  const inputStyle: CSSProperties = { backgroundColor, color: textColor };
  const labelStyle: CSSProperties = { color: labelColor };
  return (
    <div className={`col form-group`}>
      <label style={labelStyle} htmlFor={id}>
        {lable}{" "}
      </label>
      <div className="col-sm">
        {row > 1 ? (
          <textarea
            className={inputclass}
            id={id}
            rows={row}
            ref={inputRef}
            style={inputStyle}
            {...(others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ></textarea>
        ) : (
          <input
            className={inputclass}
            style={inputStyle}
            id={id}
            {...others}
            ref={inputRef}
          />
        )}
      </div>
    </div>
  );
};
export default Input;
