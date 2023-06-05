import { useState } from 'react';
import './App.css';
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { SortableItem } from './SortableItem';


function App() {
  const [languages, setLanguages] = useState(["JavaScript", "Python", "TypeScript"]);

  const handleDragEnd = (event) => {
    console.log('dragged')
    const { active, over } = event
    console.log('ACTIVE' + active.id)
    console.log('OVER' + over.id)
    if (active.id !== over.id) {
      setLanguages((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        console.log(arrayMove(items, activeIndex, overIndex));
        return arrayMove(items, activeIndex, overIndex);
      });

    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >

      <SortableContext
        items={languages}
        strategy={verticalListSortingStrategy}
      >
        {/* We need components that use the useSortable hook */}
        {languages.map(language => <SortableItem key={language} id={language} />)}
      </SortableContext>
    </DndContext>
  );
}

export default App;
