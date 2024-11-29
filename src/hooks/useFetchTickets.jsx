import { useState, useEffect } from "react";
import axios from 'axios';

const useFetchTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTickets = async ()=> {
            try {
                const response = await axios.get(
                    'https://api.quicksell.co/v1/internal/frontend-assignment'
                )
                setTickets(response.data);
            } catch (err){
                console.log('Error fetching data', err);
                setError(err.message);
            } finally{
                setLoading(false);
            }
        };
        fetchTickets();
    }, []);

    return {tickets, loading, error};
};

export default useFetchTickets;