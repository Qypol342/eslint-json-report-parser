import  { EslintReport } from "./eslintReport";

/**
 * Parse ESLint report JSON and return an array of report objects with issues.
 *
 * @param {string} eslintReportJSON - The JSON string of the ESLint report.
 * @returns {Array<EslintReport>} - An array of report objects with issues.
 */
export function parseEslintReport(eslintReportJSON) {
	try {
		/** @type {Array<EslintReport>} */
		const reports = JSON.parse(eslintReportJSON).map(
			(
				/** @type {{ filePath: string; messages: any[]; suppressedMessages: any[]; errorCount: number; fatalErrorCount: number; warningCount: number; fixableErrorCount: number; fixableWarningCount: number; usedDeprecatedRules: any[]; }} */ rawReport
			) => {
				return new EslintReport(
					rawReport.filePath,
					rawReport.messages,
					rawReport.suppressedMessages,
					rawReport.errorCount,
					rawReport.fatalErrorCount,
					rawReport.warningCount,
					rawReport.fixableErrorCount,
					rawReport.fixableWarningCount,
					rawReport.usedDeprecatedRules
				);
			}
		);

		// Filter out reports that have no issues
		const reportsWithIssues = reports.filter((report) => {
			const { errorCount, fatalErrorCount, warningCount, fixableErrorCount, fixableWarningCount } =
				report;
			return (
				errorCount > 0 ||
				fatalErrorCount > 0 ||
				warningCount > 0 ||
				fixableErrorCount > 0 ||
				fixableWarningCount > 0
			);
		});

		return reportsWithIssues;
	} catch (error) {
		throw error;
	}
}
