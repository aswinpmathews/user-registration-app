import React, { useState } from "react";
import { addUser } from "../store/thunks/userThunks";
import UserDetail from "../types/User";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  FormHelperText,
  FormControl,
  FormLabel,
  Button,
  Box,
} from "@mui/joy";
import { fieldsHelper } from "../helper/fieldsHelper";
import { selectIsLoading } from "../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../Custom/custom";
import { IoHome } from "react-icons/io5";



function UserForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAddingUser = useAppSelector(selectIsLoading);
  const [addError, setAddError] = useState<string | null>(null);

  const [formData, setFormData] = useState<UserDetail>({
    name: "",
    email: "",
    occupation: "",
    dob: "",
    address: "",
  });

  function calculateAge(dob: string): number {
    const birth = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      addUser({
        ...formData,
        age: calculateAge(formData.dob),
      })
    )
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err: string) => {
        setAddError(err);

        console.error(
          `FAILURE: Caught error in handleSubmit. Navigation prevented.  ${err}`
        );
      });
  };

  return (
    <Box>
      {isAddingUser ? (
        <Box>
          <Typography>Adding User Details</Typography>{" "}
        </Box>
      ) : addError ? (
        <Box>
          <Typography>Error Adding User Details...</Typography>
        </Box>
      ) : (
        <Box>
          <Button startDecorator={<IoHome />} onClick={()=>navigate('/')}>Home</Button>
          <Typography
            level="h2"
            component="h1"
            sx={{
              justifyContent: "center",
              display: "flex",
              mb: 4,
              fontSize: "2rem",
              fontWeight: "bold",
              fontFamily: "noto-sans",
            }}
          >
            USER FORM
          </Typography>
          <Box>Please Enter Your Details</Box>

          <form onSubmit={handleSubmit}>
            {fieldsHelper.map((field) => (
              <FormControl key={field.name} required sx={{ mb: 2 }}>
                <FormLabel sx={{ fontWeight: "bold" }}>{field.label}</FormLabel>
                <field.component
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof UserDetail]}
                  onChange={handleChange}
                  minRows={field.minRows || undefined}
                  slotProps={field.slotProps}
                />
                {field.helper && (
                  <FormHelperText>{field.helper}</FormHelperText>
                )}
              </FormControl>
            ))}
            <Button type="submit" variant="solid">
              Submit
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default UserForm;
