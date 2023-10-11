// @ts-ignore
import { EslintReport } from "./eslintReport";

/**
 * A class for storing ESLint reports.
 */
export class EslintReportStorage {
  constructor() {
    /**
     * @type {Array<EslintReport>}
     */
    this.reports = [];
  }

  /**
   * Save ESLint report data.
   * @param {EslintReport} report - The ESLint report object.
   */
  saveReport(report) {
    this.reports.push(report);
  }

  /**
   * Get all saved ESLint reports.
   * @returns {Array<EslintReport>} - An array of ESLint report objects.
   */
  getReports() {
    return this.reports;
  }
}

