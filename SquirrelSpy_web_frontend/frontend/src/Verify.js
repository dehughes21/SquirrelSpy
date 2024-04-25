import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

const Verify = () =>{
    const [sightings, setSightings] = useState([]);

    const getSightings = async () => {
            const response = await fetch('sightings');
            const json = await response.json();
        if (response.ok) {
            console.log("Sightings: ", json);
            setSightings(json);
        }
        else{
            console.log('Failed to Fetch Sightings: ', json)
        }
    }

    useEffect(
        () => {
            getSightings()
        },[]
    )

    /*const handleCheckboxChange = (index) => {
        const updatedSightings = [...sightings];
        updatedSightings[index].is_verified = !updatedSightings[index].is_verified;
        setSightings(updatedSightings);
    };

    const handleCommentChange = (index, event) => {
        const updatedSightings = [...sightings];
        updatedSightings[index].verification_comment = event.target.value;
        setSightings(updatedSightings);
    };
                                <div className="item">
                                    <input
                                        type="checkbox"
                                        checked={sighting.is_verified}
                                        onChange={() => handleCheckboxChange(index)}
                                    />
                                </div>
                                <div className="item">
                                    <input
                                        type="text"
                                        value={sighting.verification_comment}
                                        onChange={(event) => handleCommentChange(index, event)}
                                    />
                                </div>
    */

    const verifySighting = async (id) => {
        const comment = document.getElementById('comment-' + id).value;
        const response = await fetch('/sightings/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, is_verified: true, is_rejected: false, comment: comment}),
        });
        const json = await response.json();
        if (response.ok) {
            getSightings();
            document.getElementById('comment-' + id).value = '';
            console.log(json);
        }
        else{
            console.log('Failed to Verify Sighting: ', json);
        }
    }

    const rejectSighting = async (id) => {
        const comment = document.getElementById('comment-' + id).value;
        const response = await fetch('/sightings/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id, is_verified: false, is_rejected: true, comment: comment}),
        });
        const json = await response.json();
        if (response.ok) {
            getSightings();
            document.getElementById('comment-' + id).value = '';
            console.log(json);
        }
        else{
            console.log('Failed to Reject Sighting: ', json)
        }
    }

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
                    {sightings.filter(sighting => !sighting.is_verified && !sighting.is_rejected)
                        .map((sighting, index) => (
                        <li key={index} className="squirrel-item">
                            <div className="sightings-grid-container">
                                <div className="item"><span><Link to={`/verify/${sighting.id}`}>{sighting.id}</Link></span></div>
                                <div className="item"><span>{sighting.user}</span></div>
                                <div className="item"><span>{sighting.squirrel}</span></div>
                                <div className="item"><span>{sighting.lat}</span></div>
                                <div className="item"><span>{sighting.long}</span></div>
                                <div className="item"><span>{sighting.time}</span></div>
                                <div className="item"><span>{sighting.certainty_level}</span></div>
                                <div className="item"><span>{sighting.comment}</span></div>
                                <div className="item"><span>{sighting.is_verified}</span></div>
                                <div className="item"><span>{sighting.verification_comment}</span></div>
                                <span>
                                    <img
                                        src={sighting.image}
                                        alt={`Sighting ${sighting.id}`}
                                        style={{ width: '150px', height: 'auto' }} // Set width to 100px and auto height to maintain aspect ratio
                                    />
                                </span>
                            </div>
                            <div className="sighting-btn-container">
                                <textarea id={'comment-'.concat(sighting.id)}></textarea>
                                <br></br>
                                <button onClick={() => verifySighting(sighting.id)}>Verify</button>
                                <button onClick={() => rejectSighting(sighting.id)}>Reject</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default Verify;