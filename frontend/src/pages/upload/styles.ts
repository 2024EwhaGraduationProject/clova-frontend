import styled from "styled-components";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100dvh;
  padding: 2rem;
  background-color: white;
`;

export const NotiText = styled.p`
  padding: 0.8rem 0 1rem;
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;

export const OptionText = styled.p`
  padding: 0.8rem 0 1rem;
  color: #555;
  font-size: 1.2rem;
  text-align: center;
`;

export const Form = styled.div`
  width: 100%;
  max-width: 400px;
`;

export const FormGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
`;

export const Dropdown = styled.select`
  width: 100%;
  padding: 2rem 1.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffe066;
  outline: none;
  ${({ theme }) => theme.fonts.Category};
`;

export const Option = styled.option`
  padding: 1.8rem;
  ${({ theme }) => theme.fonts.Category};

  cursor: pointer;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  padding: 1.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1.4rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #28a745;
  }
`;

export const TextArea = styled.textarea`
  overflow: hidden;
  width: 100%;
  padding: 1.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;

  ${({ theme }) => theme.fonts.TextArea};

  font-size: 1.4rem;
  transition: border-color 0.3s ease;
  outline: none;
  resize: none;

  &:focus {
    border-color: #28a745;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  margin: 20px 0;
  border: none;
  border-top: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  width: 100%;
  ${({ theme }) => theme.fonts.Field};

  max-width: 320px;
  margin-top: 2rem;
  padding: 0.85rem;
  border: none;
  border-radius: 8px;
  background-color: #197a3a;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background-color: #197a3a;
    box-shadow: 0 4px 12px rgb(0 10 2 / 40%);
  }

  &:active {
    background-color: #197a3a;
  }

  &:disabled {
    background-color: #ced4da;
    cursor: not-allowed;
  }
`;

export const FooterText = styled.p`
  margin-top: 20px;
  color: #666;
  font-size: 1rem;
  text-align: center;
`;

export const ErrorText = styled.span`
  margin-top: 0.5rem;
  color: #dc3545;
  font-size: 1rem;
`;
