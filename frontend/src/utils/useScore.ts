// Write a custom hook that will return the score of the user.

import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";

export default function useScore() {
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axiosInstance.get("score/")
            setScore(res.data.score);
        }
        fetchData();

    }, []);

    return score;
}