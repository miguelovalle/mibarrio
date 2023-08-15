import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogOverlay,
  Button,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export const DialogLogin = ({ isOpen, onClose }) => {
  const cancelRef = useRef();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["login"]);

  return (
    <Container>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogBody>
              Complétanos tus datos para entregar pedido
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button
                onClick={() => {
                  navigate("/registro");
                  onClose();
                }}
              >
                Nuevo Usuario
              </Button>
              <Button
                ref={cancelRef}
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
              >
                iniciar Cesion
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  );
};
