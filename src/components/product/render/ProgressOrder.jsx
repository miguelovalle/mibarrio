import React, { useState } from "react";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useGetOrder } from "../../../hooks/orderHooks";
export const ProgressOrder = ({ orderId }) => {
  const statesArray = ["En Cola", "Produccion", "Transito", "Entregado"];
  // const [activeStep, setActiveStep] = useState(1);
  let activeIndex = 0;
  const result = useGetOrder(orderId, activeIndex);

  let activeStep = result?.data?.stateChange;
  activeIndex = statesArray.indexOf(activeStep) + 1;

  const steps = [
    { title: "En Cola" },
    { title: "Proceso", description: "Alistando" },
    { title: "En Tránsito", description: "En camino" },
  ];

  const index = steps.findIndex(function (step) {
    return step.title === activeStep;
  });

  return (
    <Box>
      <Stepper index={activeIndex}>
        {steps.map((step, idx) => (
          <Step key={idx}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};
