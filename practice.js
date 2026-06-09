document.addEventListener("DOMContentLoaded", function () {
    const searchbtn = document.getElementById("search-btn");
    const userinput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyprogresscircle = document.querySelector(".easy-progress-circle");
    const mediumprogresscircle = document.querySelector(".medium-progress-circle");
    const hardprogresscircle = document.querySelector(".hard-progress-circle");
    const easylabel = document.getElementById("easy-label");
    const mediumlabel = document.getElementById("medium-label");
    const hardlabel = document.getElementById("hard-label");
    const cardstatscontainer = document.querySelector(".card-stats-container");

    function validateusername(uername) {
        if (username.trim() === "") {
            alert("Please enter a valid username.");
            return false;
        }
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        const ismaching = usernameRegex.test(username);
        if (!ismaching) {
            alert("Username can only contain letters, numbers, and underscores.");
        }
        return ismatching;
    }

    async function fetchUsersDetails(username) {
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched data:", data);
            return data;
        } catch (error) {
            console.error("Error fetching user details:", error);
            alert("Failed to fetch user details. Please check the username and try again.");
            return null;
        }
    }

    searchbtn.addEventListener("click", function () {
        const username = userinput.value;
        console.log("loginuser name is:", username)
        if (validateusername(username)) {
            fetchUsersDetails(username).then(data => {
                if (data) {
                    const easyCount = data.easySolved || 0;
                    const mediumCount = data.mediumSolved || 0;
                    const hardCount = data.hardSolved || 0;
                    const totalCount = easyCount + mediumCount + hardCount;
                }
            });
        }
    });
});