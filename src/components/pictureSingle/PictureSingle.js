import React, { useEffect, useState } from "react";
import "./PictureSingle.scss";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
const PictureSingle = ({ imgurl, first, id, func, countfunc,isChecked,board,setboard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "image",
    hover: () => {
      // handle hover login if any      
    },
    drop: (droppedItem) => {
      // I handled drop logic      
      func(id, droppedItem.id);
    },
  }));
  // toggling the checkbox and setting it in boards fake json
  const handleCheckboxChange=(myid)=>{
    // sending the id to count the items selected
    countfunc(myid)    
    const updatedBoard = board.map(item => {
      if (item.id === myid) {
        return {
          ...item,
          checkbox: !item.checkbox 
        };
      }      
      return item;
    });    
    setboard(updatedBoard);    
  }   
  return (
    <>
      <div
        ref={(node) => drag(drop(node))}
        style={{ border: isDragging ? "5px solid pink" : "0px",transition:"0.3s" }}
        className={first === "true" ? "grid-item wide" : "grid-item"}
      >
        <div className="overlay" style={{...(isDragging ?{opacity:"0"}:{}),...(isChecked?{opacity:"1",background:"#ffffff9f",border:"1px solid rgb(50, 50, 209)"}:{})}}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange(id)}
          />
        </div>
        <img  src={imgurl} alt="common_img" />
      </div>
    </>
  );
};
export default PictureSingle;
