import React from "react";

//svg
import { ReactComponent as AlertSvg } from "./../../../assets/svg/alert.svg";

export default function ChatAppInput({
  placeholder,
  title,
  target,
  value,
  error,
  onChangeDataHandler,
  type,
  inputContainerClass,
  inputClass,
}) {
  return (
    <div
      className={`${inputContainerClass} flex flex-col justify-center items-start gap-1 w-full`}
    >
      <span className="text-lg font-semibold">{title}</span>
      <input
        onChange={(e) => onChangeDataHandler(target, e.target.value)}
        value={value}
        className={`${inputClass} w-full text-xl px-3 py-2 border border-white outline-none bg-transparent rounded-3xl focus:border-blue-500 duration-200 placeholder:text-lg`}
        type={type}
        placeholder={placeholder}
        autoComplete="name"
      />

      {error && (
        <span className="flex items-center justify-start gap-2 text-red-700">
          <AlertSvg className="w-5" />
          {error}
        </span>
      )}
    </div>
  );
}
