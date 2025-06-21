import { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { Field, useField } from "formik";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const PasswordField = ({ label, name, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ name });

  return (
    <FormControl isInvalid={meta.touched && meta.error} mb={6}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <Field
          as={Input}
          {...field}
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
        />
        <InputRightElement height="100%">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            _hover={{ bg: "transparent" }}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordField;
