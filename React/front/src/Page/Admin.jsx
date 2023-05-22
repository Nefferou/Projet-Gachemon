import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { List , ListItem, ListItemText,ListItemSecondaryAction } from "@mui/material";

function Admin({ user, token }) {
    const [users, setUsers] = useState([]);

    // Fetch users
    useEffect(() => {
        axios.get('https://gachemon.osc-fr1.scalingo.io/api/users', { headers: { Authorization: `${token}` } }) // replace with your API endpoint
            .then(response => {
                setUsers(response.data);
                console.log(response);
                console.log(response.data[0]);
                console.log(users);
            }
            )
            .catch(error => console.error('Error fetching users:', error));
    }, [token]);

    const deleteUser = (userId) => {
        // Don't allow the current user to delete themselves
        if (userId === user.id) {
            return;
        }

        axios.delete(`https://gachemon.osc-fr1.scalingo.io/api/users/${userId}`, { headers: { Authorization: `${token}` } }) // replace with your API endpoint
            .then(() => {
                // Update the list of users after deletion
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => console.error('Error deleting user:', error));
    };

    const banUser = (userId) => {
        // Don't allow the current user to ban themselves
        if (userId === user.id) {
            return;
        }

        axios.put(`https://gachemon.osc-fr1.scalingo.io/api/users/${userId}/ban`, { password: "/" }, { headers: { Authorization: `${token}` } }) // replace with your API endpoint
            .then(response => {
                if (response.status === 200) {
                    // Update the list of users after banning
                    setUsers(users.map(user => {
                        if (user.id === userId) {
                            return { ...user, password: "/" };
                        }
                        return user;
                    }));
                }
            })
            .catch(error => console.error('Error banning user:', error));
    };

    return (
    <div>
            <h1>Admin Page</h1>
            <List>
                {users.map(user => (
                    <ListItem key={user[0].id}>
                        <ListItemText primary={user[0].id} />
                        <ListItemText primary={user[0].username} />
                        <ListItemText primary={user[0].password} />
                        <ListItemText primary={user[0].email} />
                        <ListItemText primary={user[0].cryptokemons} />
                        <ListItemText primary={user[0].idAdmin} />
                        <ListItemSecondaryAction>
                            <Button variant="contained" color="secondary" onClick={() => deleteUser(user[0].id)}>Delete</Button>
                            {user[0].password !== "/" && 
                                <Button variant="contained" color="warning" onClick={() => banUser(user[0].id)}>Ban</Button>
                            }
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </div>
    );
}

export default Admin;
