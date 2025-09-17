import { Input, Textarea } from "@mui/joy";

import { ComponentType } from 'react';


interface FieldHelper {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  component: ComponentType<any>; 
  minRows?: number;
  slotProps?: any; 
  helper?: string;
}

export const fieldsHelper :FieldHelper[]= [
    {
      name: "name",
      label: "NAME",
      type: "text",
      placeholder: "Name",
      component: Input,
    },
    {
      name: "email",
      label: "EMAIL",
      type: "email",
      placeholder: "Abc@email.com",
      component: Input,
    },
    {
      name: "dob",
      label: "DATE OF BIRTH",
      type: "date",
      placeholder: "Date of Birth",
      component: Input,
      slotProps: {
        input: {
          max: new Date().toISOString().split("T")[0],
        }
      }
    },
    {
      name: "occupation",
      label: "OCCUPATION",
      type: "text",
      placeholder: "Occupation",
      component: Input,
      helper: "Enter 'Not working' if you are not working."
    },
    {
      name: "address",
      label: "ADDRESS",
      type: "text",
      placeholder: "Enter full address",
      component: Textarea,
      minRows: 3
    }
  ];