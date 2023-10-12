<script>
	import { createEventDispatcher } from 'svelte';

	/**
	 * @typedef {Object} FileInputProps
	 * @property {string} jsonContent - The JSON content to display and send to the parent.
	 */

	/** @type {FileInputProps} */
	let props = {
		jsonContent: '' // Initialize jsonContent with an empty string
	};

	const dispatch = createEventDispatcher();

	/**
	 * Handle file change and update JSON content.
	 * @param {Event} event - The change event from the file input.
	 */
	const handleFileChange = async (event) => {
		if (event && event.target && event.target instanceof HTMLInputElement) {
			const fileInput = event.target;
			if (fileInput.files && fileInput.files.length > 0) {
				const file = fileInput.files[0];
				try {
					const text = await file.text();
					const parsedJson = JSON.parse(text);
					props.jsonContent = JSON.stringify(parsedJson, null, 2);
				} catch (error) {
					console.error('Error parsing JSON:', error);
					props.jsonContent = 'Invalid JSON file';
				}
			}
		}
	};

	/**
	 * Send the JSON content to the parent.
	 */
	const sendJsonToParent = () => {
		const jsonContent = props.jsonContent;
		// You can dispatch an event to send the JSON content to the parent component
		dispatch('json', jsonContent);
	};
</script>

<div class="flex flex-col gap-5 items-center p-5 bg-purple-100 rounded-xl dark:bg-purple-1000">
	<h2 class="text-2xl font-semibold">📁 Load report:</h2>

	<div class="flex gap-4">
		<label class="mr-auto text-xl" for="loadFile">📄 By JSON file:</label>
		<input id="loadFile" type="file" accept=".json" on:change={handleFileChange} />
	</div>
	<p class="text-xl font-bold text-purple-600">or</p>

	<div class="flex gap-4 w-full">
		<label class="mr-auto text-xl whitespace-nowrap" for="clipboard">📋 By clipboard:</label>
		<textarea id="clipboard" class="p-1 w-full h-44 font-mono rounded-md dark:text-black dark:bg-purple-200" bind:value={props.jsonContent} />
	</div>

	<div class="flex flex-col items-center">
		<button
			class="p-2 px-4 text-white bg-purple-600 rounded-lg disabled:bg-purple-400 w-fit"
			on:click={sendJsonToParent}
			disabled={!props.jsonContent && !props.jsonContent.trim()}>🚀 Parse !</button
		>

		{#if !props.jsonContent && !props.jsonContent.trim()}
			<p class="text-purple-400">The button is disabled because there is no JSON content.</p>
		{/if}
	</div>
</div>
