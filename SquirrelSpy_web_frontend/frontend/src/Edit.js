import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';

const Edit = () =>{
    const [squirrels, setSquirrels] = useState([]);
    const [sightings, setSightings] = useState([]);


    const getSquirrels = async () => {
            const response = await fetch('squirrels');
            const json = await response.json();
        if (response.ok) {
            console.log(json);
            setSquirrels(json);
        }
        else{
            console.log('Failed to fetch')
        }
    }

    const getSightings = async () => {
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
            getSightings()
        },[]
    )


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
                 <div className="Edit-left">
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
                                <div className="item"><span>{sighting.id}</span></div>
                                <div className="item"><span>{sighting.user}</span></div>
                                <div className="item"><span>{sighting.squirrel}</span></div>
                                <div className="item"><span>{sighting.lat}</span></div>
                                <div className="item"><span>{sighting.long}</span></div>
                                <div className="item"><span>{sighting.time}</span></div>
                                <div className="item"><span>{sighting.certainty_level}</span></div>
                                <div className="item"><span>{sighting.is_verified}</span></div>
                                <div className="item"><span>{sighting.verification_comment}</span></div>
                                <div className="item"><span>{sighting.comment}</span></div>
                                <div className="item"><span>{sighting.image}</span></div>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
                <div className="Edit-right">
                    <ul className="list">
                    <div className="squirrels-grid-container">
                        <li>Name:</li>
                        <li>ID:</li>
                        <li>Age:</li>
                        <li>Sex:</li>
                        <li>Species:</li>
                        <li>Serial_num:</li>
                        <li>Weight:</li>
                        <li>Left_ear_color:</li>
                        <li>Right_ear_color:</li>
                        <li>Image:</li>
                    </div>
                    {squirrels.map((squirrel, index) => (
                        <li key={index} className="squirrel-item">
                            <div className="squirrels-grid-container">
                                <div className="item"><span>{squirrel.name}</span></div>
                                <div className="item"><span>{squirrel.id}</span></div>
                                <div className="item"><span>{squirrel.age}</span></div>
                                <div className="item"><span>{squirrel.sex}</span></div>
                                <div className="item"><span>{squirrel.species}</span></div>
                                <div className="item"><span>{squirrel.serial_num}</span></div>
                                <div className="item"><span>{squirrel.weight}</span></div>
                                <div className="item"><span>{squirrel.left_ear_color}</span></div>
                                <div className="item"><span>{squirrel.right_ear_color}</span></div>
                                <div className="item"><span>{squirrel.image}</span></div>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        </div>
    )

}


export default Edit;