<script>
  import { onMount } from "svelte";
  import { model } from "../models/anaphylaxis.js";
  import ReferenceSection from "../components/reference_section.svelte";

  let stepSetsModel = model.stepSets;
  let criticalChanges = model.references["critical-changes"];
  let commonCausativeAgents = model.references["common-causative-agents"];
  let drugDoses = model.references["drug-doses"];

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
    <div class="index-print" style="top:1.28in">02</div>
  </div>

  <div id="page-body">
    <div id="page-body-starter">
      <div id="page-body-start-box">START</div>
    </div>

    <div id="page-body-content">
      <!-- begin steps (0th level) -->
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

                                  {#if subStep.subList}
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
                                                  <div
                                                    class="infotext-container"
                                                  >
                                                    <div
                                                      class="infotext-content"
                                                    >
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
                                  {/if}
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

      <ReferenceSection referenceRightAlign="0"
        referenceName={drugDoses}
        referenceColor="var(--blue)"
        referenceHeight="-0.1in"
        {canEdit}
        referenceWidth="4in"
      />

      <ReferenceSection referenceRightAlign="0"
        referenceName={commonCausativeAgents}
        referenceColor="var(--green)"
        referenceHeight="2.8in"
        referenceWidth="4in"
      />

      <ReferenceSection referenceRightAlign="0"
        referenceName={criticalChanges}
        referenceColor="var(--orange)"
        referenceHeight="4.3in"
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
  .page-body-steps {
    max-width: 5in;
  }
</style>
