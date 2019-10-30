// import React, { useState, useEffect,useQuery } from 'react';

// function useFriendStatus(friendID) {
//     const [isOnline, setIsOnline] = useState(null);

//     useEffect(() => {
//         function handleStatusChange(status) {
//             setIsOnline(status.isOnline);
//         }

//         ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
//         return () => {
//             ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
//         };
//     });

//     return isOnline;
// }
// const loginStatus = () => {
// 	const { data } = useQuery(IS_LOGGED_IN);
// 	console.log("componentDidMount", data);
// 	this.setState({ isLoggedIn: data.isLoggedIn })

// }