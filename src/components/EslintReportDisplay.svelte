<!-- EslintReportDisplay.svelte -->
<script>
	// @ts-ignore
	import { EslintReport } from '$lib/eslintReport';
	import { getColorCubeEmoji } from '$lib/emojiService';
	import { extractLinesInRange } from '$lib/stringParser';

	// Import the CodeSnippet component
	import CodeSnippet from './CodeSnippet.svelte';

	/** @type {EslintReport} */
	// @ts-ignore
	export let eslintReport;

	/** @type {number} */
	const contextSize = 2;

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

	function toggleCollapse() {
		collapsed = !collapsed;
	}
</script>

<div class="flex overflow-hidden flex-col gap-1 p-2 w-full bg-purple-100 rounded-lg">
	<button on:click={toggleCollapse} class="flex gap-2 p-2 text-2xl rounded-lg hover:bg-purple-300">
		<button class="flex p-1 rounded-lg hover:bg-purple-200 hover:underline" on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>
			<h3 class="whitespace-nowrap">📄:</h3>
			<p class="overflow-hidden truncate whitespace-nowrap">
				{#if eslintReport.filePath.length > 40 && !pathHovered}
					<span class="truncate-before::text-white">
						{eslintReport.filePath.slice(-40)}
					</span>
				{:else}
					{eslintReport.filePath.slice(-60)}
				{/if}
			</p>
		</button>

		<div class="flex gap-2 ml-auto first-line">
			{#if !pathHovered}
				{#if eslintReport.errorCount > 0}
					<p>🚨: {eslintReport.errorCount}</p>
				{/if}
				{#if eslintReport.fatalErrorCount > 0}
					<p>💥: {eslintReport.fatalErrorCount}</p>
				{/if}
				{#if eslintReport.warningCount > 0}
					<p>⚠️: {eslintReport.warningCount}</p>
				{/if}
				{#if eslintReport.fixableErrorCount > 0}
					<p>🔧: {eslintReport.fixableErrorCount}</p>
				{/if}
				{#if eslintReport.fixableWarningCount > 0}
					<p>⚠️: {eslintReport.fixableWarningCount}</p>
				{/if}
			{/if}
		</div>
	</button>

	{#if !collapsed}
		<div class="flex flex-col gap-5 items-start px-5">
			<div class="flex gap-2" />

			<div class="flex flex-col gap-2 px-2 w-full">
				{#each eslintReport.messages as message (message)}
					<div class="flex flex-col gap-2 p-2 w-full bg-purple-200 rounded-lg dark:text-black">
						<div class="flex gap-2">
							<p>Severity: {getColorCubeEmoji(message.severity)}</p>
							<p>L: {message.line}</p>
							<p>EL: {message.endLine}</p>
							<p>C: {message.column}</p>
							<p>EC: {message.endColumn}</p>
						</div>
						<div class="p-2 bg-purple-50 rounded-md dark:bg-purple-100 dark:text-black">{message.message}</div>

						<!-- Replace the textarea with the CodeSnippet component -->
						<CodeSnippet
							code={extractLinesInRange(
								eslintReport.source,
								message.line,
								message.endLine,
								contextSize
							)}
							colStart={message.column}
							colEnd={message.endColumn}
							lineStart={message.line}
							lineEnd={message.endLine}
							highlightClass="bg-purple-300 dark:bg-purple-900"
							{contextSize}
						/>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
