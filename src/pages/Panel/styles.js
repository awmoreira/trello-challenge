import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  padding-bottom: 8px;
  flex: 1;
`;

export const ListContainter = styled.div`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  overflow-x: auto;
  padding: 8px;

  /* width */
  ::-webkit-scrollbar {
    height: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.15);
    margin: 8px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(9, 30, 66, 0.3);
    border-radius: 10px;
  }
`;

export const LabelFilter = styled.div`
  padding: 4px 4px 0 8px;
  display: grid;
  grid-auto-flow: column;
  column-gap: 8px;
  justify-content: start;
`;

export const LabelBtn = styled.button`
  background: ${({ color }) => color};
  padding: 4px 12px;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;

const loading = keyframes`
  0%{
    transform-origin: top left;
    transform: scaleX(0);
  }
  49%{
    transform-origin: top left;
    transform: scaleX(1);
  }
  50%{
    transform-origin: top right;
    transform: scaleX(1);
  }
  100%{
    transform-origin: top right;
    transform: scaleX(0);
  }
`;

export const Loader = styled.div`
  background: ${({ theme }) => theme.transparencyLight};
  width: 100%;
  height: 8px;
  animation: ${loading} 2s linear infinite;
  transform-origin: top left;
`;
