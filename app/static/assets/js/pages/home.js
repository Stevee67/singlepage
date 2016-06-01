$(function () {
    var pageViewModel = new HomePageViewModel();
    ko.applyBindings(pageViewModel);
    pageViewModel.load();
});

function HomePageViewModel() {
    var self = this;

    self.clients = ko.observableArray();
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
        self.clients.push(new ClientViewModel({ ClientId: 1, ClientName: 'Client', ProjectName: 'Proj', Description: 'decr', Priority: 1, RequestsCount: 25, ActiveRequestsCount: 15 }));
        self.clients.push(new ClientViewModel({ ClientId: 1, ClientName: 'Client', ProjectName: 'Proj', Description: 'decr', Priority: 1, RequestsCount: 40, ActiveRequestsCount: 28 }));
    }
}

function ClientViewModel(model) {
    var self = this;

    self.clientId = model.ClientId;
    self.clientName = model.ClientName;
    self.projectName = model.ProjectName;
    self.description = model.Description;
    self.priority = model.Priority;
    self.requestsCount = model.RequestsCount;
    self.activeRequestsCount = model.ActiveRequestsCount;
    self.compleatedPercent = ((model.ActiveRequestsCount / model.RequestsCount) * 100).toFixed(0);
}