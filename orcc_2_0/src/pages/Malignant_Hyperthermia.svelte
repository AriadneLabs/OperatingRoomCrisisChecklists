<script>
  import { onMount } from "svelte";
  import { model } from "../models/malignant_hyperthermia.js";
  import ReferenceSection from "../components/reference_section.svelte";

  let stepSetsModel = model.stepSets;
  let drugDoses = model.references["drug-doses"];
  let differentialDiagnosis = model.references["differential-diagnosis"];

  let editOk = false;
  let editButtonLabel = "Edit";
  let infoPopup = false;
  let currentPopupText = "";
  $: canEdit = editOk;
  $: stepSets = stepSetsModel;
  $: showInfoPopup = infoPopup;
  $: dd = drugDoses;

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
  function deleteDantrium(i_section, i_drug, options,i_option) {
    options.splice(i_option, 1);
    drugDoses["sections"][i_section]["drugs"][i_drug]["options"] = options;
  }
  function deleteRyanodex(i_section, i_drug, options) {
    options.splice(1, 1);
    drugDoses["sections"][i_section]["drugs"][i_drug]["options"] = options;
    if(drugDoses["sections"][i_section]["drugs"][i_drug]["options"][1]["name"].includes("- or -") ||drugDoses["sections"][i_section]["drugs"][i_drug]["options"][1]["name"].includes("Dantrium ")){
      drugDoses["sections"][i_section]["drugs"][i_drug]["options"][1]["name"] =
      "Dantrium or Revonto";
    }
    
  }
  function handleSelectInput(event, stepSetsIndex, i_step) {
    console.log(event.target.value);
    referenceName.sections[i_section].drugs[i_drug].options[i_option].value[
      i_val
    ].main = event.target.value;
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
    <div class="index-print" style="top:5.6in">13</div>
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
                    {:else if step.selectable && canEdit}
                      <select
                        bind:value={step.main}
                        on:change={() => handleSelectInput(event, 0, i_step)}
                      >
                        {#each step.valueOptions as vO}
                          <option value={vO}>{vO}</option>
                        {/each}
                      </select>
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

      <!-- begin second column steps (0) -->
      <div class="page-body-steps">
        <ol>
          {#each stepSets[1] as step, i_step}
            <li class="step-container">
              <!-- main step delete -->
              {#if step.deletable && canEdit}
                <button class="delete" on:click={() => deleteStep(1, i_step)}
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
                    on:click={() => moveStepUp(i_step, step, stepSets[1], 1)}
                  />
                  <button
                    class="move-down"
                    on:click={() => moveStepDown(i_step, step, stepSets[1], 1)}
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
                                    deleteSubStep(1, i_step, i_substep, step)}
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
                                                  1,
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

      <!-- <ReferenceSection referenceRightAlign="0"
        referenceName={drugDoses}
        referenceColor="var(--blue)"
        referenceHeight="0in"
        referenceWidth="3.2in"
        {canEdit}
      /> -->

      <div
        class="reference-content"
        style="top:-0.2in; width:3.2in"
        id={drugDoses.id}
      >
        <div class="reference-header" style="background-color:var(--blue)">
          {@html drugDoses.header}
        </div>
        <div class="reference-body {drugDoses.layout}">
          {#each drugDoses.sections as { header, contentType, drugs, tableWidth }, i_section}
            <div class="reference-section" style="width:100%">
              {#if header}
                <div class="reference-section-header" style="color:var(--blue)">
                  {header}
                </div>
              {/if}
              {#if contentType === "drug-table"}
                <div class="reference-section-body ref-table">
                  {#each drugs as { options, afterContent }, i_drug}
                    <div class="ref-drug-item ref-table {tableWidth}">
                      <table>
                        <tbody>
                          {#each options as { name, value, info }, i_option}
                            <tr>
                              <td class="ref-drug-item-name">
                                {#if name === "Ryanodex" && canEdit}
                                  <button
                                    class="drug-delete"
                                    on:click={() =>
                                      deleteRyanodex(
                                        i_section,
                                        i_drug,
                                        options
                                      )}
                                    ><i
                                      class="fa-solid fa-trash-can"
                                      style="color: #808080;"
                                    /></button
                                  >
                                {/if}
                                {#if (((name.includes("- or -") && name.includes("Dantrium") && name.includes("Revonto")) || name == "Dantrium or Revonto") && canEdit)}
                                  <button
                                    class="drug-delete"
                                    on:click={() =>
                                      deleteDantrium(
                                        i_section,
                                        i_drug,
                                        options,
                                        i_option
                                      )}
                                    ><i
                                      class="fa-solid fa-trash-can"
                                      style="color: #808080;"
                                    /></button
                                  >
                                {/if}
                                {@html name}
                                {#if info && canEdit}
                                  <button
                                    class="info"
                                    style="top:0"
                                    on:click={() => toggleInfoPopup(info)}
                                  >
                                    <i
                                      class="fa-solid fa-circle-info"
                                      style="color: #808080;"
                                    />
                                  </button>
                                  {#if showInfoPopup && info === currentPopupText}
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
                                          on:click={() => toggleInfoPopup("")}
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
                                        {#if val instanceof Object}
                                          {#if val.selectable && canEdit}
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
                                                toggleInfoPopup(val.info)}
                                            >
                                              <i
                                                class="fa-solid fa-circle-info"
                                                style="color: #808080;"
                                              />
                                            </button>
                                            {#if showInfoPopup && val.info === currentPopupText}
                                              <div class="infotext-container">
                                                <div class="infotext-content">
                                                  <div
                                                    style="font-weight: bold"
                                                  >
                                                    {@html name}
                                                  </div>
                                                  <div>
                                                    {val.info}
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

      <ReferenceSection
        referenceRightAlign="0"
        referenceName={differentialDiagnosis}
        referenceColor="var(--purple)"
        referenceHeight="4in"
        referenceWidth="6.4in"
      />
    </div>
  </div>
  <footer>
    <span
      >All reasonable precautions have been taken to verify the information
      contained in this publication. The responsibility for the interpretation
      and use of the materials lies with the reader.</span
    >
    <span style="color:var(--orange);font-weight:bold">October 2023</span>
  </footer>
</div>

<style>
  .page-body-steps {
    width: 3.1in;
    vertical-align: top;
  }

  .drug-delete {
    position: relative;
    border: none;
    background: none;
    padding: 0;
  }

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

  /* .ref-drug-item-name {
    font-weight: bold;
  } */

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
    }
  }

  @media print {
    .reference-content {
      /* width: 100%;
      position: fixed; */
      right: 0.5in;
    }
    .reference-section-body {
      font-size: 10px;
    }
  }
</style>
