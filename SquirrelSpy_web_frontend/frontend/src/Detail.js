import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
    const [sightings, setSightings] = useState([]);
    const { id } = useParams(); // Extracting the ID parameter from the URL

    useEffect(() => {
        let isMounted = true; // Flag to track if component is still mounted

        const getSquirrels = async () => {
            try {
                const response = await fetch('/sightings');
                const json = await response.json();
                if (response.ok && isMounted) {
                    // Filter the sightings data based on the ID parameter
                    const filteredSightings = json.filter(sighting => sighting.id == id);
                    setSightings(filteredSightings);
                } else {
                    console.log('Failed to fetch');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        getSquirrels();

        // Cleanup function to set isMounted to false when component unmounts
        return () => {
            isMounted = false;
        };
    }, [id]); // Add id to the dependency array to fetch data when ID changes


    return (
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
                                <div className="item"><span>{sighting.id}</span></div>
                                <div className="item"><span>{sighting.user}</span></div>
                                <div className="item"><span>{sighting.squirrel}</span></div>
                                <div className="item"><span>{sighting.lat}</span></div>
                                <div className="item"><span>{sighting.long}</span></div>
                                <div className="item"><span>{sighting.time}</span></div>
                                <div className="item"><span>{sighting.certainty_level}</span></div>
                                <div className="item"><span>{sighting.is_verified ? 'Verified' : 'Not Verified'}</span></div>
                                <div className="item"><span>{sighting.verification_comment}</span></div>
                                <div className="item"><span>{sighting.comment}</span></div>
                                <div className="item"><span>{sighting.image}</span></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Detail;