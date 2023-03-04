import { alpha, styled } from "@mui/material/styles";
import React, { useState, useCallback, useEffect, useRef, MouseEventHandler } from "react";

const SCROLL_BOX_MIN_HEIGHT = 20;

interface Scrollbar { 
    children?:any, 
    className?:string, 
    restProps?:Array<React.ReactNode> 
}


const ScrollThumb = styled('div')(({ theme, style }) => ({
    width: 8,
    height: 20,
    marginLeft: 2,
    position: "absolute",
    borderRadius: 8,
    top: 0,
    backgroundColor: alpha( theme.palette.primary.main, 0.9 ),
    ...style,
}));

const ScrollContainer = styled('div')(({theme, style}) => ({
    position: "relative",
    height: "100%",
}));

const ScrollHost = styled('div')(({theme, style}) => ({
    overflow: "auto",
    height: "100%",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    position: "relative",
}));

const ScrollTrack = styled('div')(({theme, style}) => ({
    width: 10,
    height: "100%",
    position: "absolute",
    right:0,
    top:0,
    bottom: 0,
    backgroundColor: alpha(theme.palette.background.default, 0.5 ),
    borderRadius: 7,
    ...style
}));

export default function Scrollbar(props: Scrollbar ):JSX.Element {
  const [hovering, setHovering] = useState(false);
  const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);

  const handleMouseOver = useCallback(() => {
    !hovering && setHovering(true);
  }, [hovering]);

  const handleMouseOut = useCallback(() => {
    !!hovering && setHovering(false);
  }, [hovering]);

  const handleDocumentMouseUp = useCallback(
      (    e: { preventDefault: () => void; }) => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
      (    e: { preventDefault: () => void; stopPropagation: () => void; clientY: React.SetStateAction<any>; }) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;

        let deltaY = e.clientY - lastScrollThumbPosition;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

 
  const handleScrollThumbMouseDown = useCallback(( e: any ) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
    // console.log("handleScrollThumbMouseDown");
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement = scrollHostRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

    let newTop =
      (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) * offsetHeight;
    // newTop = newTop + parseInt(scrollTop, 10);
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, []);

  const scrollHostRef:React.MutableRefObject<any> = useRef();

  useEffect(() => {
    const scrollHostElement = scrollHostRef.current;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      SCROLL_BOX_MIN_HEIGHT
    );
    setScrollBoxHeight(scrollThumbHeight);
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return function cleanup() {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
  

    <ScrollContainer onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
        <ScrollHost ref={scrollHostRef} {...props.restProps} className={props?.className}>
            {props.children}
        </ScrollHost>
        <ScrollTrack style={{ opacity: hovering ? 1 : 0 }}>
            <ScrollThumb style={{ height: scrollBoxHeight, top: scrollBoxTop }} onMouseDown={handleScrollThumbMouseDown} />
        </ScrollTrack>
    </ScrollContainer>
  );
}
