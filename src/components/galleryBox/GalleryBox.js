import React, { useState } from "react";
import "./GalleryBox.scss";
import { picturesApi } from "../../utils/picturesApi";
import PictureSingle from "../pictureSingle/PictureSingle";
import { useDrop } from "react-dnd";

const GalleryBox = () => {
  document.body.style.backgroundColor = "#eceff6";
  const [board, setBoard] = useState(picturesApi);
  const handleids = (targetid, draggedid) => {
    setBoard((prevItems) => switchPositions(prevItems, targetid, draggedid));
  };

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
  const [counted, setcounted] = useState([]);
  const countSelectedfunc = (ids) => {    
    const find = counted.includes(ids);
    if (find) {
      setcounted((prevArr) => prevArr.filter((item) => item !== ids));
    } else {
      setcounted((prevArr) => [...prevArr, ids]);
    }
  };

  const handlenone = () => {};
  const [clearCheked,setclearCheked] = useState(null)
  const handleDelete=()=>{
    setBoard(board.filter(item => !counted.includes(item.id)))
    setcounted([])
    setclearCheked(false)
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
              counted.length == 1 ? (
                <p onClick={handleDelete}>Delete File</p>
              ) : (
                <p onClick={handleDelete}>Delete Files</p>
              )
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="galleryboxmain" style={{ minHeight: "500px" }}>
          {board.map((picture, key) => {
            return (
             
                
                  <PictureSingle
                    clearchk={clearCheked?clearCheked:null}
                    
                    
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
