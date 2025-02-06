import styled from "@emotion/styled";
import React, { HTMLAttributes } from "react";
import { Column, Row } from "@src/components/Flex";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import Balance from "@src/entities/Balance";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  token: Balance;
  withClickLogic?: boolean;
  hidden?: boolean;
}

const Root = styled.div<{ withClickLogic?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  cursor: ${({ withClickLogic }) => (withClickLogic ? "pointer" : "default")};
  padding: 10px 24px;
`;
const DefaultIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: pink;
`;
const Name = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #ffffff;
`;
const Symbol = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: #ffffff;
  text-transform: uppercase;
`;
const Gradient = styled.div`
  display: flex;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.1);
  z-index: 10;
  cursor: not-allowed;
`;
const TokenIcon = styled.img`
  width: 32px;
  height: 32px;
  min-width: 32px;
  border-radius: 50%;
  background-color: #ffffff;
`;

const TokenInfo: React.FC<IProps> = ({ token, hidden, ...rest }) => {
  return (
    <Root {...rest}>
      {hidden && <Gradient />}
      <Row>
        {token.logo ? <TokenIcon src={token.logo} /> : <DefaultIcon />}
        <SizedBox width={8} />
        <Column>
          <Name>{token.name}</Name>
          <Symbol>{token.symbol}</Symbol>
        </Column>
      </Row>
      <Column alignItems="flex-end">
        <Text style={{ whiteSpace: "nowrap" }} textAlign="right">
          {token.formatBalance}
        </Text>
        <Text
          style={{ whiteSpace: "nowrap" }}
          textAlign="right"
          type="secondary"
          size="small"
        >
          {token.formatUsdEquivalent}
        </Text>
      </Column>
    </Root>
  );
};
export default TokenInfo;
