
import { useEffect, useState } from 'react';
import { getCommentByAuthorId } from '../services/commentServices';
import { getRatingByOwnerId } from '../services/ratingServices';

const useGetReviewId = (userId, productId,refreshes, setRefresh ) => {

    const [ratingId, setRatingId] = useState("");
    const [commentId, setCommentId] = useState("");
    useEffect(() => {
        getRatingByOwnerId(userId)
            .then((result) => {
                result.ratings.forEach((rating) => {
                    if (rating.for === productId) { setRatingId(rating._id); }
                });
            });
        getCommentByAuthorId(userId)
            .then((result) => {
                result.comment.forEach((comment) => {
                    if (comment.for === productId) { setCommentId(comment._id); }
                });
            });

    }, [userId, productId,refreshes]);

    return [ratingId, commentId];
}

export default useGetReviewId;