import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as SearchIcon } from "@src/assets/icons/search.svg";
import SizedBox from "@components/SizedBox";

interface IProps {
  value: string;
  onChange: (v: string) => void;
  fixed?: boolean;
}

const Root = styled.div<{ fixed?: boolean }>`
  display: flex;
  align-items: center;
  height: 40px;
  width: ${({ fixed }) => (fixed ? "100%" : "280px")};
  border-bottom: 1px solid #3b3b46;

  path {
    stroke: #a2a2c0;
  }
`;

const StyledInput = styled.input`
  background: transparent;
  border: none;
  box-shadow: none;
  outline: none;
  color: #fff;

  ::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #a2a2c0;
  }
`;

const SearchInput: React.FC<IProps> = ({ value, onChange, fixed }) => {
  return (
    <Root fixed={fixed}>
      <SearchIcon />
      <SizedBox width={8} />
      <StyledInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Asset or ticker…"
      />
    </Root>
  );
};
export default SearchInput;
