import React, { useEffect, useState } from "react";
import {
  Box,
  CloseButton,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
} from "@chakra-ui/react";
import { useGetOrder } from "../../../hooks/orderHooks";
import { ModalRating } from "../ModalRating";
export const ProgressOrder = ({ orderId }) => {
  const dateOrder = new Date();

  const [showModal, setshowModal] = useState(false);

  const dateOrderstr = dateOrder.toLocaleDateString();

  const timeOrder = dateOrder.toLocaleTimeString();

  const statesArray = ["En Cola", "Produccion", "Transito", "Entregado"];
  // const [activeStep, setActiveStep] = useState(1);
  let activeIndex = 0;

  const result = useGetOrder(orderId, activeIndex);

  let activeStep = result?.data?.stateChange;

  const commerceId = result?.data?.commerceId;

  activeIndex = statesArray.indexOf(activeStep) + 1;

  const steps = [
    { title: "Cola", description: "En Cola" },
    { title: "Proceso", description: "Alistando" },
    { title: "Tránsito", description: "En camino" },
    { title: "Entregado", description: "Entregado" },
  ];

  const index = steps.findIndex(function (step) {
    return step.title === activeStep;
  });
  useEffect(() => {
    activeStep === "Entregado" && setshowModal(true);
  }, [activeStep]);

  return (
    <Box borderWidth="1px" borderRadius="lg" w={[430, 600]} m={2}>
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"row"}
        gap={"8"}
        justifyContent={"space-between"}
        m={2}
      >
        <Text fontSize={["10px", "12px", "14px"]}>
          Orden del {dateOrderstr} a las {timeOrder}
        </Text>
      </Box>
      <Stepper size={["sm", "md"]} gap={["0", "2"]} index={activeIndex}>
        {steps.map((step, idx) => (
          <Step key={idx} gap={["0", "2"]}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <ModalRating
        commerceId={commerceId}
        showModal={showModal}
        setshowModal={setshowModal}
      />
    </Box>
  );
  sho;
};
