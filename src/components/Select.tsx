import styled from "@emotion/styled";
import React, { HTMLAttributes, useState } from "react";
import Tooltip from "./Tooltip";
import { ReactComponent as ArrowIcon } from "@src/assets/icons/arrowRightBorderless.svg";
import SizedBox from "@components/SizedBox";
import { Column } from "./Flex";
import useWindowSize from "@src/hooks/useWindowSize";
import BottomMenu from "@components/BottomMenu";
import Text from "@components/Text";

interface IOption {
  key: string;
  title: string;
}

interface IProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  options: IOption[];
  selected?: IOption;
  title: string;
  onSelect: (key: IOption) => void;
}

const Root = styled.div<{ focused?: boolean; selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: #1f1e25;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  white-space: nowrap;
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

  .menu-arrow {
    transition: 0.4s;
    path {
      fill: ${({ selected }) => (selected ? "#ffffff" : "#747489")};
    }
    transform: ${({ focused }) =>
      focused ? "rotate(-90deg)" : "rotate(90deg)"};
  }
`;
const Option = styled.div<{ active?: boolean }>`
  width: calc(100% - 16px);
  @media (min-width: 768px) {
    width: 100%;
  }
  display: flex;
  cursor: pointer;
  position: relative;
  align-items: center;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;

  padding: 10px 12px 10px 22px;
  margin: 0 -16px;
  white-space: nowrap;

  ${({ active }) => active && "background: #3B3B46; border-radius: 8px;"};

  @media (min-width: 768px) {
    ${({ active }) => active && "background: #3B3B46;"};
  }
`;

const Select: React.FC<IProps> = ({
  options,
  selected,
  onSelect,
  title,
  ...rest
}) => {
  const { width } = useWindowSize();
  const [focused, setFocused] = useState(false);
  return width && width > 768 ? (
    <Tooltip
      config={{
        placement: "bottom-start",
        trigger: "click",
        onVisibleChange: setFocused,
      }}
      content={
        <Column crossAxisSize="max" style={{ padding: "8px", minWidth: 180 }}>
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => {
                  onSelect(v);
                }}
              >
                {v.title}
              </Option>
            );
          })}
        </Column>
      }
    >
      <Root
        onClick={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        focused={focused}
        selected={selected == null}
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
        selected={selected == null}
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
        <Column crossAxisSize="max" style={{ margin: 8 }}>
          {options.map((v) => {
            const active = selected?.key === v.key;
            return (
              <Option
                active={active}
                key={v.key + "_option"}
                onClick={() => {
                  onSelect(v);
                  setFocused(false);
                }}
              >
                {v.title}
              </Option>
            );
          })}
        </Column>
      </BottomMenu>
    </>
  );
};
export default Select;
