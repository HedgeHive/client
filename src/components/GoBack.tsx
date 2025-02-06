import styled from "@emotion/styled";
import React from "react";
import { Row } from "@components/Flex";
import arrow from "@src/assets/icons/backArrow.svg";
import SizedBox from "@components/SizedBox";
import { Link } from "react-router-dom";
import Text from "@components/Text";

interface IProps {
  link: string;
  text: string;
  disabled?: boolean;
}

const Root = styled(Row)<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  img {
    width: 16px;
    height: 16px;
  }
`;

const GoBack: React.FC<IProps> = ({ link, text, disabled }) => {
  return (
    <Root alignItems="center" {...{ disabled }}>
      <img src={arrow} alt="back" />
      <SizedBox width={8} />
      {disabled ? (
        <Text weight={500}>{text}</Text>
      ) : (
        <Link to={link}>
          <Text weight={500}>{text}</Text>
        </Link>
      )}
    </Root>
  );
};
export default GoBack;
