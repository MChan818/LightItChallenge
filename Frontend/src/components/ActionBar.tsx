import CreatePatient from "./Home/Create/CreatePatient";

const ActionBar = () => {
  return (
    <div className="w-full h-28 bg-zinc-800 sm:mb-12 flex justify-end items-end p-4">
      <div>
        <CreatePatient />
      </div>
    </div>
  );
};

export default ActionBar;
