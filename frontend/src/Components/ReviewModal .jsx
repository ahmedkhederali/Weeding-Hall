import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  Text,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import StarRatings from "react-star-ratings";

import {
  getRatingById,
  addRating,
  updateRating,
  deleteRating,
} from "../services/ratingServices";
import {
  getCommentById,
  addComment,
  updateComment,
  deleteComment,
} from "../services/commentServices";
import useGetReviewId from "./../Hooks/useGetReviewId";
import { updateHallRate } from "../services/HallServices";

const ReviewModal = ({ onClose, isOpen, hallid, refreshes, setRefresh }) => {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const currentUser = localStorage.getItem("currentuser");
  const toast = useToast();
  const [ratingId, commentId] = useGetReviewId(currentUser, hallid , refreshes, setRefresh );
  useEffect(() => {
    if (ratingId !== "" && commentId) {
      getRatingById(ratingId).then((result) => {
        setRating(result.rating.rating);
      });
      getCommentById(commentId).then((result) => {
        setComment(result.comment.comment);
      });
    }
  }, [ratingId, commentId]);

  const onClickSend = () => {
    addRating(hallid, rating, currentUser).then((result) => {
      if (result.status) {
        toast({
          title: "Error!",
          description: "Somethings went wrong.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        addComment(hallid, comment, currentUser).then((result) => {
          if (result.status) {
            toast({
              title: "Error!",
              description: "Somethings went wrong.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Success!",
              description: "Your review has been sent successfully.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });

            onClose(true);
            setRefresh(!refreshes);
            
          }
        });
      }
    });
    
      updateHallRate(hallid,rating).then((res)=>{
        toast({
          title: "Success!",
          description: "Your Hall Rate Updated Succefully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }).catch((err) => {
        console.log(err.message);
      });
    
  };

  const onClickEdit = () => {
    updateRating(ratingId, hallid, rating, currentUser).then((result) => {
      if (result.status) {
        toast({
          title: "Error!",
          description: "Somethings went wrong.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        updateComment(commentId, hallid, comment, currentUser).then(
          (result) => {
            if (result.status) {
              toast({
                title: "Error!",
                description: "Somethings went wrong.",
                status: "error",
                duration: 2000,
                isClosable: true,
              });
            } else {
              toast({
                title: "Success!",
                description: "Your review has been updated successfully.",
                status: "success",
                duration: 2000,
                isClosable: true,
              });
              onClose(true);
              setRefresh(!refreshes);
            }
          }
        );
      }
    });
  };

  const onClickDelete = () => {
    deleteRating(ratingId).then((result) => {
      if (result.status) {
        toast({
          title: "Error!",
          description: "Somethings went wrong.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      } else {
        deleteComment(commentId).then((result) => {
          if (result.status) {
            toast({
              title: "Error!",
              description: "Somethings went wrong.",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          } else {
            toast({
              title: "Success!",
              description: "Your review was deleted.",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
            onClose(true);
            window.location.reload()
          }
        });
      }
     
    });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={30} color="facebook.500">
          {ratingId !== "" ? "Edit Review" : "Review"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text
            fontSize={20}
            mt={5}
            mb={3}
            fontWeight={400}
            color="facebook.500"
          >
            Rating :
          </Text>
          <StarRatings
            starDimension={"30"}
            starSpacing={"2"}
            rating={rating}
            changeRating={(val) => setRating(val)}
            isSelectable={true}
            starRatedColor="#FFD700"
            numberOfStars={5}
            name="rating"
          />
          <Text fontSize={20} mt={5} fontWeight={400} color="facebook.500">
            Review Text :
          </Text>
          <Textarea
            maxLength={200}
            spellCheck={false}
            mt={13}
            resize="none"
            placeholder="Please write your review."
            value={comment}
            onInput={(e) => setComment(e.target.value)}
            height={200}
          ></Textarea>
        </ModalBody>
        <ModalFooter>
          {ratingId !== "" ? (
            <>
              <Button
                mx={3}
                px={7}
                colorScheme="facebook"
                onClick={onClickEdit}
              >
                Edit
              </Button>
              <Button
                colorScheme="facebook"
                variant="outline"
                onClick={onClickDelete}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <Button
                mx={3}
                px={7}
                colorScheme="facebook"
                onClick={onClickSend}
              >
                Send
              </Button>
              <Button
                colorScheme="facebook"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReviewModal;
