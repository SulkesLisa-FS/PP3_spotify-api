// Import Libraries
import { Box, Text, Icon } from "@chakra-ui/react";
import { FaMusic } from "react-icons/fa";


// Passing props for title, subtitle, image, and url
const ResultCard = ({ title, subtitle, image, url }) => {
  return (
    <Box
      as="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
    >
      {/* Image or Image Placeholder */}
      {/* If there is an image */}
      <Box height={0} pb="100%" position="relative">
        {image ? (
          <Box
            as="img"
            src={image}
            alt={title}
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        ) : (
            // else if no image, show a placeholder icon
          <Box
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="gray.200"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={FaMusic} w={12} h={12} color="gray.500" />
          </Box>
        )}
      </Box>

      {/* Text Content */}
      <Box p={2}>
        {/* Title */}
        <Text fontWeight="bold" isTruncated>
          {title}
        </Text>
        {/* Subtitle */}
        {/* If subtitle is provided, display it */}
        {/* Using isTruncated to handle long subtitles gracefully */}
        {subtitle && (
          <Text fontSize="sm" color="gray.600" isTruncated>
            {subtitle}
          </Text>
        )}
      </Box>
    </Box>
  );
}
export default ResultCard;
