import Input from "../../../Input";

type PhoneNumberProps = {
  countryCode: string;
  phoneNumber: string;
  handleCountryCodeChange: (value: string) => void;
  handlePhoneNumberChange: (value: string) => void;
};

const PhoneNumber = ({
  countryCode,
  phoneNumber,
  handleCountryCodeChange,
  handlePhoneNumberChange,
}: PhoneNumberProps) => {
  return (
    <div className="flex w-full flex-row items-center">
      <Input
        label="Country number"
        value={countryCode}
        onChange={handleCountryCodeChange}
        placeholder="ex: 11-1234-5678"
        type="number"
      />
      <Input
        label="Phone number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="ex: 11-1234-5678"
        type="number"
      />
    </div>
  );
};

export default PhoneNumber;
