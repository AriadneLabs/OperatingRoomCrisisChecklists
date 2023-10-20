<script>
  import { onMount } from "svelte";
  import { model } from "../models/failed_airway.js";
  import ReferenceSection from "../components/reference_section.svelte";

  let stepSetsModel = model.stepSets;
  let infoTable = model.infoTable;
  let drugDoses = model.references["drug-doses"];
  let intubationTechniques = model.references["intubation-techniques"];

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
  function addBullet(side, i_substep) {
    infoTable[side].subContent.items[i_substep].subList.push({
      text: "",
      deletable: true,
      editable: true,
    });
    infoTable[side] = infoTable[side];
  }
  function deleteBullet(side, i_substep, i_subsubstep) {
    infoTable[side].subContent.items[i_substep].subList.splice(i_subsubstep, 1);
    infoTable[side] = infoTable[side];
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
    <div class="index-print" style="top:3.24in">07</div>
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

      <!-- begin table -->
      <div class="infotable-container">
        <div class="infotable-separator">
          <span class="arrow flip">&#10549;</span>
          <span style="border:1px solid red;padding:0.3em 0.5em"
            >{infoTable.separator}</span
          >
          <span class="arrow">&#10549;</span>
        </div>

        <div class="infotable-column infotable-first-margin">
          <div class="infotable-header">{@html infoTable["left"].header}</div>
          <div class="step-item-content step-item-sub-content">
            <ul class="step-actions-list">
              {#each infoTable["left"].subContent.items as subStep, i_substep}
                <li>
                  <!-- substep content -->
                  {#if typeof subStep === "string" || subStep instanceof String}
                    <div>
                      {@html subStep}
                    </div>
                  {:else if typeof subStep !== "string" || subStep instanceof Object}
                    <div>
                      {#if subStep.editable && canEdit}
                        <input class="edit-box" bind:value={subStep.text} />
                      {:else}
                        {@html subStep.text}
                      {/if}
                      <!-- info icon -->
                      <span>
                        {#if subStep.info && canEdit}
                          <button
                            class="info"
                            on:click={() => toggleInfoPopup(subStep.info)}
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
                                  on:click={() => toggleInfoPopup("")}
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
                                  class="bullet-delete"
                                  on:click={() =>
                                    deleteBullet(
                                      "left",
                                      i_substep,
                                      i_subsubstep
                                    )}
                                  ><i
                                    class="fa-solid fa-trash-can"
                                    style="color: #808080;"
                                  /></button
                                >
                              {/if}
                              <!-- subsubstep content -->
                              {#if subSubStep.editable && canEdit}
                                <input
                                  class="edit-box"
                                  bind:value={subSubStep.text}
                                />
                              {:else}
                                {@html subSubStep.text}
                              {/if}
                              <!-- info icon -->
                              <span>
                                {#if subSubStep.info && canEdit}
                                  <button
                                    class="bullet-info"
                                    on:click={() =>
                                      toggleInfoPopup(subSubStep.info)}
                                  >
                                    <i
                                      class="fa-solid fa-circle-info"
                                      style="color: #808080;"
                                    />
                                  </button>
                                  {#if showInfoPopup && subSubStep.info === currentPopupText}
                                    <div class="infotext-container">
                                      <div class="infotext-content">
                                        <div style="font-weight: bold">
                                          {@html subSubStep.text}
                                        </div>
                                        <div>
                                          {subSubStep.info}
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
                            {/if}
                          </li>
                        {/each}
                        <!-- add subsubstep -->
                        {#if subStep.addable && canEdit}
                          <li>
                            <button
                              on:click={() => addBullet("left", i_substep)}
                              >add bullet</button
                            >
                            <!-- info icon -->
                            <span>
                              {#if subStep.addableInfo && canEdit}
                                <button
                                  class="bullet-info"
                                  on:click={() =>
                                    toggleInfoPopup(subStep.addableInfo)}
                                >
                                  <i
                                    class="fa-solid fa-circle-info"
                                    style="color: #808080;"
                                  />
                                </button>
                                {#if showInfoPopup && subStep.addableInfo === currentPopupText}
                                  <div class="infotext-container">
                                    <div class="infotext-content">
                                      <div style="font-weight: bold">
                                        {@html subStep.text}
                                      </div>
                                      <div>
                                        {subStep.addableInfo}
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
                    </div>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        </div>

        <!-- <div class="infotable-separator">{infoTable.separator}</div> -->

        <div class="infotable-column">
          <div class="infotable-header">{@html infoTable["right"].header}</div>
          <div class="step-item-content step-item-sub-content">
            <ul class="step-actions-list">
              {#each infoTable["right"].subContent.items as subStep, i_substep}
                <li>
                  <!-- substep content -->
                  {#if typeof subStep === "string" || subStep instanceof String}
                    <div>
                      {@html subStep}
                    </div>
                  {:else if typeof subStep !== "string" || subStep instanceof Object}
                    <div>
                      {#if subStep.editable && canEdit}
                        <input class="edit-box" bind:value={subStep.text} />
                      {:else}
                        {@html subStep.text}
                      {/if}
                      <!-- info icon -->
                      <span>
                        {#if subStep.info && canEdit}
                          <button
                            class="info"
                            on:click={() => toggleInfoPopup(subStep.info)}
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
                                  on:click={() => toggleInfoPopup("")}
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
                              <!-- info icon -->
                              <span>
                                {#if subSubStep.info && canEdit}
                                  <button
                                    class="info"
                                    on:click={() =>
                                      toggleInfoPopup(subSubStep.info)}
                                  >
                                    <i
                                      class="fa-solid fa-circle-info"
                                      style="color: #808080;"
                                    />
                                  </button>
                                  {#if showInfoPopup && subSubStep.info === currentPopupText}
                                    <div class="infotext-container">
                                      <div class="infotext-content">
                                        <div style="font-weight: bold">
                                          {@html subSubStep.text}
                                        </div>
                                        <div>
                                          {subSubStep.info}
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
                            {/if}
                          </li>
                        {/each}
                        <!-- add subsubstep -->
                      </ul>
                    </div>
                  {/if}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      </div>

      <!-- insert reference info here -->
      <ReferenceSection referenceRightAlign="0"
        referenceName={drugDoses}
        referenceColor="var(--blue)"
        referenceHeight="0"
        referenceWidth="3.5in"
      />

      <ReferenceSection referenceRightAlign="0"
        referenceName={intubationTechniques}
        referenceColor="var(--green)"
        referenceHeight="1.6in"
        referenceWidth="3.5in"
        {canEdit}
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
    max-width: 6in;
  }

  .flip {
    transform: scale(-1, 1);
    -moz-transform: scale(-1, 1);
    -webkit-transform: scale(-1, 1);
    -o-transform: scale(-1, 1);
    -ms-transform: scale(-1, 1);
    display: inline-block;
  }

  .arrow {
    top: 0.3rem;
    position: relative;
    padding: 0.1em;
  }

  .infotable-container {
    display: inline-block;
    max-width: 6in;
  }

  .infotable-column {
    display: inline-block;
    width: 40%;
    vertical-align: top;
  }
  .infotable-first-margin {
    margin-right: 19%;
  }
  @media (max-width: 760px) {
    .infotable-first-margin {
      margin-right: 8%;
    }
    .infotable-column {
      width: 45%;
    }
  }

  .infotable-separator {
    display: block;
    width: 75%;
    font-size: 0.8em;
    margin: auto;
    text-align: center;
    padding-bottom: 1em;
    color: red;
  }

  @media (max-width: 575px) {
    .infotable-separator {
      font-size: 0.6em;
    }
  }

  .infotable-header {
    border-bottom: solid;
    border-width: 0.1rem;
    width: 90%;
    min-height: 1.2rem;
  }

  button.bullet-delete {
    position: relative;
    top: -6px;
    left: -40px;
    border: none;
    background: none;
  }

  button.bullet-info {
    font-size: small;
    border: none;
    background: none;
  }
</style>
