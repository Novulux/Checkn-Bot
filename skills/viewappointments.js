  /*

Botkit Studio Skill module to enhance the "View Appointments" script

*/

var Appointment = require('../models/Appointment');
var formatting = require ('./skill_module.js');
var moment = require('moment-timezone');
module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('View Appointments', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');

        console.log('BEFORE: View Appointments');
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: newtime
    controller.studio.validate('View Appointments','newtime', function(convo, next) {

        var value = convo.extractResponse('newtime');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: newtime');

        // always call next!
        next();

    });

    // Validate user input: newdate
    controller.studio.validate('View Appointments','newdate', function(convo, next) {

        var value = convo.extractResponse('newdate');

      
        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation
        console.log('VALIDATE: View Appointments VARIABLE: newdate');


        // always call next!
        next();

    });
  
    // Validate user input: todelete
    //deletes an appointment for the user
    controller.studio.validate('View Appointments','todelete', function(convo, next) {

        var value = convo.extractResponse('todelete');
      //Checks if chosen appointment is one listed
        if(!(parseInt(value) > 0 && parseInt(value) <= allAppointments.length)){
            convo.gotoThread('invalid');
        }
        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: todelete');
        var idToDelete = allAppointments[value-1]._id;
        //removes matching appointment from database.
        Appointment.remove({ _id: idToDelete }, function (err, appointment) {
          if (err) {
            console.err(err);
          }
          else{
          convo.gotoThread('deleted');
          // always call next!
          }
        });          
        next();

    });
  
    // Validate user input: edit
    controller.studio.validate('View Appointments','edit', function(convo, next) {

        var value = convo.extractResponse('edit');
        //Checks if chosen appointment is one listed
        if(!(parseInt(value) > 0 && parseInt(value) <= allAppointments.length)){
            convo.gotoThread('invalid');
        }

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: edit');

        // always call next!
        next();
    });
    var allAppointments; //all appointments in json form
    // Validate user input: identity
    controller.studio.validate('View Appointments','identity', function(convo, next) {

        var value = convo.extractResponse('identity'); //phone number to give user identity

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation
        var entry= {company:" ", date:" "};
        var entries= [];
        console.log('VALIDATE: View Appointments VARIABLE: identity');
        Appointment.find({ phone_number: value }, function (err, appointments) {
        if (err) {
          console.err(err);
        }
        else{
          allAppointments = appointments;
          if(appointments.length == 0){
            convo.gotoThread('no appointments');
          }
          else{
            //converts the appointment data so that company and date is displayed to user
            function appointmentData(company, date,number){
              this.company = company;
              this.date = date;
              this.number = number;
            }
              //format to display data from appointments to user
              appointmentData.prototype.toString = function dataToString() {
              var time = this.date.split(',');
              var date = moment(this.date).tz("America/Los_Angeles").format("dddd MMM DD YYYY");
            
              var ret = ". #" +this.number + ": " + this.company + ' at ' + date + "," +time[1];
              return ret;
            }
              //get the desired data from each appointment
            for(var i = 0; i < appointments.length; i++){
              console.log(appointments[i].company_name);
              //var displayDate = new Date(appointments[i].date.toLocaleString('en-US', { hour12: true, timeZone: 'America/Los_Angeles', timeZoneName:'short' }));
              var displayDate = appointments[i].date.toLocaleString('en-US', { hour12: true, timeZone: 'America/Los_Angeles', timeZoneName:'short' });
              console.log("Display date is %s",displayDate);
              
              var data = new appointmentData(appointments[i].company_name, displayDate, i +1);
              data = data.toString();
              entries.push(data);
            }
            console.log(entries); 
            
            convo.setVar('list',entries);
            convo.gotoThread('have appointments');
          }
        }
      });
        // always call next!
        next();

    });

    // Validate user input: question_1
    controller.studio.validate('View Appointments','question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('View Appointments','question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('View Appointments','question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: View Appointments VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('View Appointments','default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('View Appointments','on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the no appointments thread starts, run this:
    controller.studio.beforeThread('View Appointments','no appointments', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *no appointments*');

        // always call next!
        next();
    });

    // Before the have appointments thread starts, run this:
    controller.studio.beforeThread('View Appointments','have appointments', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *have appointments*');

        // always call next!
        next();
    });

    // Before the delete thread starts, run this:
    controller.studio.beforeThread('View Appointments','delete', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *delete*');

        // always call next!
        next();
    });

    // Before the edit thread starts, run this:
    controller.studio.beforeThread('View Appointments','edit', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *edit*');

        // always call next!
        next();
    });

    // Before the deleted thread starts, run this:
    controller.studio.beforeThread('View Appointments','deleted', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *deleted*');

        // always call next!
        next();
    });
  
     // Before the invalid thread starts, run this:
    controller.studio.beforeThread('View Appointments','invalid', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *View Appointments*, about to start the thread *invalid*');
        // always call next!
        next();
    });
    //edit data 
    controller.studio.after('View Appointments', function(convo, next) {

        console.log('AFTER: View Appointments');

        // edits the appointment
        if (convo.successful() && responses.edit) {

          var responses = convo.extractResponses();
          // do something with the responses
          //get the id of the correct appointment
          var idToEdit = allAppointments[responses.edit-1]._id;
          var inputDate = (new Date(jsDate(responses.newdate, responses.newtime)));
          //adjust from -7 of Los Angeles...this bot reads time differently from our site, but still want to store the same.
          var formattedDate = toTimeZone(inputDate,"Antarctica/Davis");
          formattedDate = new Date(formattedDate);

          //var formattedDate = new Date(inputDate.toISOString().replace("Z", "-07:00")).toISOString().replace(".000", "");

          // can call convo.gotoThread() to change direction of conversation
          console.log('VALIDATE: View Appointments VARIABLE: newdate');
          Appointment.updateOne({ _id: idToEdit }, { $set: { date: [formattedDate]}}).exec();
          }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
    //adjust for timezone
    function toTimeZone(time, zone) {
    time = time.toISOString();
    var format = 'YYYY-MM-DD HH:mm';
    return moment(time, format).tz(zone).format(format);
  }
   //gets date and time from inputs
    function jsDate(date, time) {
    const jsDate = reFormatDate(date);
    const jsTime = reFormatTime(time);
    var jsDateObj = `${jsDate} ${jsTime}`;
    return jsDateObj;
  }

    // FUNCTION TO FORMAT DATE TO JS FOR ROBOTS
  function reFormatDate(date) {
    const d= new Date(Date.parse(date));
    let mm = d.getMonth() + 1;
    const yyyy = d.getFullYear();
    let dd = d.getDate();

    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${yyyy}-${mm}-${dd}`;
  }


    // FUNCTION TO FORMAT TIME TO JS FOR ROBOTS
  function reFormatTime(time) {
    const ampm = time.substr(-2, 2);
    let formattedTime;
    let formattedHour;
    const colon = time.indexOf(':');

    if (ampm === 'PM') {
      formattedHour = time.substr(0, 2);

      if (formattedHour == '12') { formattedHour = 12; } else { formattedHour = 12 + parseInt(time.substr(0, 2)); }

      formattedTime = `${formattedHour + time.substr(colon, 3)}:00`;
    } else {
      formattedHour = parseInt(time.substr(0, 2));
      if (formattedHour < 10) {
        formattedHour = `0${formattedHour}`;
      }
      if (formattedHour == 12) {
        formattedHour = '00';
      }
      formattedTime = `${formattedHour + time.substr(colon, 3)}:00`;
    }
    return formattedTime;
  }
}
