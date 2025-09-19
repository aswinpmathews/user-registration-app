import React, {  useState } from "react";
import { addUser } from '../store/thunks/userThunks'
import UserDetail from "../types/User";

import { useNavigate } from "react-router-dom";
import { Typography,FormHelperText,FormControl,FormLabel ,Button, Box} from "@mui/joy";
import { fieldsHelper } from "../helper/fieldsHelper";
import { useSelector } from "react-redux";
import {  selectIsLoading } from "../store/slice/UserSlice";
import { useAppDispatch } from "../Custom/custom";


function UserForm(){
  const navigate=useNavigate();
  const dispatch=useAppDispatch()
  const isAddingUser=useSelector(selectIsLoading)
 const [addError,setAddError]=useState<string|null>(null)

    const [formData,setFormData]=useState<UserDetail >({
        name:'',
        email:'',
        occupation:'',
        dob:'',
        address:''
    })
    const [error,setError]=useState<Record<string,string>>({})
    const validate=()=>{
      const newErrors:{[key:string]:string}={};
      if(!formData.name.trim()) newErrors.name="Name is required";
      else if(formData.name.length<3) newErrors.name="Name must be at least 3 characters";
      else if(formData.name[0]!==formData.name[0].toUpperCase()) newErrors.name='The First Letter should be Capital'
      if(!formData.email.trim()) newErrors.email="Email is required";
      else if(!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email="Invalid Email Format";
      if(!formData.occupation.trim()) newErrors.occupation="Occupation is required";
      else  if(formData.occupation.length<3) newErrors.occupation="Occupation must be at least 3 characters";
      else if(formData.occupation[0]!==formData.occupation[0].toUpperCase()) newErrors.occupation='The First Letter should be Capital'
      if(!formData.dob.trim()) newErrors.dob="Date of Birth is required";
      else if (new Date(formData.dob) > new Date()) newErrors.dob="Date of Birth cannot be in the future";
      else if(calculateAge(formData.dob)<18) newErrors.dob="Age must be at least 18 years";
      else if(calculateAge(formData.dob)>120) newErrors.dob="Age must be less than 120 years";  
      if(!formData.address.trim()) newErrors.address="Address is required";

      return newErrors;
      
    }
    function calculateAge(dob:string):number {
      const birth = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if(monthDiff<0 || (monthDiff===0 && today.getDate()<birth.getDate())){
        age--;
      }
      return age;
    } 


    const handleChange=(event:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
        const {name,value}=event.target
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
 
    }
  

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();

  const validationErrors = validate();
  if(Object.keys(validationErrors).length > 0){
  setError(validationErrors);
  return;
  }
  try{
        setError({})

        await dispatch(
          addUser({
          ...formData,
          age: calculateAge(formData.dob) , 
        })
      ).unwrap()
        navigate('/users');
      }
        catch(err){
          if (typeof err ==='string'){
            setAddError(err)
          }          
          console.error(`FAILURE: Caught error in handleSubmit. Navigation prevented.  ${err}`);
        }

  };      
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent);
    }
  }

  return <Box>

  {isAddingUser ? <Box> <Typography>Adding User Details</Typography> </Box> 
  : addError ? <Box><Typography>Error Adding User Details...</Typography></Box> 
  :
  <Box>
     
<Typography level="h2" component="h1"
      sx={{
        justifyContent: 'center',
        display: 'flex',
        mb: 4,
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'noto-sans',
      }}>
    User Details
  </Typography>
    <Box>Please Enter Your Details</Box>
    <Box>
<Box>
 {fieldsHelper.map(field=>(
      <FormControl
                key={field.name}
                error={!!error[field.name]}
                required
                sx={{ mb: 2 }}
              >
                <FormLabel sx={{ fontWeight: 'bold' }}>{field.label}</FormLabel>
                <field.component
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name as keyof UserDetail]}
                  onChange={handleChange}
                  minRows ={field.minRows||undefined}
                  slotProps={field.slotProps}
                  onKeyDown={handleKeyDown}
                />
                {error[field.name] && (
                  <FormHelperText>{error[field.name]}</FormHelperText>
                )}
                {!error[field.name] && field.helper && (
                  <FormHelperText>{field.helper}</FormHelperText>
                )}
              </FormControl>
            ))}
            <Button type="submit" variant="solid" onClick={handleSubmit}>Submit</Button>

   </Box> </Box>
  </Box>
  }
  </Box>
    
}

export default UserForm;