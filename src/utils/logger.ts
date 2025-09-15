type LogType = "DataFetching" | "Processing" | "Warning" | "Error" | "Print";

export function initLogger() {

    function log(type: LogType, message: string) {

        const timestamp = new Date().toISOString();
        let logHeader = timestamp + "[" + type + "]";

        switch (type) {
        case "DataFetching":
            console.log(logHeader + " - " + message);
            break;
        case "Processing":
            console.log(logHeader + " - " + message);
            break;
        case "Warning":
            console.warn(logHeader + " - " + message);
            break;
        case "Error":
            console.error(logHeader + " - " + message);
            break;
        case "Print":
            console.log(message);
            break;
        }
    }

    return {
        DataFetching: (message: string) => log("DataFetching", message),
        Processing: (message: string) => log("Processing", message),
        Warning: (message: string) => log("Warning", message),
        Error: (message: string) => log("Error", message),
        Print: (message: string) => log("Print", message),
    }
}