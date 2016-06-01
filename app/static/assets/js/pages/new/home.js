$(function () {
    var pageViewModel = new HomePageViewModel();
    ko.applyBindings(pageViewModel);
    pageViewModel.load();
});

function HomePageViewModel() {
    var self = this;

    self.clients = ko.observableArray();
    self.editAllowed = ko.observable(true);
    self.compleatedPercent = ko.computed(function () {
        var totalRequests = 0;
        var totalActive = 0;
        ko.utils.arrayForEach(self.clients(), function (client) {
            totalRequests += client.requestsCount;
            totalActive += client.activeRequestsCount;
        });
        return ((totalActive / totalRequests) * 100).toFixed(0);
    });
    self.load = function () {
        $.post('/home/', function (data) {
            console.log(data)
            self.clients(ko.utils.arrayMap(data.clients, function(item) { return new ClientViewModel(item); }));
             self.editAllowed(data.user_auth);
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