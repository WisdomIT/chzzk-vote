import React, { useState, useRef, useEffect } from "react";
import { useGlobalOptionStore } from "../../../lib/zustand";
import { Bar, Container, Icon, NumberStyle } from "./ZoomSlider.styled";
import { faMagnifyingGlassPlus } from "@awesome.me/kit-8710ef4103/icons/sharp/solid";

export default function ZoomSlider() {
  const [zoom, setZoom] = useState(100);
  const { zoom: getZoom, setZoom: updateZoom } = useGlobalOptionStore();
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging.current && sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newZoom = Math.min(
        Math.max(
          50,
          Math.round(((event.clientX - rect.left) / rect.width) * 100 + 50)
        ),
        150
      );
      setZoom(newZoom);
    }
  };

  useEffect(() => {
    const handleMouseUpGlobal = () => {
      if (isDragging.current) {
        updateZoom(zoom);
        isDragging.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUpGlobal);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUpGlobal);
    };
  }, [zoom]);

  useEffect(() => {
    setZoom(getZoom);
  }, [getZoom]);

  return (
    <Container ref={sliderRef} onMouseDown={handleMouseDown}>
      <Bar $zoom={zoom} />
      <NumberStyle>
        <Icon icon={faMagnifyingGlassPlus} />
        {zoom}%
      </NumberStyle>
    </Container>
  );
}
