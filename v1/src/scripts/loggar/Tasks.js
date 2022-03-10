
import winston from "winston";

const logger = winston.createLogger({
    level:'info',
    farmat: winston.format.json(),
    defaultMeta: {service : 'section-service'},
    transports: [
        new winston.transports.File({filename: 'v1/src/logs/Tasks/error.log', level: 'error'}),
        new winston.transports.File({filename: 'v1/src/logs/Tasks/info.log', level: 'info'}),
        new winston.transports.File({filename: 'v1/src/logs/Tasks/combined.log'}),
        // new winston.transports.Console({filename: 'logname.log', level: "levelname"})
    ]
})

export default logger