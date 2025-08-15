'use client'

import useListTopic from '@/components/Templates/Topic/List/useListTopic'
import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function DragDropTopicList() {
  const [values, handles] = useListTopic()
  const { listTopics } = values
  const { handleReorder } = handles

  const topicsInit = [
    { id: 1, name: 'Topic A', orderIndex: 1, price: 0, isFree: true },
    { id: 2, name: 'Topic B', orderIndex: 2, price: 10, isFree: false },
    { id: 3, name: 'Topic C', orderIndex: 3, price: 15, isFree: false }
  ]

  const [topics, setTopics] = useState(topicsInit)

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const updated = Array.from(topics)
    const [moved] = updated.splice(result.source.index, 1)
    updated.splice(result.destination.index, 0, moved)

    const reordered = updated.map((topic, index) => ({
      ...topic,
      orderIndex: index + 1
    }))

    setTopics(reordered)
    handleReorder(reordered)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId='topics'>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              background: '#f0f0f0',
              padding: 10,
              borderRadius: 4,
              minHeight: 200
            }}
          >
            {topics.map((topic, index) => (
              <Draggable key={topic.id} draggableId={topic.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      padding: 10,
                      marginBottom: 8,
                      background: 'green',
                      borderRadius: 4,
                      color: '#fff',
                      ...provided.draggableProps.style
                    }}
                  >
                    {topic.name} (Order: {topic.orderIndex})
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
