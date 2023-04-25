import React from 'react';
import { useState, useEffect} from 'react';
import '../Scss/Profile.scss';

export default function Profile() {
    const [user] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [img, setImg] = useState();

    useEffect(() => {
      fetch("https://pokeapi.co/api/v2/pokemon/"+user.id)
        .then((res) => res.json())
        .then(
          (result) => {
            setImg(result.sprites.front_shiny);
            console.log(result);
          },
          (error) => {
            console.log(error);
          }
        )
    })
    
    return (
            
        <div id='profile'>
          <div className="trainer-profile">
        <div className="profile-header">
          <p><em>Profile details</em></p>
          <div className="profile-banner" />
          <div className="profile-avatar">
            <img src={img} alt={user.username} />
          </div>
          <h1 className="profile-username">{user.username}
          </h1>
        </div>
        <div className="profile-stats">
          <div className="stat-item">
            <div className="stat-label">Cryptokemons</div>
            <div className="stat-value">{user.Cryptokemons}</div>
          </div>
        </div>
      </div><div className="stat-item">
          <div className="stat-label">Pokédex personnel</div>
          <div className="stat-value">{user.Pc}</div>
        </div></div>
      );
    }
