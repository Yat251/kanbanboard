import { useRef } from "react";

const useDragToScroll = () => {
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const handleMouseDown = (e, containerRef) => {
        if (!containerRef.current) return;
        isDragging.current = true;
        startX.current = e.pageX - containerRef.current.offsetLeft;
        scrollLeft.current = containerRef.current.scrollLeft;
    };

    const handleMouseMove = (e, containerRef) => {
        if (!isDragging.current || !containerRef.current) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX.current) * 1.5; // Adjust scrolling sensitivity here
        containerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handleMouseUpOrLeave = () => {
        isDragging.current = false;
    };

    return {
        handleMouseDown,
        handleMouseMove,
        handleMouseUpOrLeave,
    };
};

export default useDragToScroll;
