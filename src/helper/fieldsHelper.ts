import { Input, Textarea} from "@mui/joy";

import { ComponentType } from "react";

interface FieldHelper {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  component: ComponentType<any>;
  minRows?: number;
  slotProps?: {
  input?: React.InputHTMLAttributes<HTMLInputElement>;
};
  helper?: string;
}

export const fieldsHelper: FieldHelper[] = [
  {
    name: "name",
    label: "NAME",
    type: "text",
    placeholder: "Name",
    component: Input,
    slotProps: {
      input: {
        pattern: "^[A-Z][A-Za-z ]+$",
        title: "First Letter Should be Capital. Name should only contain letters and spaces",
      },
    },
  },
  {
    name: "email",
    label: "EMAIL",
    type: "email",
    placeholder: "Abc@email.com",
    component: Input,
    slotProps: {
      input: {
        pattern: "^[A-Za-z0-9._#+]+@[A-Za-z0-9.]+\\.[A-Za-z]{2,}$",
        title: "Enter a valid email address",
      },
    },
  },
  {
    name: "dob",
    label: "DATE OF BIRTH",
    type: "date",
    placeholder: "Date of Birth",

    component: Input,
    slotProps: {
      input: {
        min: "1940-01-01",
        max: new Date().toISOString().split("T")[0],
      },
    },
  },
  {
    name: "occupation",
    label: "OCCUPATION",
    type: "text",
    placeholder: "Occupation",
    component: Input,
    slotProps: {
      input: {
        pattern: "^[A-Za-z ]+$",
        title: "Occupation should only contain letters and spaces",
      },
    },
    helper: "Enter 'Not working' if you are not working.",
  },
  {
    name: "address",
    label: "ADDRESS",
    type: "text",
    placeholder: "Enter full address",
    component: Textarea,
      slotProps: {
      input: {
        pattern: "^[A-Za-z0-9 ]+$",
        title: "Address can contain letters,numbers and spaces",
      },
    },
    minRows: 3,
  },
];
