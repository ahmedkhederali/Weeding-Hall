import { Box, Flex, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllHalls, getAllHallsWithouFilteration } from "../services/HallServices";
import { getRatingByHallId } from "../services/ratingServices";
import CardOfHall from "./CardOfHall";
import LikesCardMini from "./LikesCardMini";

const MiniCard = ({ hallId }) => {
  const [fav, setFav] = useState([]);
  const [ratings, setRatings] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  useEffect(() => {
    getAllHallsWithouFilteration()
      .then((res) => {
        setFav(res.data.halls);
      })
      .catch((err) => {
        alert(err);
      });
      getRatingByHallId(hallId).then((result) => {
  
        var star = 0;
        result.ratings.forEach((r) => {
          star += r.rating;
        });
        setRatings(star / result.ratings.length || 0);
        setRatingCount(result.ratings && result.ratings.length);
      });
  }, []);
  return (
    <Wrap>
      {fav && fav?.map((item, index) => item._id === hallId && <LikesCardMini key={index} item={item} ratings={ratings}/>)}
    </Wrap>
  );
};

export default MiniCard;
