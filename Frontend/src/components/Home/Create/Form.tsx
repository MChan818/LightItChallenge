import { useState } from "react";
import Input from "../../Input";
import ImageUploader from "../../ImageUploader";
import Button from "../../Button";
import { InputFields } from "../../../constants/InputFields";
import { ErrorInputType } from "../../../types/error-input-type";

type FormProps = {
  handleSubmit: (body: PatientType) => Promise<void>;
  handleModal: () => void;
  handleError: (id: InputFields) => ErrorInputType | undefined;
  addError: (error: ErrorInputType) => void;
  clearError: (id: InputFields) => void;
  formError: ErrorInputType[];
};

const Form = ({
  handleSubmit,
  handleModal,
  handleError,
  clearError,
  addError,
  formError,
}: FormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");
  const [photo, setPhoto] = useState<string | undefined>();

  const isDisabled: boolean =
    !name ||
    !email ||
    !address ||
    !phoneNumber ||
    !countryCode ||
    !!formError.length;

  const handleImageUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPhoto(reader.result as string);
      };
    }
  };

  const handleName = (value: string) => {
    const regex: RegExp = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setName(value);
    }
  };

  const handleEmail = (value: string) => {
    setEmail(value);
    const regex: RegExp = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      addError({
        error: true,
        msg: "Please provide a valid email address.",
        field: InputFields.EMAIL,
      });
    } else if (!value.endsWith("@gmail.com")) {
      addError({
        error: true,
        msg: "The email must be a Gmail address.",
        field: InputFields.EMAIL,
      });
    } else {
      clearError(InputFields.EMAIL);
    }
  };

  const handleCountryCodeChange = (value: string) => {
    setCountryCode(value);

    // Validating the country code: 1 to 3 digits
    const countryCodeRegex = /^[0-9]{1,3}$/;
    if (!countryCodeRegex.test(value)) {
      addError({
        error: true,
        msg: "Country code must be between 1 and 3 digits.",
        field: InputFields.COUNTRY_NUMBER,
      });
    } else {
      clearError(InputFields.COUNTRY_NUMBER);
    }
  };

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);

    // Validating the phone number: 7 to 15 digits
    const phoneNumberRegex = /^[0-9]{7,15}$/;
    if (!phoneNumberRegex.test(value)) {
      addError({
        error: true,
        msg: "Phone number must be between 7 and 15 digits.",
        field: InputFields.PHONE_NUMBER,
      });
    } else {
      clearError(InputFields.PHONE_NUMBER);
    }
  };

  const getPhoneNumber = () => {
    return countryCode + phoneNumber;
  };

  return (
    <div>
      <Input
        label={InputFields.NAME}
        value={name}
        onChange={handleName}
        placeholder="Your name"
        type="text"
      />
      <Input
        label="E-mail"
        value={email}
        onChange={handleEmail}
        placeholder="ex: hello@gmail.com"
        type="email"
        error={handleError(InputFields.EMAIL)}
      />
      <Input
        label="Address"
        value={address}
        onChange={setAddress}
        placeholder="ex: Puan 1423"
      />
      <div className="flex w-full flex-row items-center gap-8">
        <Input
          label="Country number"
          value={countryCode}
          onChange={handleCountryCodeChange}
          placeholder="ex: 11-1234-5678"
          type="number"
          error={handleError(InputFields.COUNTRY_NUMBER)}
        />
        <Input
          label="Phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          placeholder="ex: 11-1234-5678"
          type="number"
          error={handleError(InputFields.PHONE_NUMBER)}
        />
      </div>
      <ImageUploader onImageUpload={handleImageUpload} />
      <div className="flex justify-end mt-8 gap-4">
        <Button variant="danger" onClick={handleModal}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() =>
            handleSubmit({
              name,
              email,
              address,
              phone: getPhoneNumber(),
              photo,
            })
          }
          disabled={isDisabled}
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default Form;
