import React, { useState } from "react";
import { Box, Button, Container, Flex, Heading, Input, Stack, Tag, TagCloseButton, TagLabel, Text, Textarea, VStack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";

// Mock data for quotes
const initialQuotes = [
  { id: 1, text: "Make my day better please", author: "John Lennon", categories: ["Life", "Planning"] },
  { id: 2, text: "Get busy living or get busy dying.", author: "Stephen King", categories: ["Life", "Motivation"] },
  { id: 3, text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", categories: ["Success", "Journey"] },
];

const categories = ["Life", "Planning", "Motivation", "Success", "Journey"];

const Index = () => {
  const [quotes, setQuotes] = useState(initialQuotes);
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategories, setNewCategories] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddCategory = (category) => {
    if (!newCategories.includes(category)) {
      setNewCategories([...newCategories, category]);
    }
  };

  const handleRemoveCategory = (category) => {
    setNewCategories(newCategories.filter((c) => c !== category));
  };

  const handleQuoteChange = (e) => {
    setNewQuote(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSaveQuote = () => {
    const quote = {
      id: quotes.length + 1,
      text: newQuote,
      author: newAuthor,
      categories: newCategories,
    };
    setQuotes([...quotes, quote]);
    setNewQuote("");
    setNewAuthor("");
    setNewCategories([]);
  };

  const handleEditQuote = () => {
    setQuotes(quotes.map((q) => (q.id === currentQuote.id ? { ...currentQuote, text: newQuote, author: newAuthor, categories: newCategories } : q)));
    onClose();
  };

  const handleDeleteQuote = (id) => {
    setQuotes(quotes.filter((quote) => quote.id !== id));
  };

  const filteredQuotes = searchTerm ? quotes.filter((q) => q.text.toLowerCase().includes(searchTerm.toLowerCase()) || q.author.toLowerCase().includes(searchTerm.toLowerCase())) : quotes;

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={8}>
        <Heading>Quote Buddy</Heading>
        <Flex>
          <Input placeholder="Search for quotes" value={searchTerm} onChange={handleSearchChange} />
          <Button leftIcon={<FaSearch />} onClick={() => {}} ml={2}>
            Search
          </Button>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" width="100%">
          <Heading size="md">Quotes</Heading>
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={onOpen}>
            Add Quote
          </Button>
        </Flex>
        <Box width="100%">
          {filteredQuotes.map((quote) => (
            <Box key={quote.id} p={5} shadow="md" borderWidth="1px" mb={4}>
              <Text fontWeight="bold">{quote.text}</Text>
              <Text mb={2}>- {quote.author || "Unknown"}</Text>
              <Stack direction="row">
                {quote.categories.map((category) => (
                  <Tag key={category} size="sm" variant="solid" colorScheme="teal">
                    {category}
                  </Tag>
                ))}
              </Stack>
              <Button
                leftIcon={<FaEdit />}
                size="sm"
                onClick={() => {
                  setCurrentQuote(quote);
                  setNewQuote(quote.text);
                  setNewAuthor(quote.author);
                  setNewCategories(quote.categories);
                  onOpen();
                }}
                mt={2}
              >
                Edit
              </Button>
              <Button leftIcon={<FaTrash />} size="sm" onClick={() => handleDeleteQuote(quote.id)} mt={2} ml={2}>
                Remove
              </Button>
            </Box>
          ))}
        </Box>
      </VStack>

      {/* Add/Edit Quote Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{currentQuote ? "Edit Quote" : "Add New Quote"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Textarea placeholder="Quote text" mb={3} value={newQuote} onChange={handleQuoteChange} />
            <Input placeholder="Author (optional)" mb={3} value={newAuthor} onChange={handleAuthorChange} />
            <Flex wrap="wrap">
              {categories.map((category) => (
                <Tag size="lg" variant="outline" colorScheme="teal" m={1} key={category} cursor="pointer" onClick={() => handleAddCategory(category)}>
                  {category}
                </Tag>
              ))}
            </Flex>
            <Flex wrap="wrap" mt={3}>
              {newCategories.map((category) => (
                <Tag size="lg" variant="solid" colorScheme="teal" m={1} key={category}>
                  <TagLabel>{category}</TagLabel>
                  <TagCloseButton onClick={() => handleRemoveCategory(category)} />
                </Tag>
              ))}
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={currentQuote ? handleEditQuote : handleSaveQuote}>
              {currentQuote ? "Update" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
