import styled from "styled-components";
import { FooterLocationIc, FooterMyIc, FooterSearchIc } from "assets/index";
import { useNavigate } from "react-router-dom";

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
      <DeAcvBtnWrapper type="button" onClick={moveToPosts}>
        <FooterLocationIcon />
        <DeactivateText>습득물</DeactivateText>
      </DeAcvBtnWrapper>
      <DeAcvBtnWrapper type="button" onClick={moveToExplore}>
        <FooterSearchIcon />
        <DeactivateText>검색하기</DeactivateText>
      </DeAcvBtnWrapper>
      <AcvBtnWrapper type="button" onClick={moveToMypage}>
        <FooterMyIcon />
        <ActivateText>마이페이지</ActivateText>
      </AcvBtnWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0.2rem 0 2rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

const AcvBtnWrapper = styled.button`
  padding: 0;
  padding: 0 1rem;
  border: none;
  border-radius: 10px;
  background: none;
  background-color: rgb(25 122 58 / 50%);
  cursor: pointer;
`;

const DeAcvBtnWrapper = styled.button`
  padding: 0 1rem;
  border: none;
  background: none;
  cursor: pointer;
`;

const DeactivateText = styled.p`
  ${({ theme }) => theme.fonts.Footer};

  color: #3f3e3e;
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

const FooterSearchIcon = styled(FooterSearchIc)`
  width: 2.4rem;
  height: 2.4rem;
`;
