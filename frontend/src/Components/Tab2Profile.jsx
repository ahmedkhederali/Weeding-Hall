import { Box, Button, Heading, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { Favorite } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserByID } from '../services/AuthServices';
import { getAllHalls } from './../services/HallServices';
import MiniCard from './MiniCard';

const Tab2Profile = () => {
    const [favorites, setFavorites] = useState([]);
    const navigate=useNavigate()
    const currentUser=localStorage.getItem("currentuser")
    useEffect(() => {
        getUserByID(currentUser)
          .then(result => {
         
            setFavorites(result.data.user.favorites);
          });
      }, [currentUser]);
    console.log(favorites)
      if (currentUser !== "") {
        if (favorites.length !== 0) {
          return (
            <Box px={10} py={5}>
              <SimpleGrid columns={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing={3} >
                {
                  favorites.map((favorite,i) => {
                    return <MiniCard key={i} hallId={favorite} />
                  })
                }
              </SimpleGrid>
            </Box>
          )
        } else {
          return (
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
      }
}

export default Tab2Profile;
