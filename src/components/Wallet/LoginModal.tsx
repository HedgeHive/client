import React from "react";
import Dialog from "@components/Dialog";
import { LOGIN_TYPE } from "@stores/AccountStore";
import LoginType from "./LoginType";
import seed from "@src/assets/icons/seed.svg";
import email from "@src/assets/icons/email.svg";
import keeper from "@src/assets/icons/keeper.svg";
import metamask from "@src/assets/icons/metamask.svg";
import { observer } from "mobx-react-lite";
import { useStores } from "@stores";
import SizedBox from "@components/SizedBox";
import { Anchor } from "@components/Anchor";
import Text from "@components/Text";

interface IProps {
  onClose: () => void;
  onLogin: (loginType: LOGIN_TYPE) => void;
  visible: boolean;
}

const LoginModal: React.FC<IProps> = ({ onLogin, ...rest }) => {
  const handleLogin = (loginType: LOGIN_TYPE) => () => {
    rest.onClose();
    onLogin(loginType);
  };
  const { accountStore } = useStores();
  const isKeeperDisabled = !accountStore.isWavesKeeperInstalled;
  const isMetamaskInstalled = typeof window?.ethereum !== "undefined";
  const loginTypes = [
    {
      title: "Waves Exchange Email",
      icon: email,
      type: LOGIN_TYPE.SIGNER_EMAIL,
      isActive: true,
    },
    {
      title: "Waves Exchange Seed",
      icon: seed,
      type: LOGIN_TYPE.SIGNER_SEED,
      isActive: true,
    },
    {
      title: "Waves Keeper",
      icon: keeper,
      type: LOGIN_TYPE.KEEPER,
      isActive: isKeeperDisabled,
    },
    {
      title: "Metamask",
      icon: metamask,
      type: LOGIN_TYPE.METAMASK,
      isActive: isMetamaskInstalled,
    },
  ];

  return (
    <Dialog style={{ maxWidth: 360 }} title="Connect wallet" {...rest}>
      {loginTypes.map((t) => (
        <LoginType
          {...t}
          key={t.type}
          onClick={t.isActive ? handleLogin(t.type) : undefined}
        />
      ))}
      <SizedBox height={8} />
      <Text weight={500} textAlign="center">
        <span style={{ color: "#A2A2C0" }}> New to LineUp? </span>{" "}
        <Anchor
          target="_blank"
          rel="noreferrer noopener"
          href="https://puzzle-lend.gitbook.io/guidebook/get-started-on-waves/create-wallet"
        >
          Learn more about wallets
        </Anchor>
      </Text>
      <SizedBox height={16} />
    </Dialog>
  );
};
export default observer(LoginModal);
