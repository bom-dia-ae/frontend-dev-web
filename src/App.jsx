import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box, Button, Image, Flex, Spacer, Table, Tbody,
  Td, Th, Thead,
  Tr, useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ModalComp from "./components/ModalComp";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente")
      ? JSON.parse(localStorage.getItem("cad_cliente"))
      : [];

    setData(db_costumer);
  }, [setData]);

  const handleRemove = (cpf) => {
    const newArray = data.filter((item) => item.cpf !== cpf);

    setData(newArray);

    localStorage.setItem("cad_cliente", JSON.stringify(newArray));
  };

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="20px"
      fontFamily="poppins"
    >
      <Box maxW={800} w="100%" h="100vh" py={10} px={2}>
        <Box borderWidth='2px'> <text> Escola Tralalá. CNPJ: 11.444.777/0001-52. Endereço: Rua da esquina, n° 18, Salvador/BA</text></Box>
        <Box boxSize='150px'>
          <Image src='https://media.discordapp.net/attachments/1040389551753011213/1050094580156080198/PicsArt_12-07-01.58.19.png' alt='Logo tralalá' />
        </Box>
        <Button colorScheme="blue" onClick={() => [setDataEdit({}), onOpen()]}>
          NOVO ALUNO
        </Button>

        <Box overflowY="auto" height="100%">
          <Table mt="6">
            <Thead>
              <Tr>
                <Th>
                  Nome
                </Th>
                <Th>
                  CPF
                </Th>
                <Th>
                  Matricula
                </Th>
                <Th>
                  Sala
                </Th>
                <Th>
                  Nota
                </Th>
                <Th p={0}></Th>
                <Th p={0}></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map(({ name, cpf, matricula, sala, nota }, index) => (
                <Tr key={index} cursor="pointer " _hover={{ bg: "gray.100" }}>
                  <Td>{name}</Td>
                  <Td>{cpf}</Td>
                  <Td>{matricula}</Td>
                  <Td>{sala}</Td>
                  <Td>{nota}</Td>
                  <Td p={0}>
                    <EditIcon
                      fontSize={20}
                      onClick={() => [
                        setDataEdit({ name, cpf, matricula, sala, nota, index }),
                        onOpen(),
                      ]}
                    />
                  </Td>
                  <Td p={0}>
                    <DeleteIcon
                      fontSize={20}
                      onClick={() => handleRemove(cpf)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Box>

      {isOpen && (
        <ModalComp
          isOpen={isOpen}
          onClose={onClose}
          data={data}
          setData={setData}
          dataEdit={dataEdit}
          setDataEdit={setDataEdit}
        />
      )}

    </Flex>
  );
};

export default App;