import styled from "styled-components";
import { LeftArrowIc, RightArrowIc } from "@assets/index";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 0 1rem 80rem;
  background-color: #f9f9f9;
`;

export const Text = styled.div`
  margin-top: 6rem;
  margin-bottom: 1.6rem;

  ${({ theme }) => theme.fonts.Field};

  color: black;
  font-size: 1.4rem;
  font-weight: 400;
`;

export const Pagination = styled.div<{ $isScrolled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${({ $isScrolled }) => ($isScrolled ? "8rem 1rem 1rem" : "14rem 1rem 1rem")};
`;

export const ArrowButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  transition: color 0.3s ease;

  &:focus {
    outline: none;
  }
`;

export const RightArrowIcon = styled(RightArrowIc)`
  position: absolute;
  top: 50%;
  right: 7%;
  width: 2.4rem;
  height: 2.4rem;
`;

export const LeftArrowIcon = styled(LeftArrowIc)`
  position: absolute;
  top: 50%;
  left: 7%;
  width: 2.4rem;
  height: 2.4rem;
`;

export const Item = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.4rem 0;
  border-radius: 10px;
  background: #f1f0f0;
  box-shadow: 4px 4px 4px 4px rgb(0 0 0 / 25%);
`;

export const Image = styled.img`
  width: 29.7rem;
  height: 29.7rem;
  margin-bottom: 1.5rem;
  border-radius: 10px;
  object-fit: cover;
`;

export const Label = styled.p`
  align-items: center;
  color: #495057;
  font-size: 1.3rem;
  font-weight: 400;
`;

export const Location = styled.p`
  color: #197a3a;
  font-size: 2rem;
  font-weight: 700;
`;

export const Date = styled.p`
  color: black;
  font-size: 1.4rem;
  font-weight: 500;
`;

export const Details = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding: 1.2rem 0;
`;
