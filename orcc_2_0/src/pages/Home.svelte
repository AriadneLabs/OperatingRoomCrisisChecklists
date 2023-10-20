<script>
  import { onMount } from "svelte";

  let editOk = false;
  let imageUploaded = false;
  let editButtonLabel = "Add a logo";
  let logoAlignment = "justify-content: flex-start;";
  $: canEdit = editOk;

  function editChecklist() {
    editOk = !editOk;
    editButtonLabel =
      editButtonLabel === "Add a logo" ? "Done editing" : "Add a logo";
    if (editOk | imageUploaded) {
      logoAlignment = "justify-content: space-around;";
    } else {
      logoAlignment = "justify-content: flex-start;";
    }
  }
  function printPage() {
    window.print();
  }

  let logo, fileinput;

  console.log("ᕙ(⇀‸↼‶)ᕗ");

  const onFileSelected = (e) => {
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e) => {
      logo = e.target.result;
    };
    imageUploaded = true;
  };

  onMount(() => {});
</script>

<div id="top-buttons">
  <button class="edit-button" on:click={editChecklist}>
    <i class="fa-solid fa-pen-to-square" style="color: #ffffff;" />
    {editButtonLabel}
  </button>
  <button class="print-button" on:click={printPage} disabled={canEdit}>
    <i class="fa-solid fa-print" style="color: #ffffff;" />
    Print cover page
  </button>
  <a class="print-button" href="https://www.ariadnelabs.org/wp-content/uploads/2023/10/ORCC-package-10-23.pdf" target="_blank">
    <i class="fa-solid fa-download" style="color: #ffffff;" /> Download all</a
  >
