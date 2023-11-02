import React, { useEffect, useState } from "react";
import "./PictureSingle.scss";
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
const PictureSingle = ({ imgurl, first, id, func, countfunc,transform,translate,isChecked,uncheck,board,setboard }) => {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "image",
  //   item: { id: id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  const [droppedItemvar, setdroppedItemvar] = useState(null);
  const [targetItemvar, settargetItemvar] = useState(null);
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
      // Handle hover logic
      
    },
    drop: (droppedItem) => {
      // Handled drop logic if
      
      func(id, droppedItem.id);
    },
  }));
  
  
  
  // const handleCheckboxChange = (myid) => {
  //   setIsChecked(prevState => !prevState);     
  //     countfunc(id)
  // };

  // useEffect(() => {
  //   if (clearchk === false) {
  //     handleCheckboxChange(id, isChecked);
  //   }
  // }, [isChecked, handleCheckboxChange, id]);
  // const [isChecked,setIsChecked]=useState(false)
  const handleCheckboxChange2=(myid)=>{
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
        style={{ border: isDragging ? "5px solid pink" : "0px",transition:"0.3s",transform:transform,translate:translate }}
        className={first === "true" ? "grid-item wide" : "grid-item"}
      >
        <div className="overlay" style={{...(isDragging ?{opacity:"0"}:{}),...(isChecked?{opacity:"1",background:"#ffffff9f",border:"1px solid rgb(50, 50, 209)"}:{})}}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => handleCheckboxChange2(id)}
          />
        </div>
        <img  src={imgurl} alt="first_img" />
      </div>
    </>
  );
};

export default PictureSingle;
