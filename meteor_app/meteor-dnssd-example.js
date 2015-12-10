if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
  Meteor.startup(function(){
    /*

     Small example for Cordova DNS-SD plugin
     Author <jarnoh@komplex.org>

     */
    console.log('Meteor startup!');
// helper to convert service instances to html ids
    function service2id(n)
    {
      return "dummy_"+n.replace(" ","_");
    }

    function serviceResolved(hostName, port, serviceName, regType, domain)
    {
      alert(serviceName+" is at "+hostName+":"+port);
      // window.plugins.dnssd.browse(); // cancel browse operation if you dont need it anymore
    }

    function serviceLost(serviceName, regType, domain, moreComing)
    {
      console.log("js serviceLost "+serviceName+" "+regType+" "+moreComing);
      $(document.getElementById(service2id(serviceName))).remove();
    }

    function serviceFound(serviceName, regType, domain, moreComing)
    {
      console.log("js serviceFound "+serviceName+" "+regType+" "+moreComing);

      var t = $("<li>")
          .attr("id", service2id(serviceName))
          .text(serviceName)
          .css("cursor","pointer")
          .click(function() {
            window.plugins.dnssd.resolve(serviceName, regType, domain, serviceResolved);
          });
      $("#example").append(t);
    }

    // start browse operation for daap services.  when done, call browse() without parameters to complete it.
    console.log('browse _zhifa._tcp');
    ZeroConf.watch('_zhifa._tcp.local.', function(result) {
      var action = result.action;
      var service = result.service;
      if (action == 'added') {
        console.log('service added', service);
      } else {
        console.log('service removed', service);
      }
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
