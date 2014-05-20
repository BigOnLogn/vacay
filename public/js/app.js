var target_date = new Date('5/26/2014 10:00:00').getTime();
var days_multiplyer = 1000 * 60 * 60 * 24;
var hours_multiplyer = 1000 * 60 * 60;
var mins_multiplyer = 1000 * 60;
var secs_multiplyer = 1000;

Handlebars.registerHelper('decimal', function(number) {
  return number.toFixed(3);
})

function get_diff(multiplier) {
  var now = Date.now();

  return (target_date - now) / multiplier;
}

function days() {
  return { left: get_diff(days_multiplyer), units: 'days' };
}

function hours() {
  return { left: get_diff(hours_multiplyer), units: 'hours' };
}

function mins() {
  return { left: get_diff(mins_multiplyer), units: 'mins' };
}

function seconds() {
  return { left: get_diff(secs_multiplyer), units: 'seconds' };
}

var diff_func = days;

var routes = {
  '/days': function() {
    $('#nav').children().removeClass('active');
    $('#days').addClass('active');
    diff_func = days
  },

  '/hours': function() {
    $('#nav').children().removeClass('active');
    $('#hours').addClass('active');
    diff_func = hours;
  },

  '/mins': function() {
    $('#nav').children().removeClass('active');
    $('#mins').addClass('active');
    diff_func = mins;
  },

  '/seconds': function() {
    $('#nav').children().removeClass('active');
    $('#seconds').addClass('active');
    diff_func = seconds;
  }
};

var router = Router(routes);

router.init();

$(function() {
  var $output = $('#output');
  var template = Handlebars.compile($('#countdown').html());

  setInterval(function() {
    $output.html(template(diff_func()));
  }, 10);
});