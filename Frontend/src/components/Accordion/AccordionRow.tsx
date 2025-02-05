const AccordionRow = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <div className="flex justify-between items-center">
      <span>{title}</span>
      <span>{value}</span>
    </div>
  );
};

export default AccordionRow;
