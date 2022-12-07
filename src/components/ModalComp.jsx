import {
  Box, Button,
  FormControl,
  FormLabel,
  Input, Modal, ModalBody,
  ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay
} from "@chakra-ui/react";
import { useState } from "react";

const ModalComp = ({ data, setData, dataEdit, isOpen, onClose }) => {
  const [name, setName] = useState(dataEdit.name || "");
  const [cpf, setCpf] = useState(dataEdit.cpf || "");
  const [matricula, setMatricula] = useState(dataEdit.matricula || "");
  const [sala, setSala] = useState(dataEdit.sala || "");
  const [nota, setNota] = useState(dataEdit.nota || "");



  const handleSave = () => {
    if (!name || !cpf) return;

    if (cpfAlreadyExists()) {
      return alert("CPF já cadastrado!");
    }
    console.log(dataEdit)
    if (parseInt(dataEdit.sala) > 3){
      return alert("Sala tem que ser entre 1 e 3");
    }
   
    if (!dataEdit.sala && sala != 1) {
      return alert("Sala tem que ser a primeira");
    }
    if (Object.keys(dataEdit).length) {
      data[dataEdit.index] = { name, cpf, matricula, sala, nota };
    }

    const newDataArray = !Object.keys(dataEdit).length
      ? [...(data ? data : []), { name, cpf, matricula, sala, nota }]
      : [...(data ? data : [])];

    localStorage.setItem("cad_cliente", JSON.stringify(newDataArray));

    setData(newDataArray);

    onClose();
  };

  const cpfAlreadyExists = () => {
    if (dataEdit.cpf !== cpf && data?.length) {
      return data.find((item) => item.cpf === cpf);
    }

    return false;
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro de alunos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl display="flex" flexDir="column" gap={4}>
              <Box>
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>CPF</FormLabel>
                <Input
                  type="text"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Matricula</FormLabel>
                <Input
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Sala</FormLabel>
                <Input
                  type="text"
                  value={sala}
                  onChange={(e) => setSala(e.target.value)}
                />
              </Box>
              <Box>
                <FormLabel>Nota</FormLabel>
                <Input
                  type="text"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="start">
            <Button colorScheme="green" mr={3} onClick={handleSave}>
              SALVAR
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;