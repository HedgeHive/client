import React from "react";
import { IDialogPropTypes } from "rc-dialog/lib/IDialogPropTypes";
import Dialog from "@components/Dialog/Dialog";
import { Column } from "../Flex";
import { ReactComponent as Success } from "@src/assets/icons/success.svg";
import SizedBox from "@components/SizedBox";
import Text from "@components/Text";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import Button from "../Button";
import Spinner from "@components/Spinner";

export interface IDialogNotificationProps extends IDialogPropTypes {
  title?: string;
  description?: string;
  type?: "success" | "error" | "warning" | "loading";
  buttons?: React.FC[];
  buttonsDirection?: "row" | "column";
  disableClose?: boolean;
}

const Root = styled(Column)`
  text-align: center;

  & > .title {
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
  }
`;

const ButtonsContainer = styled.div<{ direction?: "row" | "column" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction ?? "column"};
  width: 100%;
  margin: -4px;

  & > * {
    margin: 4px;
  }
`;

const DialogNotification: React.FC<IDialogNotificationProps> = ({
  title,
  description,
  type = "success",
  buttonsDirection = "column",
  buttons = [],
  disableClose,
  ...rest
}) => {
  const closeProps = disableClose
    ? { closeIcon: <div />, onClose: () => null }
    : {};
  return (
    <Dialog {...{ ...rest, ...closeProps }}>
      <Root alignItems="center" crossAxisSize="max">
        <SizedBox height={32} />
        {type === "success" && <Success />}
        {type === "loading" && <Spinner size={56} />}

        <SizedBox height={28} />
        {title && <Text className="title">{title}</Text>}
        {description && (
          <Text style={{ marginTop: 8 }} size="medium" type="secondary">
            {description}
          </Text>
        )}
        <SizedBox height={16} />
        {buttons.length > 0 && (
          <ButtonsContainer style={{ flexDirection: buttonsDirection }}>
            {buttons?.map((Component, index) => (
              <Component key={index} />
            ))}
          </ButtonsContainer>
        )}
        <SizedBox height={24} />
      </Root>
    </Dialog>
  );
};

type TBuildSuccessLiquidityDialogParamsProps = {
  amount: string;
  symbol: string;
  onClose: () => void;
};
export const buildSuccessInvestDialogParams = ({
  amount,
  symbol,
  onClose,
}: TBuildSuccessLiquidityDialogParamsProps): IDialogNotificationProps => {
  return {
    description: `${amount} ${symbol} were successfully invested. You can check your investments on “My Investments” page.`,
    type: "success",
    buttons: [
      () => (
        <Link onClick={onClose} to="/dashboard" style={{ width: "100%" }}>
          <Button size="medium" fixed>
            Go to the pool page
          </Button>
        </Link>
      ),
    ],
  };
};
export const buildSuccessWithdrawDialogParams = ({
  onClose,
}: {
  onClose: () => void;
}): IDialogNotificationProps => {
  return {
    description: `You have successfully withdrawn funds.`,
    type: "success",
    buttons: [
      () => (
        <Button onClick={onClose} size="medium" fixed>
          Ok, cool
        </Button>
      ),
    ],
  };
};
export const buildLoadingDialogParams = (): IDialogNotificationProps => {
  return {
    title: `Please wait.`,
    description: `Do not close the page while the download is in progress.`,
    type: "loading",
    disableClose: true,
  };
};
export default DialogNotification;
