// (function( $ ) {
//     $.fn.mailgun_validator = function(options) {
//         return this.each(function() {
//             var thisElement = $(this);
//             thisElement.focusout(function(e) {
//                 //Trim string and autocorrect whitespace issues
//                 var elementValue = thisElement.val();
//                 elementValue = $.trim(elementValue);
//                 thisElement.val(elementValue);
//
//                 //Attach event to options
//                 options.e = e;
//
//                 run_validator(elementValue, options, thisElement);
//             });
//         });
//     };
//
//     function run_validator(address_text, options, element) {
//         //Abort existing AJAX Request to prevent flooding
//         if(element.mailgunRequest) {
//             element.mailgunRequest.abort();
//             element.mailgunRequest = null;
//         }
//
//         // don't run validator without input
//         if (!address_text) {
//             return;
//         }
//
//         // validator is in progress
//         if (options && options.in_progress) {
//             options.in_progress(options.e);
//         }
//
//         // don't run dupicate calls
//         if (element.mailgunLastSuccessReturn) {
//             if (address_text == element.mailgunLastSuccessReturn.address) {
//                 if (options && options.success) {
//                     options.success(element.mailgunLastSuccessReturn, options.e);
//                 }
//                 return;
//             }
//         }
//
//         // length and @ syntax check
//         var error_message = false;
//         if (address_text.length > 512)
//             error_message = 'Email address exceeds maxiumum allowable length of 512.';
//         else if (1 !== address_text.split('@').length-1)
//             error_message = 'Email address must contain only one @.';
//
//         if (error_message) {
//             if (options && options.error) {
//                 options.error(error_message, options.e);
//             }
//             else {
//                 if (console) console.log(error_message);
//             }
//             return;
//         }
//
//         // require api key
//         if (options && options.api_key == undefined) {
//             if (console) console.log('Please pass in api_key to mailgun_validator.');
//         }
//
//         // timeout incase of some kind of internal server error
//         var timeoutID = setTimeout(function() {
//             error_message = 'Error occurred, unable to validate address.';
//             if (!success) {
//                 //Abort existing AJAX Request for a true timeout
//                 if(element.mailgunRequest) {
//                     element.mailgunRequest.abort();
//                     element.mailgunRequest = null;
//                 }
//
//                 if (options && options.error) {
//                     options.error(error_message, options.e);
//                 }
//                 else {
//                     if (console) console.log(error_message);
//                 }
//             }
//         }, 30000); //30 seconds
//
//         // make ajax call to get validation results
//         element.mailgunRequest = $.ajax({
//             type: "GET",
//             url: 'https://api.mailgun.net/v2/address/validate?callback=?',
//             data: { address: address_text, api_key: options.api_key },
//             dataType: "jsonp",
//             crossDomain: true,
//             success: function(data, status_text) {
//                 clearTimeout(timeoutID);
//
//                 element.mailgunLastSuccessReturn = data;
//                 if (options && options.success) {
//                     options.success(data, options.e);
//                 }
//             },
//             error: function(request, status_text, error) {
//                 clearTimeout(timeoutID);
//                 error_message = 'Error occurred, unable to validate address.';
//
//                 if (options && options.error) {
//                     options.error(error_message, options.e);
//                 }
//                 else {
//                     if (console) console.log(error_message);
//                 }
//             }
//         });
//     }
// })( jQuery );
// console.log('Started', self);
// self.addEventListener('install', function(event) {
//   self.skipWaiting();
//   console.log('Installed', event);
// });
// self.addEventListener('activate', function(event) {
//   console.log('Activated', event);
// });
// self.addEventListener('push', function(event) {
//   console.log('Push message', event);
//   var title = 'Push message';
//   event.waitUntil(
//     self.registration.showNotification(title, {
//       body: 'The Message',
//       icon: 'images/icon.png',
//       tag: 'my-tag'
//     }));
// });
//
// self.addEventListener('notificationclick', function(event) {
//     console.log('Notification click: tag ', event.notification.tag);
//     event.notification.close();
//     var url = 'https://youtu.be/gYMkEMCHtJ4';
//     event.waitUntil(
//         clients.matchAll({
//             type: 'window'
//         })
//         .then(function(windowClients) {
//             for (var i = 0; i < windowClients.length; i++) {
//                 var client = windowClients[i];
//                 if (client.url === url && 'focus' in client) {
//                     return client.focus();
//                 }
//             }
//             if (clients.openWindow) {
//                 return clients.openWindow(url);
//             }
//         })
//     );
// });
//
// function subscribe() {
//   reg.pushManager.subscribe({userVisibleOnly: true}).
//   then(function(pushSubscription){
//     sub = pushSubscription;
//     console.log('Subscribed! Endpoint:', sub.endpoint);
//     subscribeButton.textContent = 'Unsubscribe';
//     isSubscribed = true;
//   });
// }
// function unsubscribe() {
//   sub.unsubscribe().then(function(event) {
//     subscribeButton.textContent = 'Subscribe';
//     console.log('Unsubscribed!', event);
//     isSubscribed = false;
//   }).catch(function(error) {
//     console.log('Error unsubscribing', error);
//     subscribeButton.textContent = 'Subscribe';
//   });
// }
