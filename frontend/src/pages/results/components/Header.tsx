import { BackIc } from "@assets/index";
import { BtnWrapper } from "@styles/commonStyle";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  title: string;
  url: string;
}

export default function Header(props: Props) {
  const { title, url } = props;
  const navigate = useNavigate();
  return (
    <Container>
      <BtnWrapper type="button" onClick={() => navigate(`${url}`)}>
        <BackIcon />
      </BtnWrapper>
      <Title>{title}</Title>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  padding: 2rem;
  background-color: #f9f9f9;
`;

const Title = styled.p`
  ${({ theme }) => theme.fonts.Field};

  color: black;
  font-size: 2rem;
  font-weight: 600;
  text-align: left;
`;

const BackIcon = styled(BackIc)`
  position: absolute;
  top: 2rem;
  left: 1rem;
  width: 2.4rem;
  height: 2.4rem;
`;
