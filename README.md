# Checkn-Bot
Botkit Bot hosted on glitch for Checkn, CSE 112 Project

Not yet approved on Facebook, message me to add. 

For: https://lucky13-dev.herokuapp.com/

Say some greeting (hello) to begin. 
Bot used for appointments on facebook, if user replies no, it will ask for phone number for purpose of looking up user appointments to edit or delete. 
Right now making appointments has validation for whether a company actually uses our service as well as date format (MM/DD/YYYY or MM-DD-YYYY) validation. Saves directly to database from hosted site.

I am using https://glitch.com/edit/#!/sweltering-bit to host. 

**Skills**:

skill_module.js handles setting an appointment with validation of some user input and database storage. Also handles setting the variables that are displayed back to user in a readable format. appointments.json can be imported into Botkit for use with this script.

viewappointments.js handles the display of appointments for that user as well as selected deletions or updates to appointments. viewappointments.json can be imported into Botkit studio for use with this script. 

hello.json can be imported for the start of the conversation. 

Same conversation scripts should work (conversations triggers and intent setup on Botkit studio) for other services. Change bot type in bot.js and env files to use other services like slack. For use with a Facebook page make an env file with the following: 
```
page_token=GETFROMFACEBOOK
verify_token=MAKEYOUROWN
studio_token=FROMBOTKITSTUDIO
PORT=3000
```
If using MongoDB, you should also place the mongoURI there for safety reasons, even though I did not currently (whoops). 
Setup the Facebook page with webhook url, for example I had: https://sweltering-bit.glitch.me/facebook/receive and the verify_token.

There is middleware for api.ai available for Botkit but we couldn't implement in time. 
