async function fetchUserData() {
  const userList = document.getElementById("userList");
  const statusMsg = document.getElementById("statusMessage");
  userList.innerHTML = "";
  statusMsg.textContent = "Fetching users...";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Unable to fetch user data.");
    }

    const users = await response.json();
    if (users.length === 0) {
      statusMsg.textContent = "No users found.";
      return;
    }

    statusMsg.textContent = "";

    users.forEach(user => {
      const userCard = document.createElement("div");
      userCard.className = "user-card";

      userCard.innerHTML = `
        <h3>#${user.id} - ${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
        <div class="details">
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Company:</strong> ${user.company.name}</p>
          <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        </div>
      `;

      userCard.addEventListener("click", () => {
        const details = userCard.querySelector(".details");
        details.classList.toggle("open");
      });

      userList.appendChild(userCard);
    });

  } catch (error) {
    if (!navigator.onLine) {
      statusMsg.textContent = "You are offline. Please check your internet connection.";
    } else {
      statusMsg.textContent = `Error: ${error.message}`;
    }
  }
}

window.onload = fetchUserData;
