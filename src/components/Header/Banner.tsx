import styled from "@emotion/styled";
import React from "react";
import { ReactComponent as CloseIcon } from "@src/assets/icons/close.svg";
import { Column } from "../Flex";
import { useLocation } from "react-router-dom";
import { ROUTES } from "@src/constants";
import { TOKEN } from "@stores/InvestStore";
import { Anchor } from "@components/Anchor";

interface IProps {
  closed: boolean;
  setClosed: (v: boolean) => void;
}

const Root = styled.div<{ closed: boolean }>`
  //display: flex;
  width: 100%;
  z-index: 102;
  @media (min-width: 880px) {
    flex-direction: row;
  }
  //align-items: center;
  //justify-content: center;
  margin: auto;
  height: ${({ closed }) => (closed ? "0px" : "auto")};
  //min-height: 80px;
  @media (min-width: 880px) {
    height: ${({ closed }) => (closed ? "0px" : "auto")};
    //min-height: 56px;
  }
  padding: ${({ closed }) => (closed ? "0px" : "16px 48px")};
  transition: 0.5s;
  overflow: hidden;
  background: #666de3;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #fff;
  position: relative;
  //white-space: nowrap;

  .close {
    position: absolute;
    cursor: pointer;
    right: 16px;
    top: 0;
    height: 100%;
    path {
      stroke: #fff;
    }
    @media (min-width: 880px) {
      right: 48px;
    }
  }
`;

const BannerLayout: React.FC<IProps & React.PropsWithChildren> = ({
  closed,
  setClosed,
  children,
}) => {
  return (
    <Root closed={closed}>
      {children}
      <Column
        justifyContent="center"
        className="close"
        onClick={() => setClosed(true)}
      >
        <CloseIcon />
      </Column>
    </Root>
  );
};

const Banner: React.FC<IProps> = (props) => {
  const location = useLocation();
  switch (location.pathname) {
    case ROUTES.ROOT:
    case ROUTES.INVEST:
    case ROUTES.INVEST_CARD.replace(":id", TOKEN.assetId):
      return (
        <BannerLayout {...props}>
          🌊 &nbsp;
          <b>This is an alpha version. Smart contracts are not audited.</b>
          &nbsp;All operations are at your own risk.
        </BannerLayout>
      );
    default:
      return (
        <BannerLayout {...props}>
          🎉 Lineup is alive&nbsp;🌊&nbsp;
          <Anchor style={{ fontWeight: 600 }} href="https://t.me/lineupFinance">
            Join our Telegram community
          </Anchor>
          &nbsp;🎉
        </BannerLayout>
      );
  }
};
export default Banner;
