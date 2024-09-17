// Utility to calculate the difference in days
const calculateDaysDifference = (birthday) => {
  const today = new Date();
  const currentYear = today.getFullYear();

  // Extract month and day from dob
  const birthDate = new Date(
    `${currentYear}-${birthday.getMonth() + 1}-${birthday.getDate()}`
  );
  const timeDiff = birthDate - today;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
};

// Function to generate imageCon HTML
const generateImageCon = (member, daysDiff) => {
  const imgSrc = member.image ? `../${member.image}` : "../images/user.jpg";
  const memberName = member.name;
  const timeLabel =
    daysDiff === 0
      ? "Today"
      : daysDiff > 0
      ? `${daysDiff} days left`
      : `${Math.abs(daysDiff)} days ago`;

  // Create HTML for member
  return `
        <div class="imageCon" style="border-color: ${member.border_color}; box-shadow: ${member.border_shadow};">
          <div class="image">
            <img src="${imgSrc}" alt="${memberName}'s image" class="userimage">
            <p class="i-text-name">${memberName}</p>
            <p class="i-text">${timeLabel}</p>
          </div>
        </div>`;
};

// Get birthdays happening today
const getTodayBirthdays = () => {
  const today = new Date();
  return teamMembers.filter((member) => {
    const dob = new Date(member.dob);
    return (
      dob.getDate() === today.getDate() && dob.getMonth() === today.getMonth()
    );
  });
};

// Get upcoming birthdays within the next 30 days
const getUpcomingBirthdays = () => {
  return teamMembers
    .map((member) => {
      const dob = new Date(member.dob);
      const daysDiff = calculateDaysDifference(dob);
      return { ...member, daysDiff };
    })
    .filter((member) => member.daysDiff > 0 && member.daysDiff <= 30)
    .sort((a, b) => a.daysDiff - b.daysDiff);
};

// Get recent birthdays within the past 30 days
const getRecentBirthdays = () => {
  return teamMembers
    .map((member) => {
      const dob = new Date(member.dob);
      const daysDiff = calculateDaysDifference(dob);
      return { ...member, daysDiff };
    })
    .filter((member) => member.daysDiff < 0 && Math.abs(member.daysDiff) <= 30)
    .sort((a, b) => Math.abs(a.daysDiff) - Math.abs(b.daysDiff));
};

// Render birthdays for a specific container
const renderBirthdays = (container, members, notFoundMessage) => {
  if (members.length === 0) {
    container.innerHTML = `<p class="not-found">${notFoundMessage}</p>`;
  } else {
    container.innerHTML = members
      .map((member) => generateImageCon(member, member.daysDiff || 0))
      .join("");
  }
};

// Render the birthday containers
const renderAllBirthdays = () => {
  const todayContainer = document.querySelector(".today-container");
  const upcomingContainer = document.querySelector(".upcoming-container");
  const recentContainer = document.querySelector(".recent-container");

  const todayMembers = getTodayBirthdays();
  const upcomingMembers = getUpcomingBirthdays();
  const recentMembers = getRecentBirthdays();

  // Render today, upcoming, and recent birthdays
  renderBirthdays(upcomingContainer, upcomingMembers, "No upcoming birthdays");
};

// Initialize rendering when the page loads
document.addEventListener("DOMContentLoaded", renderAllBirthdays);

//--------------------------------------------------------------------->
// Select the UL element where the list items will be added
const statsList = document.getElementById("stats-list");

// Calculate total member count
const totalMembers = teamMembers.length;

// Calculate total word count from all fields
let totalWords = 0;
teamMembers.forEach((member) => {
  Object.values(member).forEach((value) => {
    if (typeof value === "string") {
      totalWords += value.split(/\s+/).length; // Split on any whitespace character
    }
  });
});

// Calculate total memories count (non-empty memories fields)
const totalMemories = teamMembers.filter(
  (member) => member.memories && member.memories.trim() !== ""
).length;

// Get the most recent user (last in the array)
const recentUser = teamMembers[teamMembers.length - 1].name;

// Dynamically create and append the list items
const userCountLi = document.createElement("li");
userCountLi.classList.add("notice-text");
userCountLi.textContent = `User Count: ${totalMembers}`;

const recentUserLi = document.createElement("li");
recentUserLi.classList.add("notice-text");
recentUserLi.textContent = `Recent User: ${recentUser}`;

const wordCountLi = document.createElement("li");
wordCountLi.classList.add("notice-text");
wordCountLi.textContent = `Total Word Count: ${totalWords}`;

const memoriesCountLi = document.createElement("li");
memoriesCountLi.classList.add("notice-text");
memoriesCountLi.textContent = `Memories Count: ${totalMemories}`;

// Append the list items to the UL
statsList.appendChild(userCountLi);
statsList.appendChild(recentUserLi);
statsList.appendChild(wordCountLi);
statsList.appendChild(memoriesCountLi);

//-----------------------
document.addEventListener("DOMContentLoaded", () => {
  // Get today's date
  const today = new Date();

  // Calculate the start of the year
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  // Calculate day of the year
  const dayOfYear =
    Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;

  // Calculate total days in the year
  const totalDays =
    (new Date(today.getFullYear() + 1, 0, 1) - startOfYear) /
    (1000 * 60 * 60 * 24);

  // Update the HTML with the current day and total days
  document.getElementById("day-count").textContent = dayOfYear;
  document.getElementById("total-days").textContent = Math.floor(totalDays);

  // Update the progress bar
  const progress = (dayOfYear / totalDays) * 100;
  document.getElementById("progress").style.width = `${progress}%`;
});
