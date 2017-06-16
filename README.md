# Checkn-Bot
Botkit Bot hosted on glitch for Checkn, CSE 112 Project

Bot used for appointments on facebook, if user replies no, it will ask for phone number for purpose of looking up user appointments to edit or delete.

Skills:
skill_module.js handles setting an appointment with validation of user input and database storage. 

viewappointments.js handles the display of appointments for that user as well as selected deletions or updates. 
RUNNING HERE: glitch.com/edit/#!/sweltering-bit

same conversation scripts should work (conversations triggers and intent setup on Botkit studio). Change bot type in bot.js and env files to use other services like slack. Middleware for api.ai available but we couldnt implement in time. 
