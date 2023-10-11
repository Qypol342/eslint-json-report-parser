<script>
	import { onMount } from 'svelte';
	import EslintReportDisplay from './EslintReportDisplay.svelte';
	import { parseEslintReport } from '$lib/eslintReportParser'; // Assuming you have the library in the same directory
	import { EslintReport } from '$lib/eslintReport';

	/** @type {string} */
	export let eslintReportJSON = ''; // The raw JSON content

	/** @type {EslintReport[]} */
	let eslintReports = []; // Parsed ESLint reports

	// Parse the ESLint reports when the component is mounted
	onMount(async () => {
		try {
			const parsedReport = parseEslintReport(eslintReportJSON);
			eslintReports = parsedReport.map(
				(report) =>
					new EslintReport(
						report.filePath,
						report.messages,
						report.suppressedMessages,
						report.errorCount,
						report.fatalErrorCount,
						report.warningCount,
						report.fixableErrorCount,
						report.fixableWarningCount,
						report.usedDeprecatedRules
					)
			);
		} catch (error) {
			console.error('Failed to parse ESLint report JSON:', error);
		}
	});
</script>

<h2>ESLint Reports</h2>

{#if eslintReports.length > 0}
	{#each eslintReports as eslintReport, index}
		<EslintReportDisplay {eslintReport} />
	{/each}
{:else}
	<p>No ESLint reports with issues to display.</p>
{/if}
