import React, { useState } from "react";
import axios from "axios";

const GitHubUserCard = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [inputVisible, setInputVisible] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`https://api.github.com/users/${username}`);
            setUser(response.data);
            setInputVisible(false);
        } catch (error) {
            alert("Enter Valid User Name");
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="flex flex-col w-full h-full items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {inputVisible ? (
                <form onSubmit={handleSubmit} className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter GitHub username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 ml-2 rounded">
                        Fetch
                    </button>
                </form>
            ) : null}
            {user && (
                <div className="border-collapse p-6 w-[22%] bg-white rounded bg-sky-300 shadow-2xl">
                    <img src={user.avatar_url} alt={`${user.login} avatar`} className="w-15 h-15 rounded-full mb-4 mx-auto" />
                    <h2 className="text-xl font-bold mb-2 text-center border-b-2 border-indigo-500 uppercase text-violet-800">{user.name}</h2>
                    <p className="mb-2 italic font-medium text-rose-600">@{user.login}</p>
                    <p className="mb-2 font-medium">Public Repos: {user.public_repos}</p>
                    <p className="mb-2 font-medium">Public Gists: {user.public_gists}</p>
                    <p className="mb-2 font-medium">Profile created at: {formatDate(user.created_at)}</p>
                </div>
            )}
        </div>
    );
};

export default GitHubUserCard;
