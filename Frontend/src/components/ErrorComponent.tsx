import Container from "./Container";

const ErrorComponent = () => (
  <Container>
    <h2 className="text-2xl font-bold text-gray-500">
      Oops! Parece que hubo un problema!
    </h2>
    <p className="text-lg text-gray-400">Contactate con el administrador</p>
  </Container>
);

export default ErrorComponent;