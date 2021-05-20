import { transports, format, createLogger } from "winston";

export class Log {
    public logger = createLogger({
        transports: [
            new transports.File({
                filename: 'info.log',
                level: 'info',
                format: format.combine(format.timestamp(), format.json())
            })
        ]
    })
}