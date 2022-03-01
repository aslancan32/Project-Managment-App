import winston, { transports } from "winston";

const logger = winston.createLogger({
    level:'info',
    farmat: winston.format.json(),
    defaultMeta: {service : 'project-service'},
    transports: [
        new winston.transports.File({filename: 'v1/src/logs/projects/error.log', level: 'error'}),
        new winston.transports.File({filename: 'v1/src/logs/projects/info.log', level: 'info'}),
        new winston.transports.File({filename: 'v1/src/logs/projects/combined.log'}),
        // new winston.transports.Console({filename: 'logname.log', level: "levelname"})
    ]
})

export default logger