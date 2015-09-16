function LoggerFacade() {
    var self = this;
    self.LoggersList = [];
};

LoggerFacade.prototype.AddLogger = function (logger) {
    var self = this;
    if (logger != null && logger != undefined) {
        self.LoggersList.push(logger);
    }
};

LoggerFacade.prototype.Init = function () {
    var self = this;
    for (var idx = 0; idx < self.LoggersList.length; idx++) {
        self.LoggersList[idx].Init();
    }
};

LoggerFacade.prototype.WriteLine = function (message, severity, writer) {
    var self = this;
    for (var idx = 0; idx < self.LoggersList.length; idx++) {
        self.LoggersList[idx].WriteLine(message, severity, writer);
    }
};

onmessage = function (event) {
    if (event.data.action == "WriteLine") {
        event.data.instance.WriteLine(event.data.message, event.data.severity, event.data.callerName);
    }
};