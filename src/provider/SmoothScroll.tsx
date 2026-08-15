"use client"
import Lenis from "lenis";
import { ReactNode, useEffect } from "react";
interface SmoothScrollProps {
    children: ReactNode
}
const SmoothScroll = ({ children }: SmoothScrollProps) => {

    useEffect(() => {
        const lens = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2
        });

        function raf(time: number) {
            lens.raf(time);
            requestAnimationFrame(raf)
        }

        const animationFrame = requestAnimationFrame(raf)
        return () => {
            cancelAnimationFrame(animationFrame)
            lens.destroy()
        }
    }, [])
    return (
        <>
            {children}
        </>
    )
}

export default SmoothScroll