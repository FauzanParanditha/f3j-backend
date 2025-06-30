import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `[${level.toUpperCase()}] ${timestamp} - ${message}`;
    })
  ),
  transports: [
    new transports.Console(),
    // Tambahkan ke file log jika dibutuhkan:
    // new transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new transports.File({ filename: 'logs/combined.log' }),
  ],
});

export default logger;
