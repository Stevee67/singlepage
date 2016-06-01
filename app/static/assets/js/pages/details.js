$(function () {
    CirclesMaster.initCirclesMaster1();
    var pageViewModel = new DetailsPageViewModel();
    ko.applyBindings(pageViewModel);
    pageViewModel.load();

    $('#modalRequestForm').on('shown.bs.modal', function (e) {
        $('#targetDate').datepicker({});
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
    self.productAreas = ko.observableArray(['Policies', 'Billing', 'Claims', 'Reports']);
    self.priorityRates = ko.computed(function () {
        var rates = [];
        for (var i = 1; i <= (self.requests().length + 1); i++) {
            rates.push(i);
        }
        return rates;
    }); 
    self.requestForm = ko.observable(new RequestViewModel());
    self.clientDetails = new ClientDetailsViewModel({ ClientId: 1, ClientName: 'Client', ProjectName: 'Proj', Description: 'decr', Priority: 1, RequestsCount: 25, ActiveRequestsCount: 15 });

    self.edit = function(item) {
        self.mode = FormMode.EDIT;
        self.requestForm(item);
    }
    self.add = function () {
        self.mode = FormMode.ADD;
        self.requestForm(new RequestViewModel());
    }
    self.remove = function (item) {
        self.requests.remove(item);
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
            self.requests.push(self.requestForm());
            self.requestForm(new RequestViewModel());
            //save to database
        } break;
        case FormMode.EDIT:
            {
                //save to database
            } break;
        }
    }
    self.load = function() {
        //load from db
    }
    self.resetPriority = function(priority) {
        if (self.requests().length < priority) {
            return;
        }
        for (var i = priority; i <= self.requests().length ; i++) {
            self.requests()[i-1].priority(i + 1);
        }
    }
}

function ClientDetailsViewModel(model) {
    var self = this;

    self.clientName = model.ClientName;
    self.projectName = model.ProjectName;
    self.description = model.Description;
    self.priority = model.Priority;
    self.compleatedPercent = ((model.ActiveRequestsCount / model.RequestsCount) * 100).toFixed(0);
    self.phones = model.Phones;
    self.email = model.Email;
    self.website = model.Website;
}

function RequestViewModel(data) {
    var self = this;

    self.title = ko.observable().extend({ required: true });
    self.description = ko.observable();
    self.priority = ko.observable();
    self.targetDate = ko.observable().extend({ required: true });
    self.ticketURL = ko.observable();
    self.area = ko.observable();
    //TODO: add this
    self.status = ko.observable('To Do');
}
