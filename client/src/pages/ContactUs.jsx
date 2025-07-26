// Import React
import "../App.css";
// Import Libraries
import { Box, Text, Grid } from "@chakra-ui/react";
// Import Components and Assets
import ContactForm from "../components/forms/ContactForm.jsx";
import Background from "../assets/backgroundHZ800.png";

function ContactUs() {
  return (
    <Box
      as="main"
      minHeight="100vh"
      width="95%"
      maxWidth="1300px"
      margin="0 auto"
      textAlign="center"
      py={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      role="main"
      aria-labelledby="Contact Us Page"
      // Image Background Styling
      backgroundImage={`url(${Background})`}
      backgroundSize="70% auto"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      boxShadow="inset 250px 0 150px -50px rgba(0,0,0,0.8),inset -250px 0 150px -50px rgba(0,0,0,0.8), inset 0 -50px 80px -30px rgba(0,0,0,0.8)"
    >
      {/* H2 Page Title */}
      <Text
        as="h2"
        id="pageTitle"
        color="#ffffff"
        fontWeight="600"
        fontSize="3rem"
        mb={10}
      >
        Contact Us
      </Text>

      {/* Contact Form Grid Container */}
      <Grid
        role="region"
        aria-label="Contact address and form"
        templateColumns={["1fr", "auto 1fr"]}
        templateRows="auto auto"
        gap={8}
        bg="#121212"
        color="#ffffff"
        maxW="1200px"
        mx="auto"
        p={8}
        borderRadius="md"
        alignItems="start"
        justifySelf="center"
        alignSelf="center"
      >
        {/* Left Column - Titles */}
        {/* Right Column - Address and Form */}

        {/* Top Left - Address Title */}
        <Box
          role="heading"
          aria-level="3"
          textAlign={["center", "right"]}
          pr={[0, 4]}
        >
          <Text
            fontWeight="bold"
            fontSize="lg"
            textAlign="left"
            mb={2}
            id="addressTitle"
          >
            Address:
          </Text>
        </Box>

        {/* Top Right - Address Content */}
        <Box aria-labelledby="addressTitle" textAlign={["center", "left"]}>
          <Text>
            Tune Finder<br />
            12345 Grove Ave.<br />
            Grove Town, N/A 12345
          </Text>
        </Box>

        {/* Bottom Left - Form Title */}
        <Box
          role="heading"
          aria-level="3"
          textAlign={["center", "right"]}
          pr={[0, 4]}
        >
          <Text fontWeight="bold" fontSize="lg" mb={2} id="contactFormTitle">
            Send A Message:
          </Text>
        </Box>

        {/* Bottom Right - Contact Form Import */}
        <Box>
          <ContactForm />
        </Box>
      </Grid>
    </Box>
  );
}

export default ContactUs;
