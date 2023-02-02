import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
// And react-slick as our Carousel Lib
import Slider from 'react-slick';
import { getHallById } from '../services/HallServices';
import { useParams } from 'react-router-dom';

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export default function CaptionCarousel() {

  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState();
  const [hall, setHall] = useState({});
  const { id } = useParams();
  const colors2 = useColorModeValue("black.300", "white.900");

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: '90%', md: '50%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });
  useEffect(() => {
    getHallById(id)
      .then((res) => {
        setHall(res.data.hall);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (

    <Box
      position={'relative'}
      height={'600px'}
      width={'full'}
      overflow={'hidden'}>
      {/* CSS files for react-slick */}
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      {/* Left Icon */}
      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}>
        <BiLeftArrowAlt size="40px" />
      </IconButton>
      {/* Right Icon */}
      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}>
        <BiRightArrowAlt size="40px" />
      </IconButton>
      {/* Slider */}
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {hall.imgs && hall.imgs.map((card, index) => 
        (
          <Box
            key={index}
            height={'6xl'}
            position="relative"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            backgroundImage={`url(${card.url})`}>
            {/* This is the block you need to change, to customize the caption */}
            {/* <Container size="container.lg" height="600px" position="relative">
              <Stack
                spacing={6}
                w={'full'}
                maxW={'lg'}
                position="absolute"
                top="50%"
                transform="translate(0, -50%)">
                <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                  {"hello"}
                </Heading>
                <Text fontSize={{ base: 'md', lg: 'lg' }} color={colors2} fontWeight="bold">
                  {"hello"}
                </Text>
              </Stack>
            </Container> */}
          </Box>
        )
        )}
      </Slider>
    </Box>
  );
}