</div>
<div class="home">
  <div class="title">
    <h1>Operating Room Crisis Checklists</h1>
    <h2>Management of Adult Emergencies</h2>
    <h3>October 2023</h3>
    <div class="resource-links">
      <p class="resources-header">Resources:</p>
      <ul>
        <li>
          <a
            href="https://www.ariadnelabs.org/wp-content/uploads/2023/10/Manual-for-ORCC.pdf"
            target="_blank">Manual for Standard and Customized OR Crisis Checklists</a
          >
          <p>
            How to access the various options for using the crisis checklists.
          </p>
        </li>
        <li>
          <a
            href="https://www.ariadnelabs.org/wp-content/uploads/2023/10/ORCC-Clinical-Guide.pdf"
            target="_blank">Guide to Clinical Use of Checklists</a
          >
          <p>
            Essential guidance for using checklists based on a decade of OR
            Crisis Checklist experience and expert guidance.
          </p>
        </li>
        <li>
          <a
            href="https://www.ariadnelabs.org/wp-content/uploads/2023/10/IT-Hosting-guide-for-ORCC.pdf"
            target="_blank">IT Guide to Self-Hosting Digital Checklists</a
          >
          <p>
            For IT professionals, guidance for self-hosting digital checklists
            at your organization.
          </p>
        </li>
      </ul>
    </div>
    <div class="attn">&gt;&gt; Do not remove book from this room &lt;&lt;</div>
  </div>
  <div class="navigation">
    <div class="nav-header">
      <div class="nav-name" style="color:white;">
        SUSPECTED EVENT <em>(alphabetical)</em>
      </div>
      <div class="first-index-display">INDEX</div>
    </div>
    <a href="/air_embolism" class="nav-item">
      <div class="nav-name">Air Embolism - Venous</div>
      <div class="index-display">01</div>
    </a>
    <a href="/anaphylaxis" class="nav-item">
      <div class="nav-name">Anaphylaxis</div>
      <div class="index-display">02</div>
    </a>
    <a href="/bradycardia" class="nav-item">
      <div class="nav-name">Bradycardia - Unstable</div>
      <div class="index-display">03</div>
    </a>
    <a href="/cardiac_arrest_pea_asystole" class="nav-item">
      <div class="nav-name">Cardiac Arrest - Asystole/PEA</div>
      <div class="index-display">04</div>
    </a>
    <a href="/cardiac_arrest_vf_vt" class="nav-item">
      <div class="nav-name">Cardiac Arrest - VF/VT</div>
      <div class="index-display">05</div>
    </a>
    <a href="/delayed_emergence" class="nav-item">
      <div class="nav-name">Delayed Emergence</div>
      <div class="index-display">06</div>
    </a>
    <a href="/failed_airway" class="nav-item">
      <div href="/failed_airway" class="nav-name">Failed Airway</div>
      <div class="index-display">07</div>
    </a>
    <a href="/fire" class="nav-item">
      <div class="nav-name">Fire</div>
      <div class="index-display">08</div>
    </a>
    <a href="/hemorrhage" class="nav-item">
      <div class="nav-name">Hemorrhage</div>
      <div class="index-display">09</div>
    </a>
    <a href="/hypotension" class="nav-item">
      <div class="nav-name">Hypotension</div>
      <div class="index-display">10</div>
    </a>
    <a href="/hypoxia" class="nav-item">
      <div class="nav-name">Hypoxia</div>
      <div class="index-display">11</div>
    </a>
    <a href="/last" class="nav-item">
      <div class="nav-name">Local Anesthetic Systemic Toxicity (LAST)</div>
      <div class="index-display">12</div>
    </a>
    <a href="/malignant_hyperthermia" class="nav-item">
      <div class="nav-name">Malignant Hyperthermia</div>
      <div class="index-display">13</div>
    </a>
    <a href="/myocardial_ischemia" class="nav-item">
      <div class="nav-name">Myocardial Ischemia</div>
      <div class="index-display">14</div>
    </a>
    <a href="/ob_hemorrhage" class="nav-item">
      <div class="nav-name">OB Hemorrhage</div>
      <div class="index-display">15</div>
    </a>
    <a href="/tachycardia" class="nav-item">
      <div class="nav-name">Tachycardia - Unstable</div>
      <div class="index-display">16</div>
    </a>
    <a href="/transfusion_reaction" class="nav-item">
      <div class="nav-name">Transfusion Reaction</div>
      <div class="index-display">17</div>
    </a>
    <div class="first-index-print" style="top:0.5in">INDEX</div>
    <div class="index-print" style="top:0.9in">01</div>
    <div class="index-print" style="top:1.28in">02</div>
    <div class="index-print" style="top:1.68in">03</div>
    <div class="index-print" style="top:2.08in">04</div>
    <div class="index-print" style="top:2.46in">05</div>
    <div class="index-print" style="top:2.84in">06</div>
    <div class="index-print" style="top:3.24in">07</div>
    <div class="index-print" style="top:3.62in">08</div>
    <div class="index-print" style="top:4.02in">09</div>
    <div class="index-print" style="top:4.42in">10</div>
    <div class="index-print" style="top:4.82in">11</div>
    <div class="index-print" style="top:5.22in">12</div>
    <div class="index-print" style="top:5.6in">13</div>
    <div class="index-print" style="top:6in">14</div>
    <div class="index-print" style="top:6.38in">15</div>
    <div class="index-print" style="top:6.76in">16</div>
    <div class="index-print" style="top:7.14in">17</div>
  </div>
  <div class="attribution">
    <div class="logo-section" style={logoAlignment}>
      <img
        class="al-logo"
        src="../../build/images/AL-ParentLockup-horiz_RGB.png"
        alt="Ariande Labs logo"
      />
      {#if canEdit}
        <div class="logo-box">
          {#if logo}
            <img class="other-logo" src={logo} alt="Sub-organization logo" />
          {:else}
            <span class="other-logo">No image selected</span>
          {/if}
          <button
            class="upload-logo"
            on:click={() => {
              fileinput.click();
            }}
          >
            Upload new logo
          </button>
          <input
            style="display:none"
            type="file"
            accept=".jpg, .jpeg, .png"
            on:change={(e) => onFileSelected(e)}
            bind:this={fileinput}
          />
        </div>
      {:else if logo}
        <img class="other-logo" src={logo} alt="Sub-organization logo" />
      {/if}
    </div>
    <p style="padding: 10px 0px;">
      All reasonable precautions have been taken to verify the information
      contained in this publication. The responsibility for the interpretation
      and use of the materials lies with the reader.
    </p>
    <div class="col-sm-9" style="display:inline-block">
      <img
        id="cc-license-image"
        src="../../build/images/by-nc-sa.svg"
        alt="creative commons license"
        style="width:20%;"
      />
      <div id="cc-license-text" class="bottom-text">
        &copy; 2013-2023 Ariadne Labs: A Joint Center for Health Systems
        Innovation. Licensed under a <a
          href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
          rel="license"
          target="_blank"
          >Creative Commons Attribution-NonCommercial-ShareAlike 4.0
          International License</a
        >.
      </div>
    </div>
    <!-- <div class="bottom-text col-sm-2">Revised Sept. 2023 (230718.1)</div> -->
  </div>
</div>

<style>
  .title {
    display: inline-block;
    width: 55%;
    padding: 2rem;
    vertical-align: top;
  }
  .navigation {
    display: inline-block;
    width: 33%;
    margin-top: 2em;
    margin-left: 4em;
    margin-bottom: 2em;
  }
  .nav-item {
    display: inline-block;
    background-color: lightgray;
    width: 100%;
    border-bottom: 1px solid white;
    padding: 0.65em;
    position: relative;
  }
  .nav-name {
    display: inline;
    padding: 0.5em;
    font-size: small;
  }
  .nav-header {
    background-color: gray;
    border-bottom: 1px solid white;
    width: 100%;
    padding: 0.65em;
    position: relative;
  }

  .nav-header .nav-name {
    display: block;
  }

  h1 {
    font-size: 4rem;
    font-weight: 600;
    margin-top: 2rem;
  }
  h2 {
    color: gray;
    font-weight: 400;
  }
  h3 {
    color: var(--yellow);
    font-size: medium;
    font-weight: 400;
  }
  p {
    font-size: x-small;
    margin: 0.1rem;
  }
  .bottom-text {
    display: inline-block;
    font-size: x-small;
  }
  .attribution {
    width: 55%;
    position: absolute;
    top: 40rem;
    left: 2rem;
    line-height: 1.5;
  }

  .logo-section {
    display: flex;
  }

  .logo-box {
    border: dashed;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    margin: 10px;
    max-width: 250px;
  }

  .nav-item:hover {
    background-color: gray;
    color: white;
  }

  .resources-header {
    font-size: large;
    font-weight: bold;
    padding-bottom: 0.5rem;
    padding-top: 1rem;
  }

  .resource-links ul {
    padding-left: 1rem;
    font-size: medium;
    list-style-type: square;
  }

  .resource-links li {
    padding-bottom: 0.7rem;
  }

  .resource-links a {
    color: #105878;
  }

  .resource-links li p {
    font-size: 13px;
  }

  .resource-links a:hover {
    text-decoration: underline;
  }

  #cc-license-text {
    width: 70%;
    font-size: 0.5rem;
    margin-bottom: 0;
    vertical-align: bottom;
  }

  *,
  ::after,
  ::before {
    box-sizing: border-box;
  }

  @media not print {
    .attn {
      display: none;
    }
  }
  @media print {
    .attn {
      color: var(--orange);
      width: 80%;
      font-size: large;
      font-weight: 400;
      padding: 0.4em;
      border-bottom: 0.1em solid black;
      border-top: 0.1em solid black;
      margin-top: 3rem;
      margin-bottom: 10rem;
    }
  }
  a {
    color: rgb(66, 66, 66);
    text-decoration: none;
  }
  a.print-button {
    color: white;
  }
  .al-logo {
    width: 50%;
    max-width: 250px;
    display: inline-block;
  }
  .other-logo {
    max-width: 45%;
    max-height: 115px;
    padding-left: 2rem;
    display: inline-block;
  }
  .upload-logo {
    display: inline-block;
  }

  @media print {
    .index-display {
      display: none;
    }
    .first-index-display {
      display: none;
    }
  }
  @media not print {
    .index-display {
      color: gray;
      font-weight: bold;
      position: absolute;
      right: -2.7rem;
      top: 0.6rem;
    }
    .first-index-display {
      color: gray;
      font-weight: bold;
      position: absolute;
      font-size: x-small;
      top: 1.1rem;
      right: -3rem;
    }
  }

  @media not print {
    @media (max-width: 1020px) {
      .title {
        width: 44%;
        padding: 1rem;
      }
      .navigation {
        width: 40%;
      }
    }
  }

  @media not print {
    @media (max-width: 760px) {
      .index-display {
        right: 1rem;
      }
      .first-index-display {
        right: 0.7rem;
        color: white;
      }
      .title {
        width: 100%;
        padding: 1rem;
      }
      .navigation {
        width: 100%;
        margin: 0;
      }
    }
  }

  /* print */
  @media print {
    .home {
      background-color: white;
      height: 8.5in;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      margin: 0;
      padding: 0%;
    }

    .attribution {
      left: 0in;
      top: 5.3in;
    }

    .other-logo {
      max-height: 95px;
    }

    .resource-links {
      display: none;
    }
  }

  @media screen and (max-width: 1020px) {
    .attribution {
      position: static;
      width: 90%;
      padding: 2rem;
    }
  }

  @media screen and (max-width: 760px) {
    .al-logo {
      display: block;
      margin-left: auto;
      margin-right: auto;
      width: 50%;
    }

    .nav-item:hover .index-display {
      color: white;
    }

    h1 {
      font-size: 5.5vw;
      margin-top: 0;
    }

    h2 {
      font-size: 4.5vw;
    }

    h3 {
      font-size: 3vw;
    }

    #top-buttons,
    .resource-links {
      display: none;
    }

    .navigation {
      margin-top: 0;
    }

    .attribution {
      width: 100%;
      padding: 2rem 1rem;
      text-align: center;
    }

    .attribution p,
    .attribution div {
      font-size: 12px;
    }

    #cc-license-image {
      display: none;
    }

    .bottom-text {
      font-size: 12px;
      width: 100%;
    }

    #cc-license-text {
      width: 100%;
      font-size: 12px;
      padding: 10px 0;
    }
  }

  @supports (-moz-appearance: none) {
    .nav-header {
      padding: 0.61em;
    }
    .nav-item {
      padding: 0.61em;
    }
  }
</style>
