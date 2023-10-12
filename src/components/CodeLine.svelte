<!-- Updated CodeLine.svelte -->
<script>
	/**
	 * A Svelte component for displaying a single line of code with highlighting.
	 * @param {string} text - The text of the line.
	 * @param {number} colStart - The starting column number.
	 * @param {number} colEnd - The ending column number.
	 * @param {string} highlightClass - The CSS class for highlighting.
	 * @param {number} lineNumber - The line number.
	 */

	/** @type {string[]} */
	export let text;

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
	export let lineNumber;

    function getStartCol(){
        return lineNumber ===lineStart? colStart:0
    }

    function getEndCol(){
        return lineNumber ===lineEnd? colEnd:text[1].length
    }
</script>

<div class="whitespace-pre">

	{#if lineNumber >= lineStart && lineNumber <= lineEnd}
		<p >
			<span>{text[0]}</span>
			<span 
				>{#if colStart > 0}{text[1].slice(0, getStartCol())}{/if}</span
			>
			<span class={highlightClass}>{text[1].slice(getStartCol(), getEndCol())}</span>
			<span 
				>{#if colEnd < text[1].length}{text[1].slice(getEndCol(), text[1].length +1)}{/if}</span
			>
		</p>
	{:else}
		<p><span>{text[0]}</span>{text[1]}</p>
	{/if}

</div>
