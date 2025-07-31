// Import React
import { useState } from "react";

// Import Libraries
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  FormErrorMessage,
} from "@chakra-ui/react";

function ContactForm() {
  // State Variables
  const [errors, setErrors] = useState({});
  // Form Values
  const [values, setValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Email Validation with Regex
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  // Input Field Handle Change
  const handleChange = (field) => (e) => {
    // Set Values and Errors
    setValues((v) => ({ ...v, [field]: e.target.value }));
    setErrors((err) => ({ ...err, [field]: null }));
  };

  // Form Submission Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate Fields
    const newErrors = {};
    // Check if fields are empty or invalid
    // If no name, set error messages
    if (!values.name.trim()) newErrors.name = "Name is required";
    // If no email, set error messages
    if (!values.email.trim()) newErrors.email = "Email is required";
    // If email is invalid, set error messages
    else if (!validateEmail(values.email)) newErrors.email = "Invalid email";
    // If no message, set error messages
    if (!values.message.trim()) newErrors.message = "Message is required";
    // Set Errors to the state
    setErrors(newErrors);

    // If no errors, send email to my personal email
    if (Object.keys(newErrors).length === 0) {
      // Define Subject and Body for email
      const subject = encodeURIComponent(
        `Tune Finder Message From ${values.name}`
      );
      //
      const body = encodeURIComponent(
        `${values.message}\n\nFrom: ${values.name} (${values.email})`
      );
      // Redirect to mailto link with subject and body
      window.location.href = `mailto:fakemail@gmail.com?subject=${subject}&body=${body}`;
    }
  };

  return (
    // Contact Form Container
    <Box
      as="form"
      onSubmit={handleSubmit}
      maxW="500px"
      w="90%"
      role="form"
      aria-labelledby="Contact Us Form"
    >
      {/* Name Field */}
      {/* Form control handles the name input */}
      <FormControl mb={4} isInvalid={!!errors.name}>
        <FormLabel htmlFor="inputName">First and Last Name:</FormLabel>
        <Input
          id="inputName"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={values.name}
          onChange={handleChange("name")}
          bg="white"
          color="black"
          aria-required="true"
          aria-describedby={errors.name ? "nameError" : undefined}
        />
        <FormErrorMessage id="nameError">{errors.name}</FormErrorMessage>
      </FormControl>

      {/* Email Field */}
      {/* Form control handles the email input  */}
      <FormControl mb={4} isInvalid={!!errors.email}>
        <FormLabel htmlFor="emailInput">Email:</FormLabel>
        <Input
          id="emailInput"
          name="email"
          type="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={handleChange("email")}
          bg="white"
          color="black"
          aria-required="true"
          aria-describedby={errors.email ? "emailError" : undefined}
        />
        <FormErrorMessage id="emailError">{errors.email}</FormErrorMessage>
      </FormControl>

      {/* Message Field */}
      {/* Form control handles the message input */}
      <FormControl mb={6} isInvalid={!!errors.message}>
        <FormLabel htmlFor="messageInput">How can we help you?</FormLabel>
        <Textarea
          id="messageInput"
          name="message"
          placeholder="Enter your message"
          value={values.message}
          onChange={handleChange("message")}
          bg="white"
          color="black"
          minH="150px"
          aria-required="true"
          aria-describedby={errors.message ? "messageError" : undefined}
        />
        <FormErrorMessage id="messageError">{errors.message}</FormErrorMessage>
      </FormControl>

      {/* Submit Button */}
      <Button
        type="submit"
        bg="#1DB954"
        color="white"
        w="100%"
        _hover={{ bg: "#1ED760" }}
        aria-label="Submit Contact Form"
      >
        Send
      </Button>
    </Box>
  );
}

export default ContactForm;
