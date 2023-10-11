<!-- EslintReportDisplay.svelte -->
<script>
	// @ts-ignore
	import { EslintReport } from '$lib/eslintReport';
	import { getColorCubeEmoji } from '$lib/emojiService';
	import { extractLinesInRange } from '$lib/stringParser';

	/** @type {EslintReport} */
	// @ts-ignore
	export let eslintReport;

	/** @type {boolean} */
	let pathHovered = false;

	/** @type {boolean} */
	let collapsed = false;

	/** @type {string} */
	// @ts-ignore
	let textareaValue;

	function handleMouseEnter() {
		pathHovered = true;
	}

	function handleMouseLeave() {
		pathHovered = false;
	}

	function toggelCollapse() {
		collapsed = !collapsed;
	}

	/**
	 * Resize a textarea to fit its content.
	 * @param {Event} event - The input event.
	 */
	function resizeTextarea(event) {
		/**
		 * @type {HTMLTextAreaElement}
		 */
		// @ts-ignore
		const textarea = event.target;

		textarea.style.height = 'auto';
		textarea.style.height = `${textarea.scrollHeight}px`;
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
			{#if eslintReport.filePath.length > 40 && !pathHovered}
				<span class="truncate-before::text-white">
					{eslintReport.filePath.slice(-40)}
				</span>
			{:else}
				{eslintReport.filePath.slice(-60)}
			{/if}
		</p>
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
		<div class="flex flex-col gap-5 items-start p-5">
			<div class="flex gap-2" />

			<div class="flex flex-col gap-2 px-2 w-full">
				{#each eslintReport.messages as message (message)}
					<div class="flex flex-col gap-2 p-2 w-full bg-purple-200 rounded-lg">
						<div class="flex gap-2">
							<p>Severity: {getColorCubeEmoji(message.severity)}</p>
							<p>L: {message.line}</p>
							<p>C: {message.column}</p>
						</div>
						<div class="p-2 bg-purple-50 rounded-md">{message.message}</div>

						<textarea class="p-2 h-36 font-mono rounded-md" readonly on:change={resizeTextarea}
							>{extractLinesInRange(
								eslintReport.source,
								message.line,
								message.endLine,
								2
							)}</textarea
						>
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
