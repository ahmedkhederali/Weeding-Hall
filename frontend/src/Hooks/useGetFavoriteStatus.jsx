import { useEffect, useState } from 'react';
import { getUserByID } from '../services/AuthServices';

const useGetFavoriteStatus = (userId, hallid) => {
    const [status, setStatus] = useState(false);

    useEffect(() => {
        if (userId && userId !== null) {
            getUserByID(userId)
                .then(result => {
                
                    result.data.user.favorites && result.data.user.favorites.forEach(f => {
                        if (f === hallid) {
                            setStatus(true);
                        }
                    });
                });
        }
    }, [userId, hallid]);
    return [status];
};

export default useGetFavoriteStatus;