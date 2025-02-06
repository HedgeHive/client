import styled from "@emotion/styled";
import React, { ChangeEvent, useState } from "react";
import Text from "@components/Text";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";

interface IProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    "onChange" | "prefix"
  > {
  icon?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  suffix?: JSX.Element;
  prefix?: JSX.Element;
  suffixCondition?: boolean;
  error?: boolean;
  errorText?: string;
  description?: string;
}

const Root = styled.div<{ focused?: boolean; error?: boolean }>`
  width: 100%;

  border-bottom: 1px solid
    ${({ focused, error }) =>
      error ? `#D66662` : focused ? `#C6C9F4` : `#C6C9F4`};

  :hover {
    border-color: ${({ focused, error }) =>
      error ? "#ED827E" : !focused ? "#C6C9F4" : "#C6C9F4"};
  }

  align-items: center;
  justify-content: space-between;
  display: flex;
  padding: 0 12px;
  font-size: 16px;
  line-height: 24px;
  box-sizing: border-box;
  height: 48px;

  input {
    padding: 0;
    width: 100%;
    color: ${({ focused }) => (focused ? "#ffffff" : `#A2A2C0`)};
    outline: none;
    border: none;
    background-color: transparent;

    ::placeholder {
      color: #a2a2c0;
    }
  }
`;

const Input: React.FC<IProps> = ({
  value,
  onChange,
  prefix,
  suffix,
  suffixCondition,
  placeholder,
  error,
  errorText,
  description,
  icon,
  type,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  return (
    <>
      <Root focused={focused} error={error} {...rest}>
        {icon === "search" && <SearchIcon style={{ marginRight: 16 }} />}
        {prefix && prefix}
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {suffixCondition || (suffix != null && suffix)}
      </Root>
      {error ? (
        <Text size="small" type="error" style={{ paddingTop: 4 }}>
          {errorText}
        </Text>
      ) : (
        description && (
          <Text size="small" type="secondary" style={{ paddingTop: 4 }}>
            {description}
          </Text>
        )
      )}
    </>
  );
};
export default Input;
