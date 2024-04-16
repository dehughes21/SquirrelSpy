import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';

const Export = () =>{
    const [sightings, setSightings] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [checkboxes, setCheckboxes] = useState({
        id: true,
        user: true,
        squirrel: false,
        lat: true,
        long: false,
        time: false,
        certainty_level: false,
        is_verified: false,
        verification_comment: false,
        comment: false,
        image: false,
    });




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

    useEffect(() => {
        const filterSightingsByDate = async () => {
            const response = await fetch('sightings');
            const json = await response.json();
            if (response.ok) {
                let filteredSightings = json;
                if (startDate && endDate) {
                    filteredSightings = json.filter((sighting) => {
                        const sightingDate = new Date(sighting.time);
                        return sightingDate >= new Date(startDate) && sightingDate <= new Date(endDate);
                    });
                }
                setSightings(filteredSightings);
            } else {
                console.log('Failed to fetch');
            }
        };

        filterSightingsByDate();
    }, [startDate, endDate]);


    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (name === 'startDate') {
            setStartDate(value);
        } else if (name === 'endDate') {
            setEndDate(value);
        } else {
            setCheckboxes({
                ...checkboxes,
                [name]: checked,
            });
        }
    };



    const exportToCSV = () => {
        const csvContent = 'data:text/csv;charset=utf-8,';
        const headers = Object.keys(sightings[0]).join(',');
        const rows = sightings.map((sighting) => Object.values(sighting).join(','));
        const csvData = [headers, ...rows].join('\n');
        const encodedUri = encodeURI(csvContent + csvData);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'squirrelspyEXP.csv');
        document.body.appendChild(link);
        link.click();
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
                <div className="date-inputs">
                    <label htmlFor="startDate">Start Date:</label>
                    <input type="date" id="startDate" name="startDate" value={startDate} onChange={handleChange} />
                    <label htmlFor="endDate">End Date:</label>
                    <input type="date" id="endDate" name="endDate" value={endDate} onChange={handleChange} />
                </div>

            <div className="checkboxes">
                <label>
                    <input type="checkbox" name="user" checked={checkboxes.checkbox2} onChange={handleChange} />
                    User
                </label>

                <label>
                    <input type="checkbox" name="lat" checked={checkboxes.checkbox4} onChange={handleChange} />
                    Lat
                </label>
                <label>
                    <input type="checkbox" name="long" checked={checkboxes.checkbox5} onChange={handleChange} />
                    Long
                </label>
                <label>
                    <input type="checkbox" name="time" checked={checkboxes.checkbox6} onChange={handleChange} />
                    Time
                </label>
                <label>
                    <input type="checkbox" name="certainty_level" checked={checkboxes.checkbox7} onChange={handleChange} />
                    Certainty Level
                </label>
                <label>
                    <input type="checkbox" name="is_verified" checked={checkboxes.checkbox8} onChange={handleChange} />
                    Is Verified
                </label>
                <label>
                    <input type="checkbox" name="verification_comment" checked={checkboxes.checkbox9} onChange={handleChange} />
                    Verification Comment
                </label>
                <label>
                    <input type="checkbox" name="comment" checked={checkboxes.checkbox10} onChange={handleChange} />
                    Comment
                </label>
                <label>
                    <input type="checkbox" name="image" checked={checkboxes.checkbox11} onChange={handleChange} />
                    Image
                </label>
            </div>


                <button onClick={exportToCSV}>Export as CSV</button>
                 <ul className="list">
                {sightings.map((sighting, index) => (
                    <li key={index} className="squirrel-item">
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
    </div>
)
}


export default Export;