import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';

const Edit = () =>{
    const [squirrels, setSquirrels] = useState([]);
    const [sightings, setSightings] = useState([]);
    const [newSquirrel, setNewSquirrel] = useState({
        name: '',
        left_ear_color: '',
        right_ear_color: '',
        serial_num: '',
        age: '',
        sex: '',
        weight: '',
        species: ''
    });


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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log('name: ', name);
        console.log('value: ', value);
        setNewSquirrel({...newSquirrel, [name]: value});
    }

    const createSquirrel = async (event) => {
        console.log("Squirrel: ", newSquirrel);
        event.preventDefault();
        const response = await fetch('/squirrels/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newSquirrel),
        });
        const json = await response.json();
        if (response.ok) {
            getSquirrels();
            console.log(json);
        }
        else{
            console.log('Failed to Create Squirrel: ', json)
        }
    }

        useEffect(
        () => {
            getSquirrels()
            getSightings()
        },[]
    )

    /*<div className="Edit-left">
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
                </div>*/


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

            <div className="create-squirrel-container" style={{marginLeft: '30em', marginRight: '25em'}}>
                <form onSubmit={createSquirrel} style={{padding: '1em', alignContent: 'center', backgroundColor: '#a68145', border: 'solid', borderStyle: 'outset', borderWidth: '0.5em', borderColor: '#91703c'}}>
                <h2>Add New Squirrel</h2>
                    <label>Name
                        <br></br>
                        <input
                            type='text' 
                            name='name'
                            value={newSquirrel.name}
                            onChange={handleChange}
                        />
                    </label>
                    <br></br>
                    <div style={{display: 'flex'}}>
                        <label>Left Ear Color
                            <br></br>
                            <select name='left_ear_color' value={newSquirrel.left_ear_color} onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Color</option>
                                <option value="red">Red</option>
                            </select>
                        </label>
                        <label>Right Ear Color
                            <br></br>
                            <select name='right_ear_color' value={newSquirrel.right_ear_color} onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Color</option>
                                <option value="blue">Blue</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Tag Serial Number
                            <br></br>
                            <input type='text' name='serial_num' value={newSquirrel.serial_num} onChange={handleChange}/>
                        </label>
                    </div>
                    <div>
                        <label>Sex
                            <br></br>
                            <select name='sex' value={newSquirrel.sex} onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Sex</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                        </label>
                        <br></br>
                        <label>Age
                            <br></br>
                            <input type='number' name='age' value={newSquirrel.age} onChange={handleChange}/>
                        </label>
                        <br></br>
                        <label>Weight
                            <br></br>
                            <input type='number' name='weight' value={newSquirrel.weight} onChange={handleChange}/>
                        </label>
                        <br></br>
                        <label>Species
                            <br></br>
                            <select name='species' value={newSquirrel.species} onChange={handleChange}>
                                <option value="" selected disabled hidden>Select Species</option>
                                <option value="Brown">Brown</option>
                                <option value="Black">Black</option>
                                <option value="Red">Red</option>
                            </select>
                        </label>
                    </div>
                    <br></br>
                    <button type='submit'>Submit</button>
                </form>
            </div>

             <div className="container">
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
                                <span>
                                    <img
                                        src={squirrel.image}
                                        alt={`Squirrel ${squirrel.id}`}
                                        style={{ width: '150px', height: 'auto' }} // Set width to 100px and auto height to maintain aspect ratio
                                    />
                                </span>
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