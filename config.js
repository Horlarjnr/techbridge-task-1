// Where the website finds the API. Shared by the dashboard and the Challenge Hub.
//
// - On localhost:3000 (or any deployed site where the API and the website share one address)
//   the API is on the same address, so the address stays empty.
// - On other local addresses (for example Live Server on port 5500, or a file opened directly)
//   the API is expected at http://localhost:3000.
// - If you host the website and the API on different addresses, put the API address in REMOTE_API_URL,
//   for example "https://techbridge-platform.onrender.com".

const LOCAL_API_URL = "http://localhost:3000";
const REMOTE_API_URL = "";

const pageHost = window.location.hostname;
const isLocalPage = window.location.protocol === "file:" || pageHost === "localhost" || pageHost === "127.0.0.1";

if (isLocalPage) {
    window.TECHBRIDGE_API = window.location.port === "3000" ? "" : LOCAL_API_URL;
} else {
    window.TECHBRIDGE_API = REMOTE_API_URL;
}
