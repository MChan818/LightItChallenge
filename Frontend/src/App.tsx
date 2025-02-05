import PatientContainer from "./components/Home/PatientContainer";
import "./App.css";
import ActionBar from "./components/ActionBar";

function App() {
  return (
    <div className="app">
      <ActionBar />
      <div className="w-full sm:w-1/2">
        <PatientContainer />
      </div>
    </div>
  );
}

export default App;
