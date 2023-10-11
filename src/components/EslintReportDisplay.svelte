<!-- EslintReportDisplay.svelte -->
<script>
	// @ts-ignore
	import { EslintReport } from '$lib/eslintReport';

	/** @type {EslintReport} */
	export let eslintReport;
</script>

<div class="eslint-report">
	<h2>File Path: {eslintReport.filePath}</h2>

	<div class="flex gap-2">
		{#if eslintReport.errorCount > 0}
			<p>🚨 Error: {eslintReport.errorCount}</p>
		{/if}
		{#if eslintReport.fatalErrorCount > 0}
			<p>💥 Fatal Error: {eslintReport.fatalErrorCount}</p>
		{/if}
		{#if eslintReport.warningCount > 0}
			<p>⚠️ Warning: {eslintReport.warningCount}</p>
		{/if}
		{#if eslintReport.fixableErrorCount > 0}
			<p>🔧 Fixable Error: {eslintReport.fixableErrorCount}</p>
		{/if}
		{#if eslintReport.fixableWarningCount > 0}
			<p>⚠️ Fixable Warning: {eslintReport.fixableWarningCount}</p>
		{/if}
	</div>

	<div class="messages">
		<h3>Messages:</h3>
		<ul>
			{#each eslintReport.messages as message (message)}
				<li>
					<strong>Rule ID:</strong>
					{message.ruleId}<br />
					<strong>Severity:</strong>
					{message.severity}<br />
					<strong>Message:</strong>
					{message.message}<br />
					<strong>Line:</strong>
					{message.line}<br />
					<strong>Column:</strong>
					{message.column}<br />
					<!-- Add more properties as needed -->
				</li>
			{/each}
		</ul>
	</div>
</div>
