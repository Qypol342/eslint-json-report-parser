<!-- CodeSnippet.svelte -->
<script>
	import CodeLine from './CodeLine.svelte';

	/**
	 * A Svelte component for displaying a code snippet with highlighted sections.
	 * @param {string} code - The code snippet text with newlines.
	 * @param {number} lineStart - The starting line number.
	 * @param {number} lineEnd - The ending line number.
	 * @param {number} colStart - The starting column number.
	 * @param {number} colEnd - The ending column number.
	 * @param {string} highlightClass - The CSS class for highlighting.
	 */
	/** @type {string} */
	export let code;
	/** @type {number} */
	export let lineStart;
	/** @type {number} */
	export let lineEnd;
	/** @type {number} */
	export let colStart;
	/** @type {number} */
	export let colEnd;
	/** @type {string} */
	export let highlightClass;

	/** @type {number} */
	export let contextSize;

	/**
	 * Splits a string at the first colon and returns an array containing two parts.
	 *
	 * @param {string} inputString - The input string to be split.
	 * @returns {Array<string>} An array containing two parts: the text before the first colon and the text after the first colon.
	 */
	function splitStringAtFirstColon(inputString) {
		const parts = inputString.split(':');
		const firstPart = parts[0];
		const secondPart = parts.slice(1).join(':');
		return [firstPart, secondPart];
	}
</script>

<div class="p-2 font-mono bg-white dark:bg-purple-1000 dark:text-white">
	{#each code.split('\n') as line, index}
		<CodeLine
			text={splitStringAtFirstColon(line)}
			{lineStart}
			{lineEnd}
			{colStart}
			{colEnd}
			{highlightClass}
			lineNumber={index + lineStart - contextSize}
		/>
	{/each}
</div>
