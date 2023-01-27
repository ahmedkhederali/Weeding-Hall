import { Icon, PhoneIcon, StarIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Spacer,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiFillMoneyCollect, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Favorite, FavoriteBorder, LocationCity } from "@mui/icons-material";
import {
  addFavorite,
  deleteFavorite,
  deleteLike,
  addLike,
} from "../services/UserServices";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import PaidIcon from "@mui/icons-material/Paid";
import useGetFavoriteStatus from "../Hooks/useGetFavoriteStatus";
import { getCommentByHallId } from "../services/commentServices";
import { getRatingByHallId } from "../services/ratingServices";
import StarRatings from "react-star-ratings";

export default function CardOfHall({ item, hallid, setRefresh, refresh }) {
 
  const [isFavorite, setIsFavorite] = useState(false);
  const currentUser = localStorage.getItem("currentuser");
  const [status] = useGetFavoriteStatus(currentUser, item._id);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  //  , Light mode , Dark mode
  const x = useColorModeValue("white.50", "white");

  useEffect(() => {
    if (item._id) {
      setIsFavorite(status);
    }
    getCommentByHallId(item._id)
      .then((result) => {
        setComments(result.comment);
      })
      .catch((err) => {
        console.log(err.message);
      });
    getRatingByHallId(item._id).then((result) => {
      var star = 0;
      result.ratings.forEach((r) => {
        star += r.rating;
      });
      setRatings(star / result.ratings.length || 0);
      setRatingCount(result.ratings && result.ratings.length);
    });
    

  }, [item._id, status]);

  const onClickFavorite = async (hallID) => {
    if (isFavorite) {
      await deleteFavorite(currentUser, hallID);
      await deleteLike(hallID);
      await setIsFavorite(false);
      await setRefresh(!refresh);
    } else {
      await addFavorite(currentUser, hallID);
      await addLike(hallID);
      await setIsFavorite(true);
      await setRefresh(!refresh);
    }
  };
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      mx={2}
      key={item._id}
    >
      <Image
        width="382px"
        height="255px"
        src={item.hallimgposter.url}
        alt={item.hallimgposter.public_id}
      />

      <Box p="6">
        <Box display="flex" alignItems="baseline" mb={2}>
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {item.mohafza}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {item.chairs} Chairs &bull; {item.tables} Tables &bull; {item.floor}{" "}
            Floor
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineheight="tight"
          noOfLines={1}
          mb={2}
        >
          {item.name.toUpperCase()}
        </Box>

        <Box
          fontWeight="light"
          as="h6"
          lineheight="tight"
          alignItems={"center"}
          mb={2}
        >
          <Flex minWidth="max-content" alignItems="center" gap="2">
            <AddLocationIcon mt={2} fontSize="md" />
            <span lineheight={2}>{item.location}</span>
          </Flex>
        </Box>
        <Flex>
          <Box mb={2}>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <PaidIcon /> <span>{item.price} EGP</span>
            </Flex>
          </Box>
          <Spacer />
          <Box mb={2}>
            <Flex minWidth="max-content" alignItems="center" gap="2">
              <PhoneIcon /> <span>{item.phone} </span>
            </Flex>
          </Box>
        </Flex>
        <Box display="flex" mb={2} alignItems="center" gap={5}>
          <Box as="span" color="gray.600" fontSize="sm">
            <StarRatings
              starDimension={"20"}
              starSpacing={"2"}
              rating={ratings}
              starRatedColor="#FFD700"
              numberOfStars={5}
              name="rating"
            />
          </Box>
          <Box as="span" ml="2" color={x} fontSize="sm">
            {comments && comments.length} reviews
          </Box>
          <Box
            as="span"
            color="gray.600"
            fontSize="sm"
            mx={2}
            position="relative"
          >
            {isFavorite ? (
              <BsHeartFill
                fill="red"
                cursor={"pointer"}
                fontSize={"24px"}
                onClick={() => onClickFavorite(item._id)}
              />
            ) : (
              <BsHeart
                cursor={"pointer"}
                onClick={() => onClickFavorite(item._id)}
                fontSize={"24px"}
              />
            )}
            <Box
              color={x}
              position={"absolute"}
              top={-1}
              right={item.likes > 99 ? -8 : -3.5}
            >
              {item.likes > 500 ? "500+" : item.likes}{" "}
            </Box>
          </Box>
        </Box>

        <Stack
          width={"100%"}
          mt={2}
          direction={"row"}
          padding={2}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Link to={`/hall/${item._id}`}>
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              _focus={{
                bg: "gray.200",
              }}
            >
              More
            </Button>
          </Link>
          <Link to={`/book/${item._id}`} >
            <Button
              flex={1}
              fontSize={"sm"}
              rounded={"full"}
              bg={"blue.400"}
              color={"white"}
              boxShadow={
                "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
              }
              _hover={{
                bg: "blue.500",
              }}
              _focus={{
                bg: "blue.500",
              }}
            >
              Book
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
}
