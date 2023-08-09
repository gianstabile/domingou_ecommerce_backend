import winston from "winston";
import config from "../config/config.js";
import __dirname from "./utils.js";

const { loggerEnv } = config;

const customLvlOpt = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "cyan",
    http: "green",
    debug: "white",
  },
};

const devLogger = winston.createLogger({
  levels: customLvlOpt.levels,
  format: winston.format.combine(winston.format.colorize({ colors: customLvlOpt.colors }), winston.format.simple(), winston.format.timestamp()),
  transports: [
    new winston.transports.Console({
      level: "debug",
    }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLvlOpt.levels,
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/logs/errors.log`,
      level: "info",
      timestamp: true,
    }),
  ],
});

function getLogger() {
  if (loggerEnv.environment === "production") {
    return prodLogger;
  }
  return devLogger;
}

export const logger = getLogger();

// export const addLogger = (req, res, next) => {
//   req.logger = logger;
//   req.logger.info(`${req.method} in ${req.url} - ${new Date().toLocaleDateString()}`);
//   next();
// };
