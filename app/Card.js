import React from 'react'

const Card = ({ imgLink, title, description }) => {
    return (
        <div className="card bg-base-100 select-none w-80 sm:w-96 shadow-lg rounded-xl overflow-hidden">
            <figure className="h-48 w-full">
                <img
                    src={imgLink}
                    alt={title}
                    className="object-cover w-full h-full"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title text-lg sm:text-xl">{title}</h2>
                <p className="text-sm sm:text-base">{description}</p>
            </div>
        </div>
    )
}

export default Card
