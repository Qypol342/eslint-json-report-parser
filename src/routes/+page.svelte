<script>
  import FileInput from "../components/FileInput.svelte";
  import EslintReportDisplayWrapper from "../components/EslintReportDisplayWrapper.svelte";


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
  <FileInput on:json={handleJsonFromChild} />
{/if}

{#if parentJsonContent}
  <h3 class="">JSON Content:</h3>
  <textarea readonly bind:value={parentJsonContent}></textarea>

  <EslintReportDisplayWrapper eslintReportJSON={parentJsonContent}/>
{/if}