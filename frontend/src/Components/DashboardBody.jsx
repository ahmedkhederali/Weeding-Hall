import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import CommonPage from "../pages/CommonPage";
import CaptionCarousel from "./Carasoul";
import WithSpeechBubbles from "./Reviwes";
import ThreeTierPricing from "./Plans";
import Contact from "./Contact";
import SmallWithSocial from "./Footer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getHallById } from "../services/HallServices";
import CallToActionWithVideo from "./VideoSection";
import StarRatings from "react-star-ratings";
import { Info } from "@mui/icons-material";
import ReviewModal from "./ReviewModal ";
import { getCommentByHallId } from "../services/commentServices";
import Comment from "./Comments.jsx";
import { getRatingByHallId } from "../services/ratingServices";
import LoadingPage from "../pages/Loading/LoadingPage";
import ColorOptions from "./colorOption/ColorOptions";
import ChakraCarousel from "./MiniSlider/ChakraCarousel";
import FinalSliderToShow from "./MiniSlider/FinalSliderToShow";



export default function DashboardBody() {
  const [hall, setHall] = useState({});
  const [ratings, setRatings] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  const [comments, setComments] = useState([]);
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refreshes, setRefresh] = useState(false);
  const colors = useColorModeValue("gray.100", "gray.900");

  useEffect(() => {
    getHallById(id)
      .then((res) => {
        setHall(res.data.hall);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    getCommentByHallId(id)
      .then((result) => {
        setComments(result.comment);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getRatingByHallId(id).then((result) => {
      var star = 0;
      result.ratings.forEach((r) => {
        star += r.rating;
      });
      setRatings(star / result.ratings.length || 0);
      setRatingCount(result.ratings && result.ratings.length);
    });
  }, [refreshes]);

  const onClickWrite = () => {
    onOpen(true);
  };

  return (
    <>
      {hall && hall.name ? (
        <>

          <CommonPage />
          <ColorOptions hall={hall}/>
          <Box mt={{ base: 5 }} ml={{ base: 0, md: 60 }} textAlign={"center"}>
            <Heading id="Welcome" mb={5}>
              {hall.name && hall.name.toUpperCase()} Hall
            </Heading>
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={colors} p="4">
            <CaptionCarousel hall={hall} />
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={colors} p="4">
            <FinalSliderToShow hall={hall} />
          </Box>
          
          <Box ml={{ base: 0, md: 60 }} bg={colors}>
            <CallToActionWithVideo hall={hall} />
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={colors} p="4">
            <WithSpeechBubbles hall={hall} />
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={colors} p="4">
            <ThreeTierPricing hall={hall} />
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={colors}>
            <Contact hall={hall} />
          </Box>
          <Box
            mt={{ base: 5 }}
            ml={{ base: 0, md: 60 }}
            textAlign={{ base: "center", xl: "left" }}
          >
            <Text mb={3} fontSize={40} fontWeight={300} px={1}>
              User Reviews
            </Text>
            <Box
              width="100%"
              display="flex"
              justifyContent="space-between"
              flexDirection={{ base: "column", md: "row" }}
              p={2}
            >
              <Box>
                <Box display="flex">
                  <StarRatings
                    starDimension={"20"}
                    starSpacing={"2"}
                    rating={ratings}
                    starRatedColor="#FFD700"
                    numberOfStars={5}
                    name="rating"
                  />
                  <Text fontSize={16} fontWeight={500}>
                    {" "}
                    | {ratingCount} reviews
                  </Text>
                </Box>
                <Text my={3} display="flex" alignItems="center">
                  <Info sx={{ fontSize: "16px", mr: 1 }} /> You Should Book A
                  Weeding day in This Hall for write a review.{" "}
                </Text>
              </Box>
              <Button
                ml={2}
                mr={{ base: 0, md: 5 }}
                height={50}
                colorScheme="facebook"
                onClick={onClickWrite}
              >
                Write a Review
              </Button>
            </Box>
            {comments.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  authorId={comment.author}
                  commentText={comment.comment}
                  createdAt={comment.createdAt}
                  refreshes={refreshes}
                  setRefresh={setRefresh}
                />
              );
            })}
          </Box>
          <Box ml={{ base: 0, md: 60 }} bg={("gray.100", "gray.900")}>
            <SmallWithSocial />
          </Box>
          <ReviewModal
            isOpen={isOpen}
            onClose={onClose}
            hallid={hall._id}
            refreshes={refreshes}
            setRefresh={setRefresh}
          />
        </>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
