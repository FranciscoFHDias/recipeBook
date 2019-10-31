import React from 'react'

const Card = ({ name, image }) => {
  return(
    <div className="card">
      <div className="card-image">
        <figure className="image is4by3">
          <img src={image} alt={name}/>
        </figure>
      </div>
      <div className="card-content">
        <p className="title is-5">{name}</p>
      </div>
    </div>
  )
}

export default Card