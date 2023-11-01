import React,{useEffect, useState} from 'react'
import './PictureSingle.scss'
import { useDrag } from "react-dnd";
import { useDrop } from "react-dnd";
const PictureSingle = ({imgurl,first,id, func}) => {
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "image",
  //   item: { id: id },
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  const [droppedItemvar,setdroppedItemvar] = useState(null)
  const [targetItemvar,settargetItemvar] = useState(null)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'image',
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    hover: () => {
      // Handle hover logic if needed
    },
    drop: (droppedItem) => {
      // Handle drop logic if needed
      setdroppedItemvar(droppedItem.id)
      settargetItemvar(id)
      
      // console.log('Dropped item ID:', droppedItem.id);
      // console.log('Target item ID:', id);
      // Perform any further logic or state updates here
    },
  }));
  useEffect(()=>{
    func(targetItemvar,droppedItemvar)
  },[targetItemvar,droppedItemvar])
  return (
    <>
        <div ref={(node) => drag(drop(node))} style={{ border: isDragging ? "5px solid pink" : "0px" }} className={first==="true"?"grid-item wide":"grid-item"}>
            <div className="overlay">{id}</div>            
            <img src={imgurl} alt="first_img" />
        </div>
    </>
  )
}

export default PictureSingle