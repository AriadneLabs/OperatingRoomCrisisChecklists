<script>
  import { onMount } from "svelte";
  import { model } from "../models/last.js";
  import ReferenceSection from "../components/reference_section.svelte";

  let stepSetsModel = model.stepSets;
  let drugDoses = model.references["drug-doses"];
  let criticalChanges = model.references["critical-changes"];
  let signsSymptoms = model.references["signs-and-symptoms"];
  let editOk = false;
  let editButtonLabel = "Edit";
  let infoPopup = false;
  let currentPopupText = "";

  $: canEdit = editOk;
  $: stepSets = stepSetsModel;
  $: showInfoPopup = infoPopup;

  function editChecklist() {
    editOk = !editOk;
    editButtonLabel = editButtonLabel === "Edit" ? "Done editing" : "Edit";
  }
  function printPage() {
    window.print();
  }
  function moveStepUp(index, step, steps, stepSetsIndex) {
    console.log("move up #" + index + " of " + steps.length);
    if (index > 0) {
      steps.splice(index, 1);
      steps.splice(index - 1, 0, step);
      stepSets[stepSetsIndex] = steps;
    }
  }
  function moveStepDown(index, step, steps, stepSetsIndex) {
    console.log("move down #" + index + " of " + steps.length);
    steps.splice(index, 1);
    steps.splice(index + 1, 0, step);
    stepSets[stepSetsIndex] = steps;
  }
  function deleteStep(stepSetsIndex, i_step) {
    stepSets[stepSetsIndex].splice(i_step, 1);
    stepSets = stepSets;
  }
  function deleteSubStep(stepSetsIndex, i_step, i_substep, step) {
    step.subContent.items.splice(i_substep, 1);
    stepSets[stepSetsIndex][i_step] = step;
  }
  function deleteSubSubStep(
    stepSetsIndex,
    i_step,
    i_substep,
    i_subsubstep,
    subStep
  ) {
    subStep.subList.splice(i_subsubstep, 1);
    stepSets[stepSetsIndex][i_step][i_substep] = subStep;
  }
  function toggleInfoPopup(popUpText) {
    infoPopup = !infoPopup;
    currentPopupText = popUpText;
  }
  function handleSelectInput(event, i_section, i_contentValue) {
    console.log(event.target.value);
    drugDoses.sections[i_section].contentItems[i_contentValue].defaultValue =
      event.target.value;
  }
  function deleteSelectableControl(i_section, i_contentValue) {
    drugDoses.sections[i_section].contentItems.splice(i_contentValue, 1);
    drugDoses = drugDoses;
  }
  onMount(() => {});
</script>

<div id="top-buttons">
  <button class="edit-button" on:click={editChecklist}>
    <i class="fa-solid fa-pen-to-square" style="color: #ffffff;" />
    {editButtonLabel}
  </button>
  <button class="print-button" on:click={printPage} disabled={canEdit}>
    <i class="fa-solid fa-print" style="color: #ffffff;" />
    Save as PDF/Print
  </button>
