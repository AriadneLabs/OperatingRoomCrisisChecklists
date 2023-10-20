<script>
  import { onMount } from "svelte";
  import { model } from "../models/fire";
  import ReferenceSection from "../components/reference_section.svelte";

  let stepSetsModel = model.stepSets;
  let stepSetsBranchModel = model.stepSetsBranch;
  let stepSetsBranchHeadingModel = model.stepSetsBranchHeading;

  let fireExtinguisher = model.references["fire-extinguisher"];
  let editOk = false;
  let editButtonLabel = "Edit";
  let infoPopup = false;
  let currentPopupText = "";

  $: canEdit = editOk;
  $: stepSets = stepSetsModel;
  $: stepSetsBranch = stepSetsBranchModel;
  $: stepSetsBranchHeading = stepSetsBranchHeadingModel;
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
  function deleteSubStepBranch(stepSetsIndex, i_step, i_substep, subContent) {
    subContent.items.splice(i_substep, 1);
    stepSetsBranch[stepSetsIndex][i_step].subContent = subContent;
  }
  function addSubStep(stepSetsIndex, i_step) {
    stepSets[stepSetsIndex][i_step].subContent.items.push({
      text: "",
      subList: [],
      editable: true,
      deletable: true,
    });
    stepSets[stepSetsIndex][i_step].subContent.items =
      stepSets[stepSetsIndex][i_step].subContent.items;
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
      <div id="page-header-title">{model.page.title}</div>
    </div>
    <div id="page-header-sub-title">{model.page.subTitle}</div>
    <div class="first-index-print" style="top:0.5in">INDEX</div>
    <div class="index-print" style="top:3.62in">08</div>
  </div>

  <div id="page-body">
    <div id="page-body-starter">
      <div id="page-body-start-box">START</div>
      <!-- {stepSetsJson} -->
    </div>

    <div id="page-body-content">
      <div class="page-body-steps main-step-sets">
        <ol>
          {#each stepSets[0] as step, i_step}
            <li class="step-container">
              <!-- delete step -->
              {#if step.deletable && canEdit}
                <button class="delete" on:click={() => deleteStep(0, i_step)}
                  ><i
                    class="fa-solid fa-trash-can"
                    style="color: #808080;"
                  /></button
                >
              {/if}
              <!-- move step -->
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
              <!-- step content -->
              <div class="step-item" id="page-step-{step.id}">
                <div class="step-item-content">
                  <div al-html-item="pageStep.main" class="step-item-main">
                    {#if step.editable && canEdit}
                      <input bind:value={step.main} />
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
                  <!-- begin substep -->
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
                                          <!-- subsubstep content -->
                                          {@html subSubStep.text}
                                        {/if}
                                      </li>
                                    {/each}
                                  </ul>
                                </div>
                              {/if}
                            </li>
                          {/each}
                          <!-- add substep -->
                          {#if step.addable && canEdit}
                            <li>
                              <button on:click={() => addSubStep(0, i_step)}
                                >add substep</button
                              >
                              <!-- info icon -->
                              <span>
                                {#if step.addableInfo && canEdit}
                                  <button
                                    class="info"
                                    on:click={() =>
                                      toggleInfoPopup(step.addableInfo)}
                                  >
                                    <i
                                      class="fa-solid fa-circle-info"
                                      style="color: #808080;"
                                    />
                                  </button>
                                  {#if showInfoPopup && step.addableInfo === currentPopupText}
                                    <div class="infotext-container">
                                      <div class="infotext-content">
                                        <div style="font-weight: bold">
                                          {@html step.main}
                                        </div>
                                        <div>
                                          {step.addableInfo}
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
                              </span>
                            </li>
                          {/if}
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

      <div class="container-steps">
        <div class="page-body-steps step-column">
          <div class="step-sets-header">{@html stepSetsBranchHeading[0]}</div>
          <ol>
            {#each stepSetsBranch[0] as { main, editable, id, subContent }, i_step}
              <li class="step-container">
                <div class="step-item" id="page-step-{id}">
                  <div class="step-item-content">
                    <div al-html-item="pageStep.main" class="step-item-main">
                      {#if editable && canEdit}
                        <input bind:value={main} />
                      {:else}
                        {@html main}
                      {/if}
                    </div>
                    {#if subContent}
                      <div class="step-item-sub-content">
                        {#if subContent.contentType === "action-list"}
                          <ul class="step-actions-list">
                            {#each subContent.items as subContentItemtext, i}
                              <li>
                                {#if typeof subContentItemtext === "string" || subContentItemtext instanceof String}
                                  <div>{@html subContentItemtext}</div>
                                {/if}
                                {#if typeof subContentItemtext !== "string" || subContentItemtext instanceof Object}
                                  <div>
                                    <div>{@html subContentItemtext.text}</div>
                                    <ul>
                                      {#each subContentItemtext.subList as subListItem, i}
                                        <li>
                                          <div>{@html subListItem}</div>
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

        <div class="page-body-steps step-column">
          <div class="step-sets-header">{@html stepSetsBranchHeading[1]}</div>
          <ol>
            {#each stepSetsBranch[1] as { main, editable, id, subContent }, i_step}
              <li class="step-container">
                <div class="step-item second-column" id="page-step-{id}">
                  <div class="step-item-content">
                    <div al-html-item="pageStep.main" class="step-item-main">
                      {#if editable && canEdit}
                        <input bind:value={main} />
                      {:else}
                        {@html main}
                      {/if}
                    </div>
                    {#if subContent}
                      <div class="step-item-sub-content">
                        {#if subContent.contentType === "action-list"}
                          <ul class="step-actions-list">
                            {#each subContent.items as subContentItemtext, i_substep}
                              {#if (typeof subContentItemtext !== "string" || subContentItemtext instanceof Object) && "header" in subContentItemtext}
                                <div class="list-heading">
                                  {@html subContentItemtext.header}
                                </div>
                              {/if}
                              <li>
                                {#if typeof subContentItemtext === "string" || subContentItemtext instanceof String}
                                  <div>{@html subContentItemtext}</div>
                                {/if}
                                {#if typeof subContentItemtext !== "string" || subContentItemtext instanceof Object}
                                  <div>
                                    <div>
                                      <!-- substep delete -->
                                      {#if subContentItemtext.deletable && canEdit}
                                        <button
                                          class="delete"
                                          on:click={() =>
                                            deleteSubStepBranch(
                                              1,
                                              i_step,
                                              i_substep,
                                              subContent
                                            )}
                                          ><i
                                            class="fa-solid fa-trash-can"
                                            style="color: #808080;"
                                          /></button
                                        >
                                      {/if}
                                      {#if subContentItemtext.editable && canEdit}
                                        <input
                                          bind:value={subContentItemtext.text}
                                        />
                                      {:else}
                                        {@html subContentItemtext.text}
                                      {/if}
                                      <!-- info icon -->
                                      <span>
                                        {#if subContentItemtext.info && canEdit}
                                          <button
                                            class="info"
                                            on:click={() =>
                                              toggleInfoPopup(
                                                subContentItemtext.info
                                              )}
                                          >
                                            <i
                                              class="fa-solid fa-circle-info"
                                              style="color: #808080;"
                                            />
                                          </button>
                                          {#if showInfoPopup && subContentItemtext.info === currentPopupText}
                                            <div class="infotext-container">
                                              <div class="infotext-content">
                                                <div style="font-weight: bold">
                                                  {@html subContentItemtext.text}
                                                </div>
                                                <div>
                                                  {subContentItemtext.info}
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
                                      <!--  -->
                                    </div>
                                    <ul>
                                      {#each subContentItemtext.subList as subListItem, i_subsubstep}
                                        <li>
                                          <div>{@html subListItem}</div>
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

        <div class="page-body-steps step-column-last">
          <div class="step-sets-header">{@html stepSetsBranchHeading[2]}</div>
          <ol>
            {#each stepSetsBranch[2] as { main, editable, id, subContent }, i_step}
              <li class="step-container">
                <div class="step-item third-column" id="page-step-{id}">
                  <div class="step-item-content">
                    <div al-html-item="pageStep.main" class="step-item-main">
                      {#if editable && canEdit}
                        <input bind:value={main} />
                      {:else}
                        {@html main}
                      {/if}
                    </div>
                    {#if subContent}
                      <div class="step-item-sub-content">
                        {#if subContent.contentType === "action-list"}
                          <ul class="step-actions-list">
                            {#each subContent.items as subContentItemtext, i_substep}
                              {#if (typeof subContentItemtext !== "string" || subContentItemtext instanceof Object) && "header" in subContentItemtext}
                                <div class="list-heading">
                                  {@html subContentItemtext.header}
                                </div>
                              {/if}
                              <li>
                                {#if typeof subContentItemtext === "string" || subContentItemtext instanceof String}
                                  <div>{@html subContentItemtext}</div>
                                {/if}
                                {#if typeof subContentItemtext !== "string" || subContentItemtext instanceof Object}
                                  <div>
                                    <div>
                                      <!-- substep delete -->
                                      {#if subContentItemtext.deletable && canEdit}
                                        <button
                                          class="delete"
                                          on:click={() =>
                                            deleteSubStepBranch(
                                              2,
                                              i_step,
                                              i_substep,
                                              subContent
                                            )}
                                          ><i
                                            class="fa-solid fa-trash-can"
                                            style="color: #808080;"
                                          /></button
                                        >
                                      {/if}
                                      {#if subContentItemtext.editable && canEdit}
                                        <input
                                          bind:value={subContentItemtext.text}
                                        />
                                      {:else}
                                        {@html subContentItemtext.text}
                                      {/if}
                                      <!-- info icon -->
                                      <span>
                                        {#if subContentItemtext.info && canEdit}
                                          <button
                                            class="info"
                                            on:click={() =>
                                              toggleInfoPopup(
                                                subContentItemtext.info
                                              )}
                                          >
                                            <i
                                              class="fa-solid fa-circle-info"
                                              style="color: #808080;"
                                            />
                                          </button>
                                          {#if showInfoPopup && subContentItemtext.info === currentPopupText}
                                            <div class="infotext-container">
                                              <div class="infotext-content">
                                                <div style="font-weight: bold">
                                                  {@html subContentItemtext.text}
                                                </div>
                                                <div>
                                                  {subContentItemtext.info}
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
                                      <!--  -->
                                    </div>
                                    <ul>
                                      {#each subContentItemtext.subList as subListItem, i_subsubstep}
                                        <li>
                                          <div>{@html subListItem}</div>
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
      </div>

      <ReferenceSection
        referenceRightAlign="0"
        referenceName={fireExtinguisher}
        referenceColor="var(--green)"
        referenceHeight="0in"
        referenceWidth="3in"
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
  .list-heading {
    background-color: lightgrey;
    font-weight: 600;
    margin: 0.5rem 0 0.2rem -1rem;
  }
  .step-sets-header {
    border-bottom: solid;
    border-width: 0.1rem;
    width: 90%;
    min-height: 1.2rem;
  }
  .step-column {
    width: 3in;
    border-right: solid;
    border-width: 1px;
    padding: 1%;
    counter-reset: second-column 2;
    vertical-align: top;
  }
  .step-column-last {
    width: 3in;
    padding: 1%;
    counter-reset: third-column 2;
    vertical-align: top;
  }
  .main-step-sets {
    width: 100%;
  }
  .container-steps {
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .page-body-steps .step-item.second-column:before {
    counter-increment: second-column;
    content: counter(second-column);
  }
  .page-body-steps .step-item.third-column:before {
    counter-increment: third-column;
    content: counter(third-column);
  }
  .page-body-steps {
    margin: 0;
  }
  #editor-page {
    height: 80vh;
  }

  @media not print {
    @media (max-width: 1020px) {
      .step-column {
        width: 100%;
        border-right: none;
      }
      .step-column-last {
        width: 100%;
      }
    }
  }
</style>
