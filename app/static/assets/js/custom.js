/*This is my custom js funcs*/

function flash(message) {
    $(".flash").remove();
    $('body').prepend(
        '<div class="flash">' +
            message +
        '</div>'
    );
    $(".flash").delay(4000).fadeOut();
}

// request_data = {
//     title: 'Add ability to create new clients',
//     description: '',
//     client_id : data.client.id,
//     target_date: data.target_date,
//     ticket_url: data.ticket_url,
//     status: data.status,
//     priority: data.priority,
//     product_area_id: data.product_area.id
// // }
// add_product_area = function () {
//         $.ajax({
//             type: "post",
//             url: "/add_product_area/",
//             data: {'title':'Reports'},
//             success: function (data) {
//
//             }
//        });
// };
// add_client = function () {
//         data = {
//             project_name:'	First Client Company',
//             client_name:'Steve',
//             description:'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
//             website:'www.test1.com',
//             phone:'800 248-884-555',
//             email:'test@test.com',
//             priority:1,
//             user_id:'',
//         }
//         $.ajax({
//             type: "post",
//             url: "/add_client",
//             contentType:"applicaton/json",
//             dataType:"json",
//             data: JSON.stringify({'title':'Policies'}),
//             success: function (data) {
//                 alert(data)
//             }
//        });
// };

login = function () {
    var data = {};
	var required_fields = ['email', 'password'];
	for(var i=0; i<required_fields.length; i++){
		var field_obj = document.getElementById(required_fields[i]);
		var field_obj_val = field_obj.value;
		if(field_obj_val){
			data[required_fields[i]] = field_obj_val;
		}
		else{
			flash("Please fill field "+"<span style='color:red'>"+required_fields[i]+ "</span>"+"!");
			return
		}
	}
	$.ajax({
		url: 'login/',
		type: 'post',
		data: data,
		success: function (data) {
            window.location = 'home/';
			flash("Thank you for you message. I'll answer you in a few hours.")
		}
	})
};

function save_request(client_id){
	var data = {};
	var required_fields = ['title', 'targetDate', 'productArea', 'priority', 'ticketURL', 'description'];
	for(var i=0; i<required_fields.length; i++){
		var field_obj = document.getElementById(required_fields[i]);
        if(field_obj){
            var field_obj_val = field_obj.value;
        }

		if(field_obj_val){
			data[required_fields[i]] = field_obj_val;
		}
	}
    data['client_id'] = client_id;
	$.ajax({
		url: '/save_request/',
		type: 'post',
		data: data,
		success: function (data) {
			feature_request = data
		}
	})
}
function remove_request(req_id){
    $.ajax({
		url: '/delete_request/',
		type: 'post',
		data: {'id':req_id},
		success: function (data) {
		}
	})
}

function get_clients() {
    $.ajax({
		url: '/home/',
		type: 'post',
		success: function (data) {
			console.log(data)
		}
	})
}

function get_request(client_id) {
	url = "/home/details/"+ toString(client_id)
    $.ajax({
		url: url,
		type: 'post',
		success: function (data) {
			console.log(data)
		}
	})
}

function edit_request(req_id){
    var data = {};
	var required_fields = ['title', 'targetDate', 'productArea', 'priority', 'ticketURL', 'description'];
	for(var i=0; i<required_fields.length; i++){
		var field_obj = document.getElementById(required_fields[i]);
        if(field_obj){
            var field_obj_val = field_obj.value;
        }

		if(field_obj_val){
			data[required_fields[i]] = field_obj_val;
		}
	}
    data['id'] = req_id;
	$.ajax({
		url: '/set_request/',
		type: 'post',
		data: data,
		success: function (data) {
			feature_request = data
		}
	})
}


function flash(message) {
    $(".flash").remove();
    $('body').prepend(
        '<div class="flash">' +
            message +
        '</div>'
    );
    $(".flash").delay(4000).fadeOut();
}


/* Write here your custom javascript codes */