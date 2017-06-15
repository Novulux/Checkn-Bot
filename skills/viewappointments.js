/*

Botkit Studio Skill module to enhance the "View Appointments" script

*/

var Appointment = require('../models/Appointment');

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
var allAppointments;
    // Validate user input: identity
    controller.studio.validate('View Appointments','identity', function(convo, next) {

        var value = convo.extractResponse('identity');

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
            
              appointmentData.prototype.toString = function dataToString() {
              var time = this.date.split(',');
              var date = (new Date(this.date)).toDateString();
              var ret = ". #" +this.number + ": " + this.company + ' at ' + date + "," +time[1];
              return ret;
            }
            for(var i = 0; i < appointments.length; i++){
              console.log(appointments[i].company_name);
              //var displayDate = new Date(appointments[i].date.toLocaleString('en-US', { hour12: true, timeZone: 'America/Los_Angeles', timeZoneName:'short' }));
              var displayDate = appointments[i].date.toLocaleString('en-US', { hour12: true, timeZone: 'America/Los_Angeles', timeZoneName:'short' });
              console.log(displayDate);
             // var displayTime = displayDate.getTime();
              //displayDate = displayDate.toDateString();
              
              console.log(displayDate);
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
    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudioafter
    controller.studio.after('View Appointments', function(convo, next) {

        console.log('AFTER: View Appointments');

        // handle the outcome of the convo
        if (convo.successful()) {

            var responses = convo.extractResponses();
            // do something with the responses

        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
}
