import { Box, Button, Center, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SmallWithSocial from "../Components/Footer";
import MiniCard from "../Components/MiniCard";
import { getUserByID } from "../services/AuthServices";
import CommonPage from "./CommonPage";
import LoadingPage from "./Loading/LoadingPage";
import { Icon } from '@chakra-ui/icons';
import { Favorite } from '@mui/icons-material';

const Faviourit = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentuser");
  useEffect(() => {
    getUserByID(currentUser).then((result) => {
      setFavorites(result.data.user.favorites);
    });
  }, [currentUser]);

  if (currentUser !== "") {
    return (
      <>
         <CommonPage />
         {
          favorites.length !== 0 ? (
            <Box ml={{ base: 0, md: 60 }}>
            <Center mt={{ base: 5 }} mb={{ base: 5 }}>
              <Heading mb={4} size="lg">
              Favourite Hall
              </Heading>
            </Center>
            <Box px={10} py={5}>
              <SimpleGrid
                columns={{ base: 1, sm: 2, lg: 3, xl: 4 }}
                spacing={3}
              >
                {favorites.map((favorite) => {
                  return <MiniCard key={favorite} hallId={favorite} />;
                })}
              </SimpleGrid>
            </Box>
          </Box>
          ) :( 
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              flexDirection='column'
              mt={2}
              p={3}
            >
              <Icon color='#314E89' fontSize={50} as={Favorite} />
              <Heading textAlign='center' fontSize={22} mt={8}  >You don't have any favorite</Heading>
              <Text textAlign='center' fontSize={20} mt={2} fontWeight={300} >You haven't added a Hall  to your favourites. All you have to do is click on the little heart icon.</Text>
              <Button
                variant='solid'
                fontSize={18}
                px={8} mt={8}
                colorScheme='facebook'
                onClick={() => navigate('/')}>
                Go To All Halls
              </Button>
            </Box>
            )
         }
      
      </>
    )
   
  }
};

export default Faviourit;
