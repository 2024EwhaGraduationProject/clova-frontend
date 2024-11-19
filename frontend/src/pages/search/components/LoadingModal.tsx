import styled from "styled-components";
import Lottie from "react-lottie-player";
import loadingAnimation from "@assets/loading.json";

export default function LoadingModal() {
  return (
    <BackgroundView>
      <ModalView>
        <Lottie
          animationData={loadingAnimation}
          style={{ display: "flex", width: "100%", height: "100%" }}
          play
          loop={true}
        />
        <Text>분실물을 찾아드릴게요.</Text>
        <LogoTxt>로딩중입니다.</LogoTxt>
      </ModalView>
    </BackgroundView>
  );
}

const BackgroundView = styled.section`
  position: absolute;
  inset: 0;
  ${({ theme }) => theme.effects.dimmed_40};

  backdrop-filter: blur(0.3rem);
`;

const ModalView = styled.section`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 3.2rem;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 16px 0 rgb(0 0 0 / 5%);
  transform: translate(-50%, -50%);
`;

export const LogoTxt = styled.p`
  margin-top: 1.5rem;
  font-family: WavvePADO-Regular;
  color: #28a745;
  font-style: normal;
  font-size: 1.3rem;
  font-weight: 400;
  text-align: center;
`;

export const Text = styled.p`
  margin-top: 1.5rem;
  text-align: center;
  ${({ theme }) => theme.fonts.Field};
`;
