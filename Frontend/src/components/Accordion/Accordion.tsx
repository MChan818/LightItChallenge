import { useState } from "react";
import Chevron from "../../icons/Chevron";
import { tv } from "tailwind-variants";

import defaultImage from "../../../public/assets/noimg.png";

interface AccordionProps {
  title: string;
  image?: string;
  children: React.ReactNode;
  index: number;
  length: number;
}

export default function Accordion({
  title,
  image,
  children,
  index,
  length,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const accordionStyles = tv({
    base: "w-full border-1 border-gray-200 shadow-none min-h-20",
    variants: {
      first: {
        true: "sm:rounded-t-2xl",
        false: "",
      },
      last: {
        true: "sm:rounded-b-2xl",
        flase: "",
      },
    },
  });

  const buttonStyles = tv({
    base: "min-h-20 flex items-center w-full p-4 bg-gray-50 hover:bg-gray-100 transition hover:cursor-pointer",
    variants: {
      first: {
        true: "sm:rounded-t-2xl",
        false: "",
      },
      last: {
        true: "sm:rounded-b-2xl",
        flase: "",
      },
    },
  });

  const handleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className={accordionStyles({
        first: index === 0,
        last: index === length - 1,
      })}
    >
      <button
        onClick={handleOpen}
        className={buttonStyles({
          first: index === 0,
          last: index === length - 1,
        })}
      >
        <picture>
          <source srcSet={image} className="w-10 h-10 rounded-full mr-3" />
          <img
            src={defaultImage}
            alt="avatar"
            className="w-10 h-10 rounded-full mr-3"
          />
        </picture>

        <span className="text-lg font-medium flex-1 text-left">{title}</span>
        <Chevron className={`${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 opacity-100 p-4" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
