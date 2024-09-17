// First, get the user's public IP address
fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    const ip = data.ip;

    // Use the IP address to fetch ASN data from ipinfo.io
    return fetch(`https://ipinfo.io/${ip}?token=7ff52f939bfe75`);
  })
  .then((response) => response.json())
  .then((data) => {
    const locationSpan = document.getElementById("location");
    const asnData = data.org; // ASN data typically in the 'org' field

    // Split to remove the ASN ID and only show the organization name
    const asnName = asnData.split(" ").slice(1).join(" ");

    // Set the ASN name in the HTML
    locationSpan.innerHTML = `${asnName} <br> ${data.ip}`;
  })
  .catch((err) => {
    const locationSpan = document.getElementById("location");
    console.error("Error fetching ASN data:", err);
    locationSpan.innerHTML = `Blocked by Privacy`;
  });
