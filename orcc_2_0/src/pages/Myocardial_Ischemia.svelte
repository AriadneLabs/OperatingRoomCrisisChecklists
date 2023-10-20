<script>
    import { onMount, onDestroy } from "svelte";
    import { model } from "../models/myocardial_ischemia.js";
    import ReferenceSection from "../components/reference_section.svelte";

    let stepSetsJson = JSON.stringify(model.stepSets[0]);
    let stepSetsModel = model.stepSets;
    let drugDoses = model.references["drug-doses"];
    let criticalChanges = model.references["critical-changes"];
    let differentialDiagnosis = model.references["differential-diagnosis"];
    let editOk = false;
    let editButtonLabel = "Edit";
    let infoPopup = false;
    let currentPopupText = "";
    let ddTop = "2.79in";
    let ccTop = "4.02in";

    $: canEdit = editOk;
    $: stepSets = stepSetsModel;
    $: showInfoPopup = infoPopup;

    function editChecklist() {
        editOk = !editOk;
        editButtonLabel = editButtonLabel === "Edit" ? "Done editing" : "Edit";
        if (editButtonLabel === "Edit") {
            let offsetH = document.querySelector(
                "#drug-doses"
            ).offsetHeight;
            if (offsetH >= 140) {
                offsetH = offsetH - 36;
            } else {
                offsetH = offsetH - 47;
            }
            ddTop = (offsetH / 96 +0.2).toString() + "in"; // "2.6in";
            ccTop = (offsetH / 96 + 1.43).toString() + "in";
        } else {
            ddTop = "3.1in";
            ccTop = "4.3in";
        }
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
    function deleteStep(index, stepMain, stepSetsIndex) {
        console.log("delete step" + index + ": " + stepMain);
        stepSets[stepSetsIndex].splice(index, 1);
        stepSets = stepSets;
    }
    function deleteStepSetSubContentItem(
        index,
        step,
        steps,
        stepSetsIndex,
        stepsSubContentItems,
        stepIndex
    ) {
        console.log("delete #" + index + " of " + stepsSubContentItems.length);
        stepsSubContentItems.splice(index, 1);
        stepSets[stepSetsIndex] = steps;
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
        <div class="index-print" style="top:6in">14</div>
    </div>

    <div id="page-body">
        <div id="page-body-starter">
            <div id="page-body-start-box">START</div>
            <!-- {stepSetsJson} -->
        </div>

        <div id="page-body-content">
            <div class="page-body-steps">
                <ol>
                    {#each stepSets[0] as step, i}
                        <li class="step-container">
                            {#if step.movable && canEdit}
                                <div class="main-step-mover">
                                    <button
                                        class="move-up"
                                        on:click={() =>
                                            moveStepUp(i, step, stepSets[0], 0)}
                                    />
                                    <button
                                        class="move-down"
                                        on:click={() =>
                                            moveStepDown(
                                                i,
                                                step,
                                                stepSets[0],
                                                0
                                            )}
                                    />
                                </div>
                            {/if}
                            {#if step.deletable && canEdit}
                                <div class="main-step-mover">
                                    <button
                                        class="delete"
                                        on:click={() =>
                                            deleteStep(i, step.main, 0)}
                                        ><i
                                            class="fa-solid fa-trash-can"
                                        /></button
                                    >
                                </div>
                            {/if}
                            <div class="step-item" id="page-step-{step.id}">
                                <div class="step-item-content">
                                    <!-- begin main step-->
                                    <div
                                        al-html-item="pageStep.main"
                                        class="step-item-main"
                                    >
                                        {#if step.editable && canEdit}
                                            <input
                                                class="edit-box"
                                                bind:value={step.main}
                                            />
                                            <!-- begin info icon -->
                                            {#if step.info}
                                                <button
                                                    class="info"
                                                    on:click={() =>
                                                        toggleInfoPopup(
                                                            step.info
                                                        )}
                                                >
                                                    <i
                                                        class="fa-solid fa-circle-info noprint"
                                                        style="color: #808080;"
                                                    />
                                                </button>
                                                {#if showInfoPopup && currentPopupText === step.info}
                                                    <div
                                                        class="infotext-container"
                                                    >
                                                        <div
                                                            class="infotext-content"
                                                        >
                                                            <div
                                                                style="font-weight: bold"
                                                            >
                                                                {step.main}
                                                            </div>
                                                            <div>
                                                                {step.info}
                                                            </div>
                                                            <div
                                                                style="text-align: right;"
                                                            >
                                                                <button
                                                                    class="info-done"
                                                                    on:click={() =>
                                                                        toggleInfoPopup(
                                                                            ""
                                                                        )}
                                                                    >done</button
                                                                >
                                                            </div>
                                                        </div>
                                                    </div>
                                                {/if}
                                            {/if}
                                            <!-- end info icon -->
                                        {:else}
                                            {@html step.main}
                                        {/if}
                                    </div>
                                    <!-- end main step -->
                                    {#if step.subContent}
                                        <div class="step-item-sub-content">
                                            {#if step.subContent.contentType === "action-list"}
                                                <ul class="step-actions-list">
                                                    {#each step.subContent.items as subContentItemtext, i_sub}
                                                        <li>
                                                            <!-- begin delete icon -->
                                                            {#if subContentItemtext.deletable && canEdit}
                                                                <div
                                                                    class="main-step-mover"
                                                                >
                                                                    <button
                                                                        class="delete"
                                                                        on:click={() =>
                                                                            deleteStepSetSubContentItem(
                                                                                i_sub,
                                                                                subContentItemtext,
                                                                                stepSets[0],
                                                                                0,
                                                                                step
                                                                                    .subContent
                                                                                    .items,
                                                                                i
                                                                            )}
                                                                        ><i
                                                                            class="fa-solid fa-trash-can"
                                                                        /></button
                                                                    >
                                                                </div>
                                                            {/if}
                                                            <!-- end delete icon -->
                                                            {#if typeof subContentItemtext === "string" || subContentItemtext instanceof String}
                                                                <div>
                                                                    {@html subContentItemtext}
                                                                </div>
                                                            {/if}
                                                            {#if typeof subContentItemtext !== "string" || subContentItemtext instanceof Object}
                                                                <div>
                                                                    {#if subContentItemtext.editable && canEdit}
                                                                        <input
                                                                            class="edit-box"
                                                                            bind:value={subContentItemtext.text}
                                                                        />
                                                                        <!-- begin info icon -->
                                                                        <span>
                                                                            {#if subContentItemtext.info}
                                                                                <button
                                                                                    class="info"
                                                                                    on:click={() =>
                                                                                        toggleInfoPopup(
                                                                                            subContentItemtext.info
                                                                                        )}
                                                                                >
                                                                                    <i
                                                                                        class="fa-solid fa-circle-info noprint"
                                                                                        style="color: #808080;"
                                                                                    />
                                                                                </button>
                                                                                {#if showInfoPopup && subContentItemtext.info === currentPopupText}
                                                                                    <div
                                                                                        class="infotext-container"
                                                                                    >
                                                                                        <div
                                                                                            class="infotext-content"
                                                                                        >
                                                                                            <div
                                                                                                style="font-weight: bold"
                                                                                            >
                                                                                                {subContentItemtext.text}
                                                                                            </div>
                                                                                            <div
                                                                                            >
                                                                                                {subContentItemtext.info}
                                                                                            </div>
                                                                                            <div
                                                                                                style="text-align: right;"
                                                                                            >
                                                                                                <button
                                                                                                    class="info-done"
                                                                                                    on:click={() =>
                                                                                                        toggleInfoPopup(
                                                                                                            ""
                                                                                                        )}
                                                                                                    >done</button
                                                                                                >
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                {/if}
                                                                            {/if}
                                                                        </span>
                                                                        <!-- end info icon -->
                                                                    {:else}
                                                                        <div>
                                                                            {@html subContentItemtext.text}
                                                                        </div>
                                                                    {/if}
                                                                    <ul>
                                                                        {#each subContentItemtext.subList as subListItem, i}
                                                                            <li>
                                                                                <div
                                                                                >
                                                                                    {@html subListItem}
                                                                                </div>
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
            <!-- <div class="page-body-steps">
          <ol>
            {#each stepSets[1] as { main, editable, id, subContent }, i}
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
        </div> -->

            <ReferenceSection referenceRightAlign="0"
                referenceName={drugDoses}
                referenceColor="var(--blue)"
                referenceHeight="0"
                referenceWidth="3.5in"
                {canEdit}
            />

            <ReferenceSection referenceRightAlign="0"
                referenceName={differentialDiagnosis}
                referenceColor="var(--purple)"
                referenceHeight={ddTop}
                referenceWidth="3.5in"
            />

            <ReferenceSection referenceRightAlign="0"
                referenceName={criticalChanges}
                referenceColor="var(--orange)"
                referenceHeight={ccTop}
                referenceWidth="3.5in"
            />
        </div>
        <footer>
            <span
                >All reasonable precautions have been taken to verify the
                information contained in this publication. The responsibility
                for the interpretation and use of the materials lies with the
                reader.</span
            >
            <span style="color:var(--orange);font-weight:bold"
                >October 2023</span
            >
        </footer>
    </div>
</div>

<style>
    .page-body-steps {
        width: 6in;
    }
</style>
