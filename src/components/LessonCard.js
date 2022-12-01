import React from 'react'

function LessonCard({lesson}) {
  return (
    <li> <a href={`/admin/lessons/${lesson._id}`}> 
            <div>
            <img src={lesson.thumbnail}></img>
        </div>
            <h2>{lesson.title}</h2>
        
        </a></li>
  )
}

export default LessonCard