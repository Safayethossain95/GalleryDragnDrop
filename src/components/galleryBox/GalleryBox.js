import React, { useState } from "react";
import "./GalleryBox.scss";
import { picturesApi } from "../../utils/picturesApi";
import PictureSingle from "../pictureSingle/PictureSingle";
import { useDrop } from "react-dnd";
const GalleryBox = () => {
  const [board, setBoard] = useState(picturesApi);

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: "image",
  //   drop: (item) => addImageToBoard(item.id),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));

  // const addImageToBoard = (id) => {
  //   const picture = picturesApi.find((picture) => id === picture.id);
  //   setBoard((board) => {
  //     return board.map((item) => {
  //       if (item.id === id) {
  //         return picture;
  //       }
  //       return item;
  //     });
  //   });
  // };
  const handleids=(targetid,draggedid)=>{
    console.log("im from main targetid",targetid);
    console.log("im from main draggedid",draggedid);
    // switchPositions(board,draggedid,targetid)
    setBoard(prevItems => switchPositions(prevItems,targetid, draggedid));
  }
  const generateRandomId = () => {
    return Math.floor(Math.random() * 100000); // You may need to adjust the range
  };
 
  const switchPositions = (array, id1, id2) => {
    const index1 = array.findIndex(item => item.id === id1);
    const index2 = array.findIndex(item => item.id === id2);
  
    
    const newArray = [...array];
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];

    newArray.forEach((item, index) => {
      item.id = index + 1;
    });
  
    return newArray;
  };
  return (
    <>
      <div className="galleryboxmain" style={{minHeight:"500px"}} >
        {board.map((picture,key) => {
          return <PictureSingle func={handleids} first={key === 0 ? "true" : "false"} imgurl={picture.imgurl} id={picture.id} />;
        })}
      </div>
    </>
  );
};

export default GalleryBox;
