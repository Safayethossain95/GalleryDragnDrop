import React, { useState } from "react";
import "./GalleryBox.scss";
import { picturesApi } from "../../utils/picturesApi";
import PictureSingle from "../pictureSingle/PictureSingle";
const GalleryBox = () => {
  // change the page body color 
  document.body.style.backgroundColor = "#eceff6";
  const [counted, setcounted] = useState([]);
  const [board, setBoard] = useState(picturesApi);
  const handleids = (targetid, draggedid) => {
    setBoard((prevItems) => switchPositions(prevItems, targetid, draggedid));
  };
  // sorting
  const switchPositions = (array, id1, id2) => {
    const index1 = array.findIndex((item) => item.id === id1);
    const index2 = array.findIndex((item) => item.id === id2);
    const newArray = [...array];
    [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
    newArray.forEach((item, index) => {
      item.id = index + 1;
    });
    return newArray;
  };
  // function for counting selected items 
  const countSelectedfunc = (ids) => {    
    const find = counted.includes(ids);
    if (find) {
      setcounted((prevArr) => prevArr.filter((item) => item !== ids));
    } else {
      setcounted((prevArr) => [...prevArr, ids]);
    }
  };
  const handlenone = () => {};  
  // delete the selected ids by id
  const handleDelete=()=>{
    setBoard(board.filter(item => !counted.includes(item.id)))
    setcounted([])    
  }
  return (
    <>
      <div className="wrapper">
        <div className="topbar">
          <div className="left">
            {counted.length > 0 ? (
              <>
                <input type="checkbox" checked={true} onChange={handlenone} />
                <p>
                  {counted.length > 1 ? (
                    <>{counted.length} Files Selected</>
                  ) : (
                    <>{counted.length} File Selected</>
                  )}
                </p>
              </>
            ) : (
              <p>Gallery</p>
            )}
          </div>
          <div className="right">
            {counted.length > 0 ? (
              counted.length === 1 ? (
                <p onClick={handleDelete}>Delete File</p>
              ) : (
                <p onClick={handleDelete}>Delete Files</p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="galleryboxmain">
          {board.map((picture, key) => {
            return (
                  <PictureSingle                    
                    countfunc={countSelectedfunc}
                    func={handleids}
                    first={key === 0 ? "true" : "false"}
                    imgurl={picture.imgurl}
                    id={picture.id}
                    isChecked={picture.checkbox} 
                    board={board}
                    setboard={setBoard}
                  />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default GalleryBox;
