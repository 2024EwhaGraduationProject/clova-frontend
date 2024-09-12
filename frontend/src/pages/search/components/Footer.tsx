import styled from "styled-components";
import { ActvFooterSearchIc, FooterLocationIc, FooterMyIc } from "assets/index";
import { useNavigate } from "react-router-dom";
import { BtnWrapper } from "@styles/commonStyle";

export default function Footer() {
  const navigate = useNavigate();

  function moveToMypage() {
    navigate("/mypage");
  }

  /**검색하기 */
  function moveToExplore() {
    navigate("/search");
  }

  function moveToPosts() {
    navigate("/found/all");
  }

  return (
    <Container>
      <BtnWrapper type="button" onClick={moveToPosts}>
        <FooterLocationIcon />
        <DeactivateText>습득물</DeactivateText>
      </BtnWrapper>
      <BtnWrapper type="button" onClick={moveToExplore}>
        <ActvFooterSearchIcon />
        <ActivateText>검색하기</ActivateText>
      </BtnWrapper>
      <BtnWrapper type="button" onClick={moveToMypage}>
        <FooterMyIcon />
        <DeactivateText>마이페이지</DeactivateText>
      </BtnWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0.8rem 0 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const DeactivateText = styled.p`
  ${({ theme }) => theme.fonts.Footer};

  color: #7e7e7e;
`;

const ActivateText = styled.p`
  ${({ theme }) => theme.fonts.Footer};

  color: black;
`;

const FooterLocationIcon = styled(FooterLocationIc)`
  width: 2.4rem;
  height: 2.4rem;
`;

const FooterMyIcon = styled(FooterMyIc)`
  width: 2.4rem;
  height: 2.4rem;
`;

const ActvFooterSearchIcon = styled(ActvFooterSearchIc)`
  width: 2.4rem;
  height: 2.4rem;
`;
