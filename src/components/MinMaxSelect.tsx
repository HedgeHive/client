import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";
import SizedBox from "@components/SizedBox";
import { Column, Row } from "./Flex";
import BN from "@src/utils/BN";
import useWindowSize from "@src/hooks/useWindowSize";
import BottomMenu from "@components/BottomMenu";
import Text from "@components/Text";
import Button from "@components/Button";
import AmountInput from "@screens/SwapScreen/TokenInput/AmountInput";
import BigNumberInput from "@screens/SwapScreen/BigNumberInput";

interface IOption {
  min?: BN;
  max?: BN;
}

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  option: IOption | null;
  onSave: (min: BN, max: BN) => void;
  title?: string;
}

const Root = styled.div<{ focused?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  white-space: nowrap;
  justify-content: space-between;
  padding: 10px 16px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ selected }) => (selected ? "#ffffff" : "#1f1e25")};
  background: ${({ selected }) => (selected ? "#1f1e25" : "#ffffff")};
  height: 40px;
  position: relative;
  cursor: pointer;
  box-sizing: border-box;

  & > .arrow {
    transform: rotate(-90deg);
    position: absolute;
    right: 16px;
  }

  .border-input {
    border-bottom: 1px solid #2a2a32;
  }

  .menu-arrow {
    transition: 0.4s;
    path {
      fill: ${({ selected }) => (selected ? "#ffffff" : "#747489")};
    }
    transform: ${({ focused }) =>
      focused ? "rotate(-90deg)" : "rotate(90deg)"};
  }
`;
const ToText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #a2a2c0;
  margin: 0 8px;
`;
const Select: React.FC<IProps> = ({ option, onSave, title, ...rest }) => {
  const { width } = useWindowSize();
  const [focused, setFocused] = useState(false);
  const [min, setMin] = useState(option?.min ?? BN.ZERO);
  const [max, setMax] = useState(option?.max ?? BN.ZERO);
  const handleApplyClick = () => {
    onSave(min, max);
    if (width && width <= 768) {
      setFocused(false);
    }
  };

  return width && width > 768 ? (
    <Tooltip
      config={{
        placement: "bottom-start",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      content={
        <Column crossAxisSize="max" style={{ width: 240 }}>
          <Row alignItems="center" justifyContent="space-between">
            <BigNumberInput
              decimals={8}
              placeholder="$ Min"
              renderInput={(props, ref) => (
                <AmountInput
                  {...props}
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid #3b3b46",
                  }}
                  ref={ref}
                />
              )}
              value={min}
              onChange={setMin}
              className="border-input"
            />
            <ToText>to</ToText>
            <BigNumberInput
              decimals={8}
              placeholder="$ Max"
              renderInput={(props, ref) => (
                <AmountInput
                  {...props}
                  style={{
                    textAlign: "left",
                    borderBottom: "1px solid #3b3b46",
                  }}
                  ref={ref}
                />
              )}
              value={max}
              onChange={setMax}
              className="border-input"
            />
          </Row>
          <SizedBox height={12} />
          <Button fixed kind="secondary" onClick={handleApplyClick}>
            Apply
          </Button>
        </Column>
      }
    >
      <Root
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused}
        selected={option == null}
        {...rest}
      >
        {title}
        <SizedBox width={10} />
        <ArrowIcon className="menu-arrow" />
      </Root>
    </Tooltip>
  ) : (
    <>
      <Root
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused}
        selected={option == null}
        {...rest}
      >
        {title}
        <SizedBox width={10} />
        <ArrowIcon className="menu-arrow" />
      </Root>
      <BottomMenu
        open={focused}
        onClose={() => setFocused(false)}
        header={
          <Text size="medium" weight={500}>
            {title}
          </Text>
        }
      >
        <SizedBox height={24} />
        <Row alignItems="center" justifyContent="space-between">
          <BigNumberInput
            decimals={8}
            placeholder="Min"
            renderInput={(props, ref) => (
              <AmountInput
                {...props}
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #3b3b46",
                }}
                ref={ref}
              />
            )}
            value={min}
            onChange={setMin}
            className="border-input"
          />
          <ToText>to</ToText>
          <BigNumberInput
            decimals={8}
            placeholder="Max"
            renderInput={(props, ref) => (
              <AmountInput
                {...props}
                style={{
                  textAlign: "left",
                  borderBottom: "1px solid #3b3b46",
                }}
                ref={ref}
              />
            )}
            value={max}
            onChange={setMax}
            className="border-input"
          />
        </Row>
        <SizedBox height={16} />
        <Button fixed kind="secondary" onClick={handleApplyClick}>
          Apply
        </Button>
      </BottomMenu>
    </>
  );
};
export default Select;
