import styled from "styled-components";
import { useCallback } from "react";

const Wrapper = styled.div`
  margin: 0 auto;
  width: 1000px;
`;

const StepContainer = styled.div`
  height: 220px;
  overflow: auto;
`;

const StepList = styled.ol`
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
`;

const StyledLi = styled.li`
  margin: 5px;
  display: inline-block;
`;

const ReStepButton = styled.button`
  padding: 5px 12px;
  font-size: 16px;
  color: #5a5a5a;
  background: #bebebe;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 1.8px 2.4px 5px 0 rgba(0, 0, 0, 0.3);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  ${(props) =>
    props.$active &&
    `
      color: #fff;
      background: #ff9900;
  `}

  ${(props) =>
    !props.$active &&
    `
      &:hover {
        color: #fff;
        background: #5a5a5a;
      }

      &:active {
        transform: scale(0.9);
      }
  `}
`;

function StepLi({ reStepNum, currentStep, handleReStep }) {
  console.log("render StepLi");

  const value = reStepNum ? `${reStepNum}` : `start`;

  return (
    <StyledLi>
      <ReStepButton
        $active={currentStep === reStepNum}
        onClick={() => handleReStep(reStepNum)}
      >
        {value}
      </ReStepButton>
    </StyledLi>
  );
}

export default function GameStep({ boardState, setBoardState }) {
  console.log("render GameStep");

  const handleReStep = useCallback((step) => {
    setBoardState((prevState) => {
      return {
        ...prevState,
        stepRound: step,
        roundBlack: step % 2 === 0,
      };
    });
  }, []);

  return (
    <Wrapper>
      <h2>Steps:</h2>
      <StepContainer>
        <StepList>
          {boardState.history.map((boardValues, stepIndex) => (
            <StepLi
              key={stepIndex}
              reStepNum={stepIndex}
              currentStep={boardState.stepRound}
              handleReStep={handleReStep}
            />
          ))}
        </StepList>
      </StepContainer>
    </Wrapper>
  );
}
