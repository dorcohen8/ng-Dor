var ConsoleLogger = function (params)
{
    // if parameters are not passed or part of them, use default values
    var self = this;
    self.logPrefix = params != null && params != undefined ? params.logPrefix || self.logPrefix : self.logPrefix;
};
ConsoleLogger.prototype = new Logger();
ConsoleLogger.prototype.constructor = ConsoleLogger;
ConsoleLogger.prototype.Init = function () { };
ConsoleLogger.prototype.WriteLine = function (message, severity, callerName) {
    var self = this;
    if (self.IsConsoleEnabled()) // check if console is enabled or opened
    {
        var messageWithPrefix = moment().format("HH:mm:ss") + " : " + self.logPrefix + ": " + callerName + ": " + message;
        switch (severity)
        {
            case window.enghouse.enums.Severity.Error:
                console.error(messageWithPrefix);
                break;
            case window.enghouse.enums.Severity.Warning:
                console.warn(messageWithPrefix);
                break;
            case window.enghouse.enums.Severity.Info:
                console.info(messageWithPrefix);
                break;
            case window.enghouse.enums.Severity.Log:
                console.log(messageWithPrefix);
                break;
            default:
                console.log(messageWithPrefix);
                break;
        }
    }
};

ConsoleLogger.prototype.IsConsoleEnabled = function()
{
    return window.console;
}