import { useEffect, useState } from 'react';
import { getUserByID } from '../services/AuthServices';


const useGetNameById = (id) => {
    const [name, setName] = useState("");

    useEffect(() => {
        getUserByID(id)
            .then((result) => {
             
                setName(result.data.user.firstname + " " + result.data.user.lastname);
            });
    }, [id]);

    return [name];
}

export default useGetNameById;