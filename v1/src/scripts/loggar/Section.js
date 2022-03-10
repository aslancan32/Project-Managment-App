
import winston, { transports } from "winston";

const logger = winston.createLogger({
    level:'info',
    farmat: winston.format.json(),
    defaultMeta: {service : 'section-service'},
    transports: [
        new winston.transports.File({filename: 'v1/src/logs/Section/error.log', level: 'error'}),
        new winston.transports.File({filename: 'v1/src/logs/Section/info.log', level: 'info'}),
        new winston.transports.File({filename: 'v1/src/logs/Section/combined.log'}),
        // new winston.transports.Console({filename: 'logname.log', level: "levelname"})
    ]
})

export default logger