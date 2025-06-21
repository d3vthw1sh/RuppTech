import { FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Field, useField } from 'formik';

const TextField = ({ label, type = "text", name, placeholder }) => {
  const [field, meta] = useField({ type, name, placeholder });

  return (
    <FormControl isInvalid={meta.touched && meta.error} mb={6}>
      <FormLabel noOfLines={1}>{label}</FormLabel>
      <Field as={Input} {...field} type={type} placeholder={placeholder} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;
