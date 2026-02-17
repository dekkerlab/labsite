// function obfuscateEmail(user, domain) {
//   if (user && domain) {
//     return `<script type="text/javascript">
//               var user = "${user}";
//               var domain = "${domain}";
//               document.write('<a href="mailto:' + user + '@' + domain + '">' + user + '@' + domain + '</a>');
//             </script>
//             <noscript>[Enable JavaScript to see email address]</noscript>`;
//   }
//   return '[Email Address Hidden]';
// }

function getLastName(fullName) {
  if (!fullName) {
    return "";
  }
  const parts = fullName.split(" ");
  if (parts.length > 1) {
    return parts[parts.length - 1]; // Return the last part
  }
  return fullName; // If only one name, return the full name
}

function currentYear() {
  return new Date().getFullYear();
}

// Export the functions
module.exports = {
  currentYear: currentYear,
  getLastName: getLastName,
  // obfuscateEmail: obfuscateEmail,
};
// Alternatively, you can export them individually:
// exports.getCurrentYear = getCurrentYear;
// exports.obfuscateEmail = obfuscateEmail;
