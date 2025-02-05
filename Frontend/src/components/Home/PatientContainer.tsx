import Accordion from "../Accordion/Accordion";
import useFetch from "../../hooks/useFetch";
import CreatePatient from "./Create/CreatePatient";
import Button from "../Button";
import { ErrorBoundary } from "react-error-boundary";
import Container from "../Container";
import AccordionRow from "../Accordion/AccordionRow";
import ErrorComponent from "../ErrorComponent";

const Page = () => (
  <ErrorBoundary fallback={<ErrorComponent />}>
    <PatientContainer />
  </ErrorBoundary>
);

const PatientContainer = () => {
  const { data, error, loading } = useFetch<PatientResponse[]>("/api/patients");

  if (error) return <ErrorComponent />;

  if (loading) return <PatientContainerSkeleton />;

  return data && data.length ? (
    <div className="sm:m-4">
      {data.map((patient, index) => (
        <Accordion
          key={patient.id || index}
          title={patient.name}
          image={patient?.photo || ""}
          index={index}
          length={data.length}
        >
          <AccordionRow title="Name:" value={patient.name} />
          <AccordionRow title="E-mail:" value={patient.email} />
          <AccordionRow title="Direccion:" value={patient.address} />
          <AccordionRow title="Teléfono:" value={patient.phone} />
        </Accordion>
      ))}
    </div>
  ) : (
    <Container>
      <h2 className="text-2xl font-bold text-gray-500">
        No hay pacientes, empeza por agregar uno!
      </h2>
      <CreatePatient
        trigger={
          <Button variant="primary" size="lg">
            Crear
          </Button>
        }
      />
    </Container>
  );
};

const PatientContainerSkeleton = () => {
  return [0, 1, 2, 3].map((index) => (
    <div
      className="w-full bg-gray-200 shadow-none min-h-20 rounded-lg animate-pulse border-b-1 border-gray-100"
      key={index}
    />
  ));
};

export default Page;
