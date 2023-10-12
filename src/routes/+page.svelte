<script>
	import FileInput from '../components/FileInput.svelte';
	import EslintReportDisplayWrapper from '../components/EslintReportDisplayWrapper.svelte';

	let parentJsonContent = '';
	let isFileInputVisible = true;

	/**
	 * Handle the custom 'json' event from the FileInput component.
	 * @param {CustomEvent<string>} event - The custom event containing the JSON data.
	 */
	const handleJsonFromChild = (event) => {
		parentJsonContent = event.detail;

		isFileInputVisible = false;
	};
</script>

{#if isFileInputVisible}
	<div class="flex flex-col gap-10 items-center p-5 w-screen h-screen bg-purple-200 dark:bg-purple-950 dark:text-white">
		<div class="flex gap-1 items-end">
			<h1 class="text-4xl">
				👋 Welcome to the
				<span class="font-bold text-purple-600">ESLint</span>
				report parser
			</h1>
		</div>

		<FileInput on:json={handleJsonFromChild} />
	</div>
{/if}

{#if parentJsonContent}
	<div class="flex overflow-x-hidden flex-col gap-10 items-center p-5 w-screen max-w-full h-full min-h-screen bg-purple-200 dark:bg-purple-1000">
		<EslintReportDisplayWrapper eslintReportJSON={parentJsonContent} />
	</div>
{/if}
