import { ReactNode, useState } from "react";
import Button from "../../Button";
import Modal from "../../Modal";
import Form from "./Form";
import Add from "../../../icons/Add";
import useError from "../../../hooks/useError";
import axios, { AxiosError } from "axios";
import Close from "../../../icons/Close";
import { saveToLocalStorage } from "../../../utils/localStorage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../../ErrorComponent";

type CreatePatientProps = {
  trigger?: ReactNode;
};

const Page = ({ trigger }: CreatePatientProps) => (
  <ErrorBoundary fallback={<ErrorComponent />}>
    <CreatePatient trigger={trigger} />
  </ErrorBoundary>
);

const CreatePatient = ({ trigger }: CreatePatientProps) => {
  const { handleError, clearError, addError, error: formError } = useError();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [errorOpen, setErrorOpen] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError>();

  const handleModal = () => setIsOpen(!isOpen);

  const handleErrorModal = () => setErrorOpen(!isOpen);

  const createPatient = async (body: PatientType) => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/patients`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setIsOpen(false);
        saveToLocalStorage(response.data);
        location.reload();
      })
      .catch((error) => {
        setErrorOpen(true);
        setError(error);
        console.error(error);
      });
  };

  return (
    <>
      {trigger ? (
        <span onClick={handleModal}>{trigger}</span>
      ) : (
        <Button
          variant="outline"
          onClick={handleModal}
          rounded={true}
          size="rounded"
        >
          <Add />
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={handleModal} size="lg">
        <h2 className="text-2xl mb-8">Crear paciente</h2>
        <Form
          handleSubmit={createPatient}
          handleModal={handleModal}
          addError={addError}
          clearError={clearError}
          handleError={handleError}
          formError={formError}
        />
      </Modal>
      <Modal isOpen={errorOpen} onClose={handleErrorModal} size="lg">
        <div className="flex justify-center items-center flex-col gap-4">
          <div className="bg-red-300/50 rounded-full mb-2 h-14 w-14">
            <Close size={56} />
          </div>
          <h2 className="text-2xl">Error</h2>
          {error && (
            <p className="mb-6">
              {(error.response?.data as { msg: string }).msg}
            </p>
          )}
          <Button variant="danger" fullWidth onClick={handleErrorModal}>
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Page;
