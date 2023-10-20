<script>
  export let referenceName;
  export let referenceColor;
  export let referenceHeight;
  export let referenceWidth;
  export let referenceRightAlign;
  export let canEdit;

  let infoPopup = false;
  let currentPopupText = "";
  let currentPopupHeader ="";
  $: showInfoPopup = infoPopup;
  $: refRightAlignDrug =
    referenceRightAlign === "0"
      ? "0.5in"
      : (parseFloat(referenceRightAlign.replace("in", "")) + 0.3).toString() +
        "in";

  let sectionWidth = "100%";
  if (
    referenceName.layout == "horizontal-sections" ||
    referenceName.layout == "horizontal-sections-noseparator"
  ) {
    sectionWidth = Math.floor(100 / referenceName.sections.length) + "%";
  }

  function handleSelectInput(event, i_section, i_drug, i_option, i_val) {
    console.log(event.target.value);
    referenceName.sections[i_section].drugs[i_drug].options[i_option].value[
      i_val
    ].defaultValue = event.target.value;
  }

  function addContentItem(i_section) {
    referenceName.sections[i_section].contentItems.push({
      main: "",
      subContents: [],
      editable: true,
      deletable: true,
    });
    referenceName.sections[i_section].contentItems =
      referenceName.sections[i_section].contentItems;
  }

  function deleteContentItem(i_section, i_subsection) {
    referenceName.sections[i_section].contentItems.splice(i_subsection, 1);
    referenceName = referenceName;
  }

  function deleteSelectableControl(i_section, i_drug, i_option, i_val) {
    referenceName.sections[i_section].drugs[i_drug].options[
      i_option
    ].value.splice(i_val, 1);
    referenceName = referenceName;
  }

  function toggleInfoPopup(popUpText,popUpHeader) {
    infoPopup = !infoPopup;
    currentPopupText = popUpText;
    currentPopupHeader = popUpHeader;
  }
</script>

<div
  class="reference-content"
  style="top:{referenceHeight}; width:{referenceWidth}; right:{referenceRightAlign};--referenceRightAlign:{refRightAlignDrug}"
  id={referenceName.id}
