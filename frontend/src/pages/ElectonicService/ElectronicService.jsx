import {
    Box,
    Button,
    Container,
    Flex,
    Heading,
    Icon,
    Stack,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { ReactElement } from 'react';
import { FaMobileAlt } from 'react-icons/fa';
import {MdSettingsInputAntenna,MdOutlineMapsHomeWork} from 'react-icons/md';
  import {
    FcAbout,
    FcAssistant,
    FcCollaboration,
    FcDonate,
    FcManager,
  } from 'react-icons/fc';
  

  
  const Card = ({ heading, description, icon, href }) => {
    return (
      <Box
        maxW={{ base: 'full', md: '275px' }}
        w={'full'}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={15}>
        <Stack align={'center'} spacing={2}>
          <Flex
            w={250}
            h={250}
            align={'center'}
            justify={'center'}
            color={'white'}
            cursor="pointer"
            m={"auto"}
            >
            {icon}
          </Flex>
          <Box mt={4}>
            <Heading size="md" mt={4}>{heading}</Heading>
          </Box>
         
        </Stack>
      </Box>
    );
  };
  
  export default function ElectronicService() {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
          <Heading fontSize={{ base: 'xl', sm: '3xl' }} fontWeight={'bold'}>
            الخدمات الالكترونيه
          </Heading>
         
        </Stack>
  
        <Container maxW={'5xl'} mt={12}>
          <Flex flexWrap="wrap" gridGap={6} justify="center">
            <Card
              heading={'تطبيقات الجامعه'}
              icon={<Icon as={FaMobileAlt} w={"full"} h={"full"} />}
            />
            
            <Card
              heading={'خدمات المستفيدين'}
              icon={<Icon as={MdSettingsInputAntenna} w={"full"} h={"full"} />}
            />
            <Card
              heading={'التطوير والجوده'}
              icon={<Icon as={MdOutlineMapsHomeWork} w={"full"} h={"full"}/>}
            />
            
          </Flex>
        </Container>
      </Box>
    );
  }