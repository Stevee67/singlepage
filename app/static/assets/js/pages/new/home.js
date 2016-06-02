$(function () {
    var pageViewModel = new HomePageViewModel();
    ko.applyBindings(pageViewModel);
    pageViewModel.load();
});

function HomePageViewModel() {
    var self = this;

    self.clients = ko.observableArray();
    self.editAllowed = ko.observable(true);
    self.compleatedPercent = ko.observable();
    self.load = function () {
        $.post('/home/', function (data) {
            console.log(data)
            self.clients(ko.utils.arrayMap(data.clients, function(item) { return new ClientViewModel(item); }));
             self.editAllowed(data.user_auth);
             self.compleatedPercent(data.full_completed);
        })
    }
}

function ClientViewModel(model) {
    console.log(model)
    var self = this;

    self.clientId = model.id;
    self.clientName = model.client_name;
    self.projectName = model.project_name;
    self.description = model.description;
    self.priority = model.priority;
    self.requestsCount =
    self.activeRequestsCount = model.count_active_request;
    self.compleatedActive = model.count_active_request + '/' + model.count_request;
    self.compleatedPercent = model.completed_persent//((model.count_active_request / model.count_request) * 100).toFixed(0);
}