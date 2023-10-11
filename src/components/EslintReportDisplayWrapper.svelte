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
			eslintReports = parseEslintReport(eslintReportJSON);
		} catch (error) {
			console.error('Failed to parse ESLint report JSON:', error);
		}
	});
</script>

<h1 class="text-4xl font-bold">📋 <span class="text-purple-600">ESLint</span> Reports</h1>

{#if eslintReports.length > 0}
	<div class="flex gap-2 p-2 text-lg bg-purple-100 rounded-lg">
		<h2 class="text-xl font-semibold">Summary:</h2>
		<div class="flex gap-2">
			<p>📄 File: {eslintReports.length}</p>
			<p>❌ Error: {eslintReports.reduce((acc, report) => acc + report.errorCount, 0)}</p>
		</div>
	</div>
	<div class="flex flex-col gap-5 items-center p-5 w-full">
		{#each eslintReports as eslintReport, index}
			<EslintReportDisplay {eslintReport} />
		{/each}
	</div>
{:else}
	<p>No ESLint reports with issues to display.</p>
{/if}
