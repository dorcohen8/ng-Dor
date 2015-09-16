// ToDo: move it to some configuration file
MaxLogFileCount = 10;

var FileLogger = function (params)
{
    // if parameters are not passed or part of them, use default values
    var self = this;
    self.logPrefix = params != null && params != undefined ? params.logPrefix || self.logPrefix : self.logPrefix;
    self.MaxLogFileCount = params != null && params != undefined ? params.MaxLogFileCount || MaxLogFileCount : MaxLogFileCount;
};

FileLogger.prototype = new Logger();
FileLogger.prototype.constructor = FileLogger;
FileLogger.prototype.Init = function ()
{
    try
    {
        var self = this;
        self.EnableLoggingToFile = true;
        self.LogFileNamePrefix = self.logPrefix;
        self.MaxLogFileCount = self.MaxLogFileCount;

        $.ajax({
            url: wcfBase + "/ClientReportingService/ajaxEndPoint/InitLogFile/?FilePath=" + TouchPointLogFilePath + "&BackupToRetain=" + self.MaxLogFileCount,
            type: "GET",
            dataType: "jsonp",
            success: function (data) {
            },
            error: function (httpReq, status, exception) {
            }
        });
    }
    catch (e) { }
}

FileLogger.prototype.WriteLine = function (message, severity, callerName)
{
    var self = this;

    switch (severity)
    {
        case window.enghouse.enums.Severity.Error:
            message = callerName + ": " + window.enghouse.enums.Severity.Error + ": " + message;
            break;
        case window.enghouse.enums.Severity.Warning:
            message = callerName + ": " + window.enghouse.enums.Severity.Warning + ": " + message;
            break;
        case window.enghouse.enums.Severity.Info:
            message = callerName + ": " + window.enghouse.enums.Severity.Info + ": " + message;
            break;
        case window.enghouse.enums.Severity.Log:
            message = callerName + ": " + window.enghouse.enums.Severity.Log + ": " + message;
            break;
        default:
            message = callerName + ": " + window.enghouse.enums.Severity.Log + ": " + message;
            break;
    }
    
    $.ajax({
        url: wcfBase + "/ClientReportingService/ajaxEndPoint/WriteLine/?message=" + message,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
        },
        error: function (httpReq, status, exception) {
        }
    });
};