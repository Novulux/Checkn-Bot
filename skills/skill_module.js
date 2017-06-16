 /*

Botkit Studio Skill module to enhance the "Appointment" script

*/
var Appointment = require('../models/Appointment');
var Company = require('../models/Company');
var moment = require('moment-timezone');

module.exports = function(controller) {
    // define a before hook
    // you may define multiple before hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobefore
    controller.studio.before('Appointment', function(convo, next) {

        // do some preparation before the conversation starts...
        // for example, set variables to be used in the message templates
        // convo.setVar('foo','bar');
        console.log('BEFORE: Appointment');

      
        // don't forget to call next, or your conversation will never continue.
        next();

    });

    /* Validators */
    // Fire a function whenever a variable is set because of user input
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiovalidate
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Validate user input: phone
    controller.studio.validate('Appointment','phone', function(convo, next) {

        var value = convo.extractResponse('phone');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation
        console.log('VALIDATE: Appointment VARIABLE: phone');

        // always call next!
        next();

    });

    // Validate user input: provider
    controller.studio.validate('Appointment','provider', function(convo, next) {

        var value = convo.extractResponse('provider');
      
    /*  Appointment.findOne({ first_name: 'Ronald' }, function (err, appointment) {
        if (err) {
          console.err(err);
        }
        else{
          console.log("here");
          console.log(appointment);
          console.log(appointment.date);
        }
      });*/
        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: provider');
        
        // always call next!
        next();

    });
  

    // Validate user input: date
    controller.studio.validate('Appointment','date', function(convo, next) {

        var value = convo.extractResponse('date');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: date');
        var match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
        if (match == null) {
          match = value.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
          if (match == null) {
          convo.gotoThread('invalid_date');
          }
        }
        else{
          //for formatting purposes in chat, replace / with - in year
          var newString = value.replace('/', '-');
          newString = newString.replace('/', '-');
          convo.setVar('date', newString)
        
        }
        // always call next!
        next();

    });

    // Validate user input: name
    controller.studio.validate('Appointment','name', function(convo, next) {

        var value = convo.extractResponse('name');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: name');

        // always call next!
        next();

    });
     
    // Validate user input: date_time
    controller.studio.validate('Appointment','date_time', function(convo, next) {

        var value = convo.extractResponse('date_time');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: date_time');
        
        // always call next!
        next();
    }); 
    var companyID;
    // Validate user input: company_name
    controller.studio.validate('Appointment','company_name', function(convo, next) {

        var value = convo.extractResponse('company_name');
        console.log(value);
        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation
        Company.findOne({"name": value}, function(err,company){
          if(!company){
            convo.gotoThread('invalid_company');
          }
         else{
           companyID = company._id;
           console.log(company);
           console.log(companyID);
         }
        });
        // always call next!
        next();

    });

    // Validate user input: question_1
    controller.studio.validate('Appointment','question_1', function(convo, next) {

        var value = convo.extractResponse('question_1');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: question_1');

        // always call next!
        next();

    });

    // Validate user input: question_2
    controller.studio.validate('Appointment','question_2', function(convo, next) {

        var value = convo.extractResponse('question_2');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: question_2');

        // always call next!
        next();

    });

    // Validate user input: question_3
    controller.studio.validate('Appointment','question_3', function(convo, next) {

        var value = convo.extractResponse('question_3');

        // test or validate value somehow
        // can call convo.gotoThread() to change direction of conversation

        console.log('VALIDATE: Appointment VARIABLE: question_3');

        // always call next!
        next();

    });

    /* Thread Hooks */
    // Hook functions in-between threads with beforeThread
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudiobeforethread
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

    // Before the default thread starts, run this:
    controller.studio.beforeThread('Appointment','default', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *default*');

        // always call next!
        next();
    });

    // Before the on_timeout thread starts, run this:
    controller.studio.beforeThread('Appointment','on_timeout', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *on_timeout*');

        // always call next!
        next();
    });

    // Before the invalid_company thread starts, run this:
    controller.studio.beforeThread('Appointment','invalid_company', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *invalid_company*');

        // always call next!
        next();
    });

    // Before the name thread starts, run this:
    controller.studio.beforeThread('Appointment','name', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *name*');

        // always call next!
        next();
    });

    // Before the date thread starts, run this:
    controller.studio.beforeThread('Appointment','date', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *date*');

        // always call next!
        next();
    });

    // Before the invalid_date thread starts, run this:
    controller.studio.beforeThread('Appointment','invalid_date', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *invalid_date*');

        // always call next!
        next();
    });

    // Before the time thread starts, run this:
    controller.studio.beforeThread('Appointment','time', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *time*');

        // always call next!
        next();
    });

    // Before the invalid_time thread starts, run this:
    controller.studio.beforeThread('Appointment','invalid_time', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *invalid_time*');

        // always call next!
        next();
    });

    // Before the provider thread starts, run this:
    controller.studio.beforeThread('Appointment','provider', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *provider*');

        // always call next!
        next();
    });

    // Before the phone thread starts, run this:
    controller.studio.beforeThread('Appointment','phone', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *phone*');

        // always call next!
        next();
    });

    // Before the thanks thread starts, run this:
    controller.studio.beforeThread('Appointment','thanks', function(convo, next) {

        /// do something fun and useful
        // convo.setVar('name','value');

        console.log('In the script *Appointment*, about to start the thread *thanks*');

        // always call next!
        next();
    });


    // define an after hook
    // you may define multiple after hooks. they will run in the order they are defined.
    // See: https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md#controllerstudioafter
    controller.studio.after('Appointment', function(convo, next) {

        console.log('AFTER: Appointment');

        // handle the outcome of the convo
        if (convo.successful()) {
            var responses = convo.extractResponses();
            // do something with the responses
          //Make an appointment to add to database
          var name= responses.name.split(" ");

          var inputDate = (new Date(jsDate(responses.date, responses.date_time)));
          var formattedDate = inputDate;
          formattedDate = toTimeZone(inputDate,"Antarctica/Davis");
          formattedDate = new Date(formattedDate);
          //formattedDate = new Date(inputDate.toISOString().replace("Z", "-07:00")).toISOString().replace(".000", "");
          //console.log(formattedDate);
          var appointment = {provider_name: responses.provider,  company_id: companyID, date: [formattedDate],
          phone_number: responses.phone, last_name: name[1], first_name:name[0], __v: 0, id: name + Math.random(), 
                            company_name: responses.company_name}
          controller.storage.appointments.save(appointment);
        }

        // don't forget to call next, or your conversation will never properly complete.
        next();
    });
  function toTimeZone(time, zone) {
    //console.log(time);
    time = time.toISOString();
    var format = 'YYYY-MM-DD HH:mm ';
    return moment(time, format).tz(zone).format(format);
  }
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