>
  <div class="reference-header" style="background-color:{referenceColor}">
    {@html referenceName.header}
  </div>
  <div class="reference-body {referenceName.layout}">
    {#each referenceName.sections as { header, contentType, beforeContent, contentItems, drugs, tableWidth, numbered, editable, info }, i_section}
      <div class="reference-section" style="width:{sectionWidth}">
        {#if header}
          <div class="reference-section-header" style="color:{referenceColor}">
            {header}
          </div>
        {/if}
        {#if contentType === "text"}
          <div class="reference-section-body reference-section-text">
            {#each contentItems as contentItem, i_subsection}
              <div style="margin-bottom:0.1em">
                <!-- delete -->
                {#if contentItem.deletable && canEdit}
                  <button
                    class="delete"
                    on:click={() => deleteContentItem(i_section, i_subsection)}
                    ><i
                      class="fa-solid fa-trash-can"
                      style="color: #808080;"
                    /></button
                  >
                {/if}
                <!-- main -->
                {#if typeof contentItem === "string" || contentItem instanceof String}
                  {@html contentItem}
                {:else if contentItem.editable && canEdit}
                  <input class="edit-box" bind:value={contentItem.main} />
                {:else}
                  {@html contentItem.main}
                {/if}
                <!-- info icon -->
                {#if contentItem.info && canEdit}
                  <button
                    class="info"
                    on:click={() => toggleInfoPopup(contentItem.info,contentItem.main)}
                  >
                    <i
                      class="fa-solid fa-circle-info"
                      style="color: #808080;"
                    />
                  </button>
                  {#if showInfoPopup && contentItem.info === currentPopupText && contentItem.main === currentPopupHeader}
                    <div class="infotext-container">
                      <div class="infotext-content">
                        <div style="font-weight: bold">
                          {@html contentItem.main}
                        </div>
                        <div>
                          {contentItem.info}
                        </div>
                        <button
                          class="info-done"
                          on:click={() => toggleInfoPopup("","")}>done</button
                        >
                      </div>
                    </div>
                  {/if}
                {/if}
              </div>
            {/each}
            <!-- add new content -->
            {#if editable && canEdit}
              <button on:click={() => addContentItem(i_section)}
                >add new line</button
              >
              <!-- info icon -->
              {#if info && canEdit}
                <button class="info" on:click={() => toggleInfoPopup(info,referenceName.header)}>
                  <i class="fa-solid fa-circle-info" style="color: #808080;" />
                </button>
                {#if showInfoPopup && info === currentPopupText && referenceName.header === currentPopupHeader}
                  <div class="infotext-container">
                    <div class="infotext-content">
                      <div style="font-weight: bold">
                        {@html referenceName.header}
                      </div>
                      <div>
                        {info}
                      </div>
                      <button
                        class="info-done"
                        on:click={() => toggleInfoPopup("","")}>done</button
                      >
                    </div>
                  </div>
                {/if}
              {/if}
            {/if}
          </div>
        {:else if contentType === "list"}
          <div class="reference-section-body ref-list">
            {#if beforeContent}
              <div ng-if="refsec.beforeContent" class="ref-before-content">
                {@html beforeContent}
              </div>
            {/if}
            <ul style="margin-bottom:2px">
              {#each contentItems as contentItem}
                {#if typeof contentItem !== "string" && contentItem instanceof Object}
                  <li>
                    {@html contentItem.main}
                  </li>
                  <ul>
                    {#each contentItem.subContents as subContent}
                      <li>{@html subContent}</li>
                    {/each}
                  </ul>
                {:else}
                  <li>{@html contentItem}</li>
                {/if}
              {/each}
            </ul>
          </div>
        {:else if contentType === "numbered-list"}
          <ol class="reference-section-body ref-list">
            {#each contentItems as contentItem, i_subsection}
              <li>
                <!-- delete -->
                {#if contentItem.deletable && canEdit}
                  <button
                    class="delete"
                    on:click={() => deleteContentItem(i_section, i_subsection)}
                    ><i
                      class="fa-solid fa-trash-can"
                      style="color: #808080;"
                    /></button
                  >
                {/if}
                <!-- main content -->
                {#if typeof contentItem === "string" || contentItem instanceof String}
                  {@html contentItem}
                {:else if contentItem.editable && canEdit}
                  <!-- <li style="display:inline"> -->
                  <input class="edit-box" bind:value={contentItem.main} />
                  <!-- </li> -->
                {:else}
                  <!-- <li> -->
                  {@html contentItem.main}
                  <!-- </li> -->
                {/if}
              </li>
              <!-- subcontents -->
              <ul class="ref-list-disc">
                {#if contentItem.subContents}
                  {#each contentItem.subContents as subContent}
                    {#if contentItem.editable && canEdit}
                      <li>
                        <input class="edit-box" bind:value={subContent} />
                      </li>
                    {:else}
                      <li>{@html subContent}</li>
                    {/if}
                  {/each}
                {/if}
              </ul>
            {/each}
            <!-- whole list editable (add new line) -->
            {#if editable && canEdit}
              <li>
                <button on:click={() => addContentItem(i_section)}
                  >add new line</button
                >
                <!-- info icon -->
                {#if info && canEdit}
                  <button class="info" on:click={() => toggleInfoPopup(info,referenceName.header)}>
                    <i
                      class="fa-solid fa-circle-info"
                      style="color: #808080;"
                    />
                  </button>
                  {#if showInfoPopup && info === currentPopupText && referenceName.header === currentPopupHeader}
                    <div class="infotext-container">
                      <div class="infotext-content">
                        <div style="font-weight: bold">
                          {@html referenceName.header}
                        </div>
                        <div>
                          {info}
                        </div>
                        <button
                          class="info-done"
                          on:click={() => toggleInfoPopup("","")}>done</button
                        >
                      </div>
                    </div>
                  {/if}
                {/if}
              </li>
            {/if}
          </ol>
        {:else if contentType == "drug-table" && numbered == true}
          <div class="reference-section-body ref-num-drug-table">
            <ol>
              {#each drugs as { options }, i}
                <li>
                  <div class="ref-num-drug-item">
                    <table>
                      <tbody>
                        {#each options as drugOption}
                          <tr>
                            <td class="ref-drug-item-name"
                              >{@html drugOption.name}</td
                            >
                            {#if typeof drugOption.value === "string" || drugOption.value instanceof String}
                              <td>
                                <ul class="drug-values">
                                  <li class="drug-list-num">
                                    <div>
                                      {@html drugOption.value}
                                    </div>
                                  </li>
                                </ul>
                              </td>
                            {:else if drugOption.value instanceof Array}
                              <td>
                                <div
                                  class="reference-section-drug-item-option-values"
                                >
                                  {#each drugOption.value as val}
                                    <div>
                                      {@html val}
                                    </div>
                                  {/each}
                                </div>
                              </td>
                            {/if}
                          </tr>
                        {/each}
                      </tbody>
                    </table>
                  </div>
                </li>
              {/each}
            </ol>
          </div>
        {:else if contentType === "drug-table"}
          <div class="reference-section-body ref-table">
            {#each drugs as { options, afterContent }, i_drug}
              <div class="ref-drug-item ref-table {tableWidth}">
                <table>
                  <tbody>
                    {#each options as { name, value, info }, i_option}
                      <tr>
                        <td class="ref-drug-item-name">
                          {@html name}
                          {#if info && canEdit}
                            <button
                              class="info"
                              on:click={() => toggleInfoPopup(info,name)}
                            >
                              <i
                                class="fa-solid fa-circle-info"
                                style="color: #808080;"
                              />
                            </button>
                            {#if showInfoPopup && info === currentPopupText && name === currentPopupHeader}
                              <div class="infotext-container">
                                <div class="infotext-content">
                                  <div style="font-weight: bold">
                                    {@html name}
                                  </div>
                                  <div>
                                    {info}
                                  </div>
                                  <button
                                    class="info-done"
                                    on:click={() => toggleInfoPopup("","")}
                                    >done</button
                                  >
                                </div>
                              </div>
                            {/if}
                          {/if}
                        </td>
                        {#if typeof value === "string" || value instanceof String}
                          <td>
                            <div>
                              {@html value}
                            </div>
                          </td>
                        {:else if value instanceof Array}
                          <td>
                            <div class="ref-drug-item-option-values">
                              {#each value as val, i_val}
                                <div>
                                  <!-- delete -->
                                  {#if val instanceof Object && val.deletable && canEdit}
                                    <button
                                      class="deleteDrugDilution"
                                      on:click={() =>
                                        deleteSelectableControl(
                                          i_section,
                                          i_drug,
                                          i_option,
                                          i_val
                                        )}
                                      ><i
                                        class="fa-solid fa-trash-can"
                                        style="color: #808080;"
                                      /></button
                                    >
                                  {/if}
                                  {#if val instanceof Object}
                                    {#if "editable" in val && val.editable && val.selectable && canEdit}
                                      <input
                                        list={name}
                                        name={val.defaultValue}
                                        placeholder="SELECT OR START TYPING"
                                        on:input={() =>
                                          handleSelectInput(
                                            event,
                                            i_section,
                                            i_drug,
                                            i_option,
                                            i_val
                                          )}
                                      />
                                      <datalist id={name}>
                                        {#each val.valueOptions as vO}
                                          <option value={vO} />
                                        {/each}
                                      </datalist>
                                    {:else if val.selectable && canEdit}
                                      <select
                                        bind:value={val.defaultValue}
                                        on:change={() =>
                                          handleSelectInput(
                                            event,
                                            i_section,
                                            i_drug,
                                            i_option,
                                            i_val
                                          )}
                                      >
                                        {#each val.valueOptions as vO}
                                          <option value={vO}>{vO}</option>
                                        {/each}
                                      </select>
                                    {:else}
                                      <div>
                                        {@html val.defaultValue}
                                      </div>
                                    {/if}
                                    {#if val.info && canEdit}
                                      <button
                                        class="info"
                                        on:click={() =>
                                          toggleInfoPopup(val.info,name)}
                                      >
                                        <i
                                          class="fa-solid fa-circle-info"
                                          style="color: #808080;"
                                        />
                                      </button>
                                      {#if showInfoPopup && val.info === currentPopupText && name === currentPopupHeader}
                                        <div class="infotext-container">
                                          <div class="infotext-content">
                                            <div style="font-weight: bold">
                                              {@html name}
                                            </div>
                                            <div>
                                              {val.info}
                                            </div>
                                            <button
                                              class="info-done"
                                              on:click={() =>
                                                toggleInfoPopup("","")}
                                              >done</button
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    {/if}
                                  {:else}
                                    <div>
                                      {@html val}
                                    </div>
                                  {/if}
                                </div>
                              {/each}
                            </div>
                          </td>
                        {/if}
                      </tr>
                    {/each}
                  </tbody>
                </table>
                {#if afterContent}
                  <div class="ref-drug-aftercontent">{afterContent}</div>
                {/if}
              </div>
            {/each}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<style>
  .reference-content {
    position: absolute;
    /* right: 0; */
    border: thin solid #555;
    border-radius: 6px;
    font-size: 0.8rem;
    font-family: "HelveticaNeueCondensed", "HelveticaNeue-Condensed",
      "Helvetica Neue Condensed", "HelveticaNeueRomanCondensed",
      "HelveticaNeue-Roman-Condensed", "Helvetica Neue Roman Condensed",
      "HelveticaNeue", "Helvetica Neue", "HelveticaNeueRoman",
      "HelveticaNeue-Roman", "Helvetica Neue Roman", "TeXGyreHerosCnRegular",
      "Helvetica", "Tahoma", "Geneva", "Arial Narrow", "Arial", sans-serif;
  }

  .reference-header {
    position: relative;
    padding: 0.2rem 0 0.2rem 0.75rem;
    font-size: 0.8rem;
    color: white;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .reference-body {
    position: relative;
    width: 100%;
    height: 100%;
    /* padding: 0.5rem 0.75rem 0.5rem 0.75rem; */
  }

  .reference-section {
    position: relative;
    /* padding: 0 0.5rem; */
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    box-sizing: border-box;
  }

  .reference-section-header {
    margin-bottom: 0.25rem;
  }

  .reference-section-body {
    font-size: 0.75rem;
  }

  /*** SECTION FORMATTING ***/
  .reference-body.vertical-sections-noseparator > .reference-section {
    border: none;
  }

  .reference-body.vertical-sections > .reference-section {
    border-top: solid thin #555;
  }

  .reference-body.vertical-sections > .reference-section:first-child {
    border-top: none;
  }

  .reference-body.horizontal-sections-noseparator > .reference-section {
    display: inline-block;
    vertical-align: top;
    height: 100%;
  }

  .reference-body.horizontal-sections > .reference-section {
    display: inline-block;
    vertical-align: top;
    height: 100%;
    border-left: solid thin #555;
  }

  .reference-body.horizontal-sections > .reference-section:first-child {
    border-left: none;
  }

  /*** LIST ***/
  .ref-before-content {
    margin: 0 0 0.3em 0;
  }

  .ref-list {
    margin-left: -1rem;
    margin-bottom: 0;
  }

  /*** NUMBERED LIST ***/
  .ref-list-disc {
    list-style-type: disc;
  }

  ol ul {
    padding-left: 1em;
  }

  /*** DRUG TABLE ***/
  .ref-drug-aftercontent {
    font-style: italic;
    top: -6px;
    position: relative;
    margin-left: 1em;
  }

  .ref-drug-item table {
    width: 100%;
    margin: 0;
    padding: 0;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  .ref-drug-item table td {
    vertical-align: top;
    margin: 0;
    padding: 0;
    word-wrap: normal;
  }

  .ref-drug-item table td:first-child {
    padding-bottom: 1rem;
  }

  .ref-drug-item-option-values {
    padding-bottom: 0.5rem;
  }

  .ref-table table td:first-child {
    padding-bottom: 0.5rem;
    width: 8rem;
  }

  .ref-table.narrow table td:first-child {
    width: 6rem;
  }

  .ref-table.normal table td:first-child {
    width: 8rem;
  }

  .ref-table.wide table td:first-child {
    width: 11rem;
  }

  /*** UNCLASSIFIED ***/
  .drug-values li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .reference-section-text-drug-item {
    padding-bottom: 0.25rem;
  }
  .drug-values {
    list-style: disc;
    margin: 0 0 0 1rem;
    padding: 0;
  }

  /*** NUMBERED DRUG TABLE ***/
  .ref-num-drug-table ol {
    counter-reset: ref-list;
    list-style: none;
    *list-style: decimal;
    /* Keep using default numbering for IE6/7 */
    margin: 0;
    padding: 0;
  }

  .ref-num-drug-table li {
    margin: 0;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0 0 0;
    border-top: solid thin #555;
  }

  .ref-num-drug-table li:first-child {
    padding: 0;
    border-top: none;
  }

  .ref-num-drug-item:before {
    content: counter(ref-list) ".";
    counter-increment: ref-list;
    position: absolute;
  }

  .ref-num-drug-item table {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  .ref-num-drug-item table td {
    vertical-align: top;
    margin: 0;
    padding: 0;
    word-wrap: normal;
  }

  .ref-num-drug-item table td:first-child {
    width: 9rem;
    padding-left: 1rem;
  }

  /*** RESUSCITATION TABLE ***/
  .reference-section-non-num-resuscitation-item-option-values {
    padding-bottom: 0rem;
  }
  ul.reference-section-non-num-resuscitation-item-option-values {
    margin-left: -1rem;
  }

  .reference-section-non-num-resuscitation-item-name {
    font-weight: bold;
  }

  .reference-section-non-num-resuscitation-item table td {
    vertical-align: top;
    margin: 0;
    padding: 0;
    word-wrap: normal;
  }

  .reference-section-non-num-resuscitation-item table td:first-child {
    width: 5rem;
    padding-bottom: 0.5rem;
  }

  /*** RESUSCITATION TABLE ***/

  .reference-section-resuscitation-table ol {
    counter-reset: ref-list;
    list-style: none;
    *list-style: decimal; /* Keep using default numbering for IE6/7 */
    margin: 0;
    padding: 0;
  }

  .reference-section-resuscitation-table li {
    margin: 0;
    margin-bottom: 0.25rem;
    padding: 0.25rem 0 0 0;
  }

  .reference-section-resuscitation-table li:first-child {
    padding: 0;
    border-top: none;
  }

  .reference-section-resuscitation-item:before {
    content: counter(ref-list) ".";
    counter-increment: ref-list;
    position: absolute;
  }

  .reference-section-resuscitation-item table {
    width: 100%;
    margin: 0 0 0 0;
    padding: 0;
    border-collapse: collapse;
    box-sizing: border-box;
  }

  .reference-section-resuscitation-item table tr {
  }

  .reference-section-resuscitation-item table td {
    vertical-align: top;
    margin: 0;
    padding: 0;
    word-wrap: normal;
  }

  .reference-section-resuscitation-item table td:first-child {
    width: 9rem;
    padding-left: 1rem;
  }

  /* editable sections */
  select {
    width: 80%;
  }

  button.delete {
    position: relative;
    top: 0px;
    left: 0px;
    border: none;
    background: none;
    padding: 0;
  }
  button.deleteDrugDilution {
    position: relative;
    top: 5px;
    right: 1rem;
    border: none;
    background: none;
    padding: 0;
    width: 0;
    float: left;
  }

  .edit-box {
    padding: 2px 4px;
    border: 1px solid gray;
    border-radius: 2px;
    width: 89%;
    background-color: white;
  }

  .edit-box:active {
    border: 1px solid black;
  }

  button.info {
    position: relative;
    top: -2px;
    font-size: small;
    border: none;
    background: none;
  }

  button.info-done {
    border: 1px solid black;
    border-radius: 2px;
    background: white;
    padding: 2px 4px;
    font-size: 12px;
    position: relative;
    right: 0;
    bottom: 0;
  }

  .infotext-container {
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }

  .infotext-content {
    background-color: white;
    margin: 20% auto;
    padding: 20px;
    border-radius: 8px;
    width: 50%;
    font-weight: 100;
  }

  /* mobile view */
  @media not print {
    @media (max-width: 1020px) {
      .reference-content {
        position: relative;
        width: 100% !important;
        top: 0 !important;
      }
      .reference-section {
        width: 100% !important;
      }
      .reference-body.horizontal-sections-noseparator > .reference-section {
        padding: 0 0.75rem;
      }
      .reference-body.horizontal-sections-noseparator:first-of-type {
        padding-top: 0.5rem;
      }
      .reference-body.horizontal-sections-noseparator:last-of-type {
        padding-bottom: 0.5rem;
      }
      #differential-diagnosis {
        right: 0 !important;
      }
    }
  }

  /* print */
  @media print {
    .reference-content {
      /* width: 100%;
      position: fixed; */
      right: 0.5in !important;
    }
    .reference-section-body {
      font-size: 10px;
    }
    #differential-diagnosis {
      right: var(--referenceRightAlign) !important;
    }
  }
</style>
