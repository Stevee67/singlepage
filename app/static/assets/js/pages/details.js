$(function () {
    var pageViewModel = new DetailsPageViewModel();
    ko.applyBindings(pageViewModel);
    pageViewModel.load();

    $('#modalRequestForm').on('shown.bs.modal', function (e) {
        $('#targetDate').datepicker({autoclose: true});
    });
});

FormMode = {
    ADD: 1,
    EDIT: 2
}

function DetailsPageViewModel() {
    var self = this;

    self.mode = null;
    self.requests = ko.observableArray();
    self.requests.subscribe(function (x) {
        x.sort(function (l, r) { return l.priority() > r.priority(); });
    });
    self.productAreas = ko.observableArray();
    self.priorityRates = ko.observableArray();
    self.requestForm = ko.observable(new RequestViewModel());
    self.clientDetails = ko.observable(new ClientDetailsViewModel());
    self.clientId =window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
    self.editAllowed = ko.observable(true);
    self.edit = function(item) {
         console.log(item);
        self.mode = FormMode.EDIT;
        self.requestForm(item);
    }
    self.add = function () {
        self.mode = FormMode.ADD;
        self.requestForm(new RequestViewModel());
    }
    self.del = function (item) {
        $.post('/delete_request/', { id: item.requestId }, function () {
            self.requests.remove(item);
        });
    }
    self.save = function () {
        var validation = ko.validatedObservable(self.requestForm());
        if (!validation.isValid()) {
            validation.errors.showAllMessages();
            return;
        }
        $('#modalRequestForm').modal('hide');
        self.resetPriority(self.requestForm().priority());
        switch (self.mode) {
        case FormMode.ADD:
        {
            var data = {'title': self.requestForm().title(),
                    'description': self.requestForm().description(),
                    'client_id': self.clientId,
                    'targetDate': self.requestForm().targetDate(),
                    'ticketURL': self.requestForm().ticketURL(),
                    'status': 'TODO' ,
                    'priority': self.requestForm().priority(),
                    'productArea': self.requestForm().area().id};

            $.post('/save_request/', data, function (data) {
                self.load();
            });
        } break;
        case FormMode.EDIT:
            {
                 var data = {
                     'requestId': self.requestForm().requestId,
                     'title': self.requestForm().title(),
                    'description': self.requestForm().description(),
                    'client_id': self.clientId,
                    'targetDate': self.requestForm().targetDate(),
                    'ticketURL': self.requestForm().ticketURL(),
                    'status': 'TODO' ,
                    'priority': self.requestForm().priority(),
                    'productArea': self.requestForm().area().id};
                $.post('/set_request/', data, function(data) {
                    self.load();
                });
            } break;
        }
    }
    self.load = function() {
        self.productAreas([]);
        self.requests([]);
        $.get('/home/details_get/' + self.clientId , function(data) {
            self.productAreas(data.product_areas);
            ko.utils.arrayForEach(data.feature_requests, function(item){
                self.requests.push(new RequestViewModel(item));
            });
            self.editAllowed(data.user_auth);
            self.clientDetails(new ClientDetailsViewModel(data.clients));
            self.priorityRates(data.prioritets);
            CirclesMaster.initCirclesMaster(data.completed);
        });
    }

    self.resetPriority = function(priority) {
        if (self.requests().length < priority) {
            return;
        }
        for (var i = priority; i <= self.requests().length ; i++) {
            self.requests()[i-1].priority(i);
        }
    }
}

function ClientDetailsViewModel(data) {
    var self = this;

    self.clientName = '';
    self.projectName = '';
    self.description = '';
    self.priority = '';
    self.compleatedPercent = '';
    self.phones = '';
    self.email = '';
    self.website = '';

    if (data) {
        self.clientName = data.client_name;
        self.projectName = data.project_name;
        self.description = data.description;
        self.priority = data.priority;

        self.compleatedPercent = data.completed_persent;//((data.count_active_request / data.count_request) * 100).toFixed(0);
        self.phones = data.phone;
        self.email = data.email;
        self.website = data.website;
    }
}

function RequestViewModel(data) {
    var self = this;

    self.requestId = 0;
    self.title = ko.observable().extend({ required: true });
    self.description = ko.observable();
    self.priority = ko.observable();
    self.targetDate = ko.observable().extend({ required: true });
    self.ticketURL = ko.observable();
    self.area = ko.observable();
    self.areaTitle = ko.observable();
    //TODO: add this
    self.status = ko.observable();

    if(data){
        self.requestId = data.id;
        self.title(data.title);
        self.description(data.description);
        self.priority(data.priority);
        self.targetDate(data.target_date);
        self.ticketURL(data.ticket_url);
        self.areaTitle(data.area);
        self.status(data.status);
    }
}
