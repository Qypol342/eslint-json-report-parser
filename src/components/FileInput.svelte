<script>
	import { createEventDispatcher } from "svelte";

	/**
	 * @typedef {Object} FileInputProps
	 * @property {string} jsonContent - The JSON content to display and send to the parent.
	 */

	/** @type {FileInputProps} */
	let props = {
    jsonContent: '', // Initialize jsonContent with an empty string
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
}


	/**
	 * Send the JSON content to the parent.
	 */
	const sendJsonToParent = () => {
		const jsonContent = props.jsonContent;
		// You can dispatch an event to send the JSON content to the parent component
		dispatch('json', jsonContent);
	};
</script>

<input type="file" accept=".json" on:change={handleFileChange} />
<textarea bind:value={props.jsonContent} />

<button on:click={sendJsonToParent} disabled={ !props.jsonContent && !props.jsonContent.trim()}>Send JSON to Parent</button>

{#if !props.jsonContent && !props.jsonContent.trim()}
    <p>The button is disabled because there is no JSON content.</p>
{/if}