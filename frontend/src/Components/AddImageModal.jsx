import React, { useState } from 'react';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalCloseButton, Select, Button, Input, useToast } from '@chakra-ui/react';
import { UploadImageInCloundayAndUpdateSlider } from '../services/AdminServices/UploadImageInSlider';

//import { addImage, uploadImageToCloudinary } from '../services/ImageServices';

const AddImageModal = ({ isOpen, onClose,hallId, refresh,setRefresh }) => {

    const [category, setCategory] = useState("carousel");
    const [imgs, setImgs] = useState("");
    const toast = useToast();

//Handle Upload Images Poster
const handleUpload = async (e) => {
    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        if (reader.result) {
          const x = reader.result;
          setImgs(x);
        }
      }
    };
    
    if(e.target.files[0].size >64326){
     
      toast({
        title: "ERROR!",
        description: `Size of Image is To large`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      onClose()

    }

    console.log(e.target.files[0].size)
    reader.readAsDataURL(e.target.files[0]);
  };

// added image on cloundary
  const addedImage=()=>{
    UploadImageInCloundayAndUpdateSlider(hallId,imgs).then((res)=>{
        console.log(res)
        toast({
            title: "image Added",
            description: `${res.data.msg}`,
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        setRefresh(!refresh)
        onClose()
    }).catch((err)=>{
        toast({
            title: "Error!",
            description: `${err.response.data.msg}`,
            status: "error",
            duration: 2000,
            isClosable: true,
          });
    })
  }

    return (
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize={30} color='facebook.500' >Add Image</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Select onChange={(e) => console.log(e.target.value)} value={category} >
                        <option value="carousel">Carousel</option>
                    </Select>
                    <Input border='none' p={0} mt={3} type='file' onChange={handleUpload} />
                </ModalBody>
                <ModalFooter>
                    <Button mx={3} px={7} colorScheme='facebook' onClick={addedImage} >Add</Button>
                    <Button colorScheme='facebook' variant='outline' onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default AddImageModal;