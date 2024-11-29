import { useState, useEffect, useRef } from "react";

const useToggleVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
    };

    const closeVisibility = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                closeVisibility();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return { isVisible, toggleVisibility, closeVisibility, ref };
};

export default useToggleVisibility;
