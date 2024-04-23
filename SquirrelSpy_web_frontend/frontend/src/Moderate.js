import React from 'react'
import './style/mian.css'
import {useEffect, useState} from 'react';

const Moderate = () =>{
    const [users, setUsers] = useState([]);

    const getSquirrels = async () => {
            const response = await fetch('users');
            const json = await response.json();
        if (response.ok) {
            console.log(json);
            setUsers(json);
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
                    <div className="users-grid-container">
                    <li>ID:</li>
                    <li>Name:</li>
                    <li>email:</li>
                    <li>is_staff:</li>
                    <li>is_active:</li>
                    <li>date_joined:</li>
                    <li>user.image:</li>
                    </div>
                    {users.map((user, index) => (
                        <li key={index} className="squirrel-item">
                            <div className="users-grid-container">
                                <div className="item"><span>{user.id}</span></div>
                                <div className="item"><span>{user.username}</span></div>
                                <div className="item"><span>{user.email}</span></div>
                                <div className="item"><span>{user.is_staff}</span></div>
                                <div className="item"><span>{user.is_active}</span></div>
                                <div className="item"><span>{user.date_joined}</span></div>
                                <div className="item"><span>{user.image}</span></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )

}


export default Moderate;