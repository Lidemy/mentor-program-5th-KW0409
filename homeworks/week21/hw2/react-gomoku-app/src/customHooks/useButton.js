import { useCallback } from "react";

export default function useButton(setBoardState) {
  const handleBack = useCallback(() => {
    setBoardState((prevState) => {
      let currentStep = prevState.stepRound;
      if (!currentStep) {
        alert("沒有上一步了！");
        return prevState;
      }

      const newStep = --currentStep;
      return {
        ...prevState,
        stepRound: newStep,
        roundBlack: newStep % 2 === 0,
      };
    });
  }, []);

  const handleForward = useCallback(() => {
    setBoardState((prevState) => {
      let currentStep = prevState.stepRound;
      const latestStep = prevState.history.length - 1;
      if (currentStep === latestStep) {
        alert("沒有下一步了了！");
        return prevState;
      }

      const newStep = ++currentStep;
      return {
        ...prevState,
        stepRound: newStep,
        roundBlack: newStep % 2 === 0,
      };
    });
  }, []);

  const handleRestart = useCallback(() => {
    setBoardState((prevState) => {
      const latestStep = prevState.history.length - 1;
      if (!latestStep) {
        alert("已經是新的一局了！");
        return prevState;
      }

      const newStep = 0;
      const newHistory = prevState.history.slice(0, 1);
      return {
        history: newHistory,
        stepRound: newStep,
        roundBlack: newStep % 2 === 0,
      };
    });
  }, []);

  const buttonArr = [
    {
      description: "上一步",
      handleClick: handleBack,
    },
    {
      description: "下一步",
      handleClick: handleForward,
    },
    {
      description: "重新開始",
      handleClick: handleRestart,
    },
  ];

  return buttonArr;
}
