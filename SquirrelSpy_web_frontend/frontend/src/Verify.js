import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Verify = () =>{
    const [sightings, setSightings] = useState([]);

    const getSquirrels = async () => {
            const response = await fetch('sightings');
            const json = await response.json();
        if (response.ok) {
            console.log(json);
            setSightings(json);
        }
        else{
            console.log('Failed to fetch')
        }
    }

    useEffect(
        () => {
            getSquirrels()
        },[]
    )

    const handleCheckboxChange = (index) => {
        const updatedSightings = [...sightings];
        updatedSightings[index].is_verified = !updatedSightings[index].is_verified;
        setSightings(updatedSightings);
    };

    return(
        <div>
            <div className="header">
                <div className="logo">
                    <p className="title"> SquirrelSpy</p>
                </div>

                <div className="add-btn">
                    <a className="" href='/export'> Export</a>
                </div>

                <div className="add-btn">
                    <a className="" href='/moderate'> Moderate</a>
                </div>

                <div className="add-btn">
                    <a className="" href='/verify'> Verify</a>
                </div>

                <div className="add-btn">
                    <a className="" href='/edit'> Edit</a>
                </div>
            </div>

            <div className="container">
                <ul className="list">
                <div className="sightings-grid-container">
                <li>ID:</li>
                <li>User:</li>
                <li>Squirrel:</li>
                <li>Lat:</li>
                <li>Long:</li>
                <li>Time:</li>
                <li>Certainty_level:</li>
                <li>Is_verified:</li>
                <li>Verification_comment:</li>
                <li>Comment:</li>
                <li>Image:</li>
                </div>
                    {sightings.map((sighting, index) => (
                        <li key={index} className="squirrel-item">
                            <div className="sightings-grid-container">
                                <div className="item"><span><Link to={`/verify/${sighting.id}`}>{sighting.id}</Link></span></div>
                                <div className="item"><span>{sighting.user}</span></div>
                                <div className="item"><span>{sighting.squirrel}</span></div>
                                <div className="item"><span>{sighting.lat}</span></div>
                                <div className="item"><span>{sighting.long}</span></div>
                                <div className="item"><span>{sighting.time}</span></div>
                                <div className="item"><span>{sighting.certainty_level}</span></div>
                                <div className="item">
                                    <input
                                        type="checkbox"
                                        checked={sighting.is_verified}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </div>
                                <div className="item"><span>{sighting.verification_comment}</span></div>
                                <div className="item"><span>{sighting.comment}</span></div>
                                <span>
                                    <img
                                        src={sighting.image}
                                        alt={`Sighting ${sighting.id}`}
                                        style={{ width: '150px', height: 'auto' }} // Set width to 100px and auto height to maintain aspect ratio
                                    />
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default Verify;