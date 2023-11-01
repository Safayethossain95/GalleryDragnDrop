import React from 'react'
import GalleryBox from './components/galleryBox/GalleryBox'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const App = () => {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <GalleryBox />
      </DndProvider>
    </>
  )
}

export default App
