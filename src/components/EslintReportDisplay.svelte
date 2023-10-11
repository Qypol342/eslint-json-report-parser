<!-- EslintReportDisplay.svelte -->
<script>
	// @ts-ignore
	import { EslintReport } from '$lib/eslintReport';

	/** @type {EslintReport} */
	export let eslintReport;

	/** @type {boolean} */
	let pathHovered = false;

	/** @type {boolean} */
	let collapsed = false;

	function handleMouseEnter() {
		pathHovered = true;
	}

	function handleMouseLeave() {
		pathHovered = false;
	}

	function toggelCollapse() {
		collapsed = !collapsed;
	}
</script>

<div class="flex overflow-hidden flex-col gap-2 p-2 w-full bg-purple-100 rounded-lg">
	<button on:click={toggelCollapse} class="flex gap-2 p-2 text-2xl rounded-lg hover:bg-purple-300">
		<h3 class="whitespace-nowrap">📄:</h3>
		<p
			on:mouseenter={handleMouseEnter}
			on:mouseleave={handleMouseLeave}
			class="overflow-hidden truncate whitespace-nowrap"
		>
			{#if eslintReport.filePath.length > 60 && !pathHovered}
				<span class="truncate-before::text-white">
					...{eslintReport.filePath.slice(-60)}
				</span>
			{:else}
				...{eslintReport.filePath.slice(-100)}
			{/if}
		</p>
		<p class="ml-auto">⚙️</p>
	</button>

	{#if !collapsed}
		<div class="flex flex-col gap-5 items-start p-5">
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
	{/if}
</div>
