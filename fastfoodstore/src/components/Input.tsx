import React from "react";
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
}
const Input: React.FC<inputProps> = ({
  id,
  inputRef,
  lable,
  required = false,
  lastrow = false,
  className,
  lableSize = 3,
  row = 1,
  ...others
}) => {
  const inputclass = `form-control ${className ? className : ""}`;

  return (
    <div className={`col form-group`}>
      <label htmlFor={id}>{lable}</label>
      <div className="col-sm">
        {row > 1 ? (
          <textarea
            className={inputclass}
            id={id}
            rows={row}
            ref={inputRef}
            {...(others as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          ></textarea>
        ) : (
          <input className={inputclass} id={id} {...others} ref={inputRef} />
        )}
      </div>
    </div>
  );
};
export default Input;