</div>
<div id="editor-page" ng-controller="MainCtrl">
  <div id="page-header">
    <div id="page-header-main-row">
      <div id="page-header-number">{model.page.pageNumber}</div>
      <div id="page-header-title">{@html model.page.title}</div>
    </div>
    <div id="page-header-sub-title">{@html model.page.subTitle}</div>
    <div class="first-index-print" style="top:0.5in">INDEX</div>
    <div class="index-print" style="top:5.22in">12</div>
  </div>

  <div id="page-body">
    <div id="page-body-starter">
      <div id="page-body-start-box">START</div>
    </div>

    <div id="page-body-content">
      <!-- begin steps (0) -->
      <div class="page-body-steps">
        <ol>
          {#each stepSets[0] as step, i_step}
            <li class="step-container">
              <!-- main step delete -->
              {#if step.deletable && canEdit}
                <button class="delete" on:click={() => deleteStep(0, i_step)}
                  ><i
                    class="fa-solid fa-trash-can"
                    style="color: #808080;"
                  /></button
                >
              {/if}
              <!-- main step move -->
              {#if step.movable && canEdit}
                <div class="main-step-mover">
                  <button
                    class="move-up"
                    on:click={() => moveStepUp(i_step, step, stepSets[0], 0)}
                  />
                  <button
                    class="move-down"
                    on:click={() => moveStepDown(i_step, step, stepSets[0], 0)}
                  />
                </div>
              {/if}
              <!-- main step content -->
              <div class="step-item" id="page-step-{step.id}">
                <div class="step-item-content">
                  <div al-html-item="pageStep.main" class="step-item-main">
                    {#if step.editable && canEdit}
                      <input class="edit-box" bind:value={step.main} />
                    {:else}
                      {@html step.main}
                    {/if}
                    <!-- info icon -->
                    {#if step.info && canEdit}
                      <button
                        class="info"
                        on:click={() => toggleInfoPopup(step.info)}
                      >
                        <i
                          class="fa-solid fa-circle-info"
                          style="color: #808080;"
                        />
                      </button>
                      {#if showInfoPopup && currentPopupText === step.info}
                        <div class="infotext-container">
                          <div class="infotext-content">
                            <div style="font-weight: bold">
                              {@html step.main}
                            </div>
                            <div>
                              {step.info}
                            </div>
                            <button
                              class="info-done"
                              on:click={() => toggleInfoPopup("")}>done</button
                            >
                          </div>
                        </div>
                      {/if}
                    {/if}
                  </div>

                  <!-- begin substep (1) -->
                  {#if step.subContent}
                    <div class="step-item-sub-content">
                      {#if step.subContent.contentType === "action-list"}
                        <ul class="step-actions-list">
                          {#each step.subContent.items as subStep, i_substep}
                            <li>
                              <!-- substep delete -->
                              {#if subStep.deletable && canEdit}
                                <button
                                  class="delete"
                                  on:click={() =>
                                    deleteSubStep(0, i_step, i_substep, step)}
                                  ><i
                                    class="fa-solid fa-trash-can"
                                    style="color: #808080;"
                                  /></button
                                >
                              {/if}
                              <!-- substep content -->
                              {#if typeof subStep === "string" || subStep instanceof String}
                                <div>
                                  {@html subStep}
                                </div>
                              {:else if typeof subStep !== "string" || subStep instanceof Object}
                                <div>
                                  {#if subStep.editable && canEdit}
                                    <input
                                      class="edit-box"
                                      bind:value={subStep.text}
                                    />
                                  {:else}
                                    {@html subStep.text}
                                  {/if}
                                  <!-- info icon -->
                                  <span>
                                    {#if subStep.info && canEdit}
                                      <button
                                        class="info"
                                        on:click={() =>
                                          toggleInfoPopup(subStep.info)}
                                      >
                                        <i
                                          class="fa-solid fa-circle-info"
                                          style="color: #808080;"
                                        />
                                      </button>
                                      {#if showInfoPopup && subStep.info === currentPopupText}
                                        <div class="infotext-container">
                                          <div class="infotext-content">
                                            <div style="font-weight: bold">
                                              {@html subStep.text}
                                            </div>
                                            <div>
                                              {subStep.info}
                                            </div>
                                            <button
                                              class="info-done"
                                              on:click={() =>
                                                toggleInfoPopup("")}
                                              >done</button
                                            >
                                          </div>
                                        </div>
                                      {/if}
                                    {/if}
                                  </span>

                                  <!-- begin subsubstep (2) -->
                                  <ul>
                                    {#each subStep.subList as subSubStep, i_subsubstep}
                                      <li>
                                        {#if typeof subSubStep === "string" || subSubStep instanceof String}
                                          {@html subSubStep}
                                        {:else if typeof subSubStep !== "string" || subSubStep instanceof Object}
                                          <!-- subsubstep delete -->
                                          {#if subSubStep.deletable && canEdit}
                                            <button
                                              class="delete"
                                              on:click={() =>
                                                deleteSubSubStep(
                                                  0,
                                                  i_step,
                                                  i_substep,
                                                  i_subsubstep,
                                                  subStep
                                                )}
                                              ><i
                                                class="fa-solid fa-trash-can"
                                                style="color: #808080;"
                                              /></button
                                            >
                                          {/if}
                                          <!-- subsubstep content -->
                                          {@html subSubStep.text}
                                          <!-- info icon -->
                                          <span>
                                            {#if subSubStep.info && canEdit}
                                              <button
                                                class="info"
                                                on:click={() =>
                                                  toggleInfoPopup(
                                                    subSubStep.info
                                                  )}
                                              >
                                                <i
                                                  class="fa-solid fa-circle-info"
                                                  style="color: #808080;"
                                                />
                                              </button>
                                              {#if showInfoPopup && subSubStep.info === currentPopupText}
                                                <div class="infotext-container">
                                                  <div class="infotext-content">
                                                    <div
                                                      style="font-weight: bold"
                                                    >
                                                      {@html subSubStep.text}
                                                    </div>
                                                    <div>
                                                      {subSubStep.info}
                                                    </div>
                                                    <button
                                                      class="info-done"
                                                      on:click={() =>
                                                        toggleInfoPopup("")}
                                                      >done</button
                                                    >
                                                  </div>
                                                </div>
                                              {/if}
                                            {/if}
                                          </span>

                                          <!-- begin subsubsubstep (3) -->
                                          <ul>
                                            {#each subSubStep.subList as subSubSubStep, i_subsubsubstep}
                                              <li class="no-list-style">
                                                {#if typeof subSubSubStep === "string" || subSubSubStep instanceof String}
                                                  {@html subSubSubStep}
                                                {:else if typeof subSubSubStep !== "string" || subSubSubStep instanceof Object}
                                                  <div>
                                                    {@html subSubSubStep.text}
                                                  </div>

                                                  <!-- begin subsubsubsubstep (4) -->
                                                  <ul class="dashed">
                                                    {#each subSubSubStep.subList as fourthSubStep, i}
                                                      <li>
                                                        {@html fourthSubStep}
                                                      </li>
                                                    {/each}
                                                  </ul>
                                                {/if}
                                              </li>
                                            {/each}
                                          </ul>
                                        {/if}
                                      </li>
                                    {/each}
                                  </ul>
                                </div>
                              {/if}
                            </li>
                          {/each}
                        </ul>
                      {/if}
                    </div>
                  {/if}
                </div>
              </div>
            </li>
          {/each}
        </ol>
      </div>

      <div
        class="reference-content"
        style="top:0in; width:4in"
        id={drugDoses.id}
      >
        <div class="reference-header" style="background-color:#4780a6">
          {@html drugDoses.header}
        </div>
        <div class="reference-body {drugDoses.layout}">
          {#each drugDoses.sections as { header, contentType, leftItems, contentItems, afterContent }, i_section}
            <div class="reference-section" style="width:100%">
              {#if header}
                <div class="reference-section-header">
                  <b>{header}</b>
                </div>
              {/if}
              {#if contentType === "text"}
                <div class="reference-section-body reference-section-text">
                  {#each contentItems as contentItem, i_contentValue}
                    <div>
                      <!-- delete -->
                      {#if contentItem instanceof Object && contentItem.deletable && canEdit}
                        <button
                          class="deleteDrugDilution"
                          on:click={() =>
                            deleteSelectableControl(i_section, i_contentValue)}
                          ><i
                            class="fa-solid fa-trash-can"
                            style="color: #808080;"
                          /></button
                        >
                      {/if}
                      {#if contentItem instanceof Object}
                        {#if contentItem.selectable && canEdit}
                          <select
                            bind:value={contentItem.defaultValue}
                            on:change={() =>
                              handleSelectInput(
                                event,
                                i_section,
                                i_contentValue
                              )}
                          >
                            {#each contentItem.valueOptions as vO}
                              <option value={vO}>{vO}</option>
                            {/each}
                          </select>
                        {:else}
                          {@html contentItem.defaultValue}
                        {/if}
                        {#if contentItem.info && canEdit}
                          <button
                            class="info" style="top:auto"
                            on:click={() => toggleInfoPopup(contentItem.info)}
                          >
                            <i
                              class="fa-solid fa-circle-info"
                              style="color: #808080;"
                            />
                          </button>
                          {#if showInfoPopup && contentItem.info === currentPopupText}
                            <div class="infotext-container">
                              <div class="infotext-content">
                                <div style="font-weight: bold">
                                  {@html name}
                                </div>
                                <div>
                                  {contentItem.info}
                                </div>
                                <button
                                  class="info-done" 
                                  on:click={() => toggleInfoPopup("")}
                                  >done</button
                                >
                              </div>
                            </div>
                          {/if}
                        {/if}
                      {:else}
                        {@html contentItem}
                      {/if}
                    </div>
                  {/each}
                </div>
                {#if afterContent}
                  <div>
                    <em>{@html afterContent}</em>
                  </div>
                {/if}
              {:else if contentType === "table"}
                <div class="ref-table-container">
                  <div class="ref-table-column-left">
                    <div>{leftItems[0]}</div>
                    <div>{leftItems[1]}</div>
                    <div>{leftItems[2]}</div>
                  </div>
                  {#each contentItems as column}
                    <div class="ref-table-column-right">
                      <div><b>{column[0]}</b></div>
                      <div>{column[1]}</div>
                      <div>{column[2]}</div>
                    </div>
                  {/each}
                </div>
                {#if afterContent}
                  <div class="ref-drug-aftercontent">
                    {@html afterContent}
                  </div>
                {/if}
              {/if}
            </div>
          {/each}
        </div>
      </div>
      <ReferenceSection
        referenceRightAlign="0"
        referenceName={signsSymptoms}
        referenceColor="var(--green)"
        referenceHeight="2.7in"
        referenceWidth="4in"
      />
      <ReferenceSection
        referenceRightAlign="0"
        referenceName={criticalChanges}
        referenceColor="var(--orange)"
        referenceHeight="4.2in"
        referenceWidth="4in"
      />
    </div>
    <footer>
      <span
        >All reasonable precautions have been taken to verify the information
        contained in this publication. The responsibility for the interpretation
        and use of the materials lies with the reader.</span
      >
      <span style="color:var(--orange);font-weight:bold"
        >October 2023</span
      >
    </footer>
  </div>
</div>

<style>
  /* reference section */
  .reference-content {
    position: absolute;
    right: 0;
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
  }

  .reference-section {
    position: relative;
    padding: 0.5rem 0.75rem 0.5rem 0.75rem;
    box-sizing: border-box;
  }

  .reference-section-header {
    margin-bottom: 0.25rem;
  }

  .reference-section-body {
    font-size: 0.7rem;
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

  .ref-table-container {
    width: 100%;
  }

  .ref-table-column-left {
    display: inline-block;
    width: 15%;
  }

  .ref-table-column-right {
    display: inline-block;
    border-right: 1px solid black;
    width: 40%;
    margin: 0.2em;
  }

  .ref-table-column-right:last-child {
    border-right: none;
  }

  .ref-drug-aftercontent {
    font-style: italic;
    position: relative;
    margin-left: 1em;
  }

  @media not print {
    @media (max-width: 1020px) {
      .reference-content {
        position: relative;
        width: 100% !important;
        top: 0 !important;
      }
    }
  }

  @media print {
    .reference-content {
      /* width: 100%;
      position: fixed; */
      right: 0.5in;
    }
  }

  /* end reference section */

  .page-body-steps {
    width: 5.5in;
  }
</style>
