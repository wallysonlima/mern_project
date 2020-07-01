import React from 'react';

const Users = () => {
    const USERS = [
        {
            id: 'u1', 
            name: "Wallyson Lima", 
            image: 'https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fveja.abril.com.br%2Fblog%2Fisabela-boscov%2Fo-rei-leao-2019%2F&psig=AOvVaw3tPIfB80R9uGqDW8vUy8t9&ust=1593687559981000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOiGqvryq-oCFQAAAAAdAAAAABAD', 
            places: 3
        }
    ];


    return <UsersList items={USERS} />;
}