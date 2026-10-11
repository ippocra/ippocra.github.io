---
layout: landing_page
lang: en
permalink: /ippo/emergency-checklist
nav_type: ippo
title: "Emergency medical documents checklist for the ER"
description: "Free downloadable checklist with all the medical information to bring to the emergency room: allergies, current medications, blood type, diagnoses, contacts. Build your list in 2 minutes."
keywords: "emergency room checklist, ER medical documents, medication allergy list, emergency health card, what to bring to the ER"
---

<div class="page__inner-wrap" style="max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem 4rem;">

  <h1>Emergency medical documents checklist for the ER</h1>

  <p style="font-size: 1.1rem; color: #444;">
    When the unexpected happens, every minute counts. This checklist helps you prepare
    in <strong>2 minutes</strong> the list of essential medical data to show hospital
    staff in an emergency.
  </p>

  <p style="color: #666; font-size: 0.95rem;">
    Fill in the fields, then <strong>download the PDF</strong> and keep it with you
    (wallet, handbag, car glovebox). Update it whenever your doctor or medication changes.
  </p>

  <form id="checklist-form" action="#" onsubmit="return false;" style="margin-top: 1.5rem;">

    <h2>Personal data</h2>
    <div class="form-row">
      <label for="nome">Full name</label>
      <input type="text" id="nome" name="nome" placeholder="John Smith" required>
    </div>
    <div class="form-row">
      <label for="nascita">Date of birth</label>
      <input type="date" id="nascita" name="nascita">
    </div>
    <div class="form-row">
      <label for="codice-fiscale">National ID / Tax code</label>
      <input type="text" id="codice-fiscale" name="codice-fiscale" placeholder="—">
    </div>
    <div class="form-row">
      <label for="gruppo-sanguigno">Blood type</label>
      <select id="gruppo-sanguigno" name="gruppo-sanguigno">
        <option value="">— select —</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>AB+</option><option>AB-</option>
        <option>O+</option><option>O-</option>
        <option value="sconosciuto">I don't know</option>
      </select>
    </div>
    <div class="form-row">
      <label for="allergie">Allergies (food, drugs, other)</label>
      <textarea id="allergie" name="allergie" rows="2" placeholder="E.g. penicillin, peanuts, latex…"></textarea>
    </div>
    <div class="form-row">
      <label for="farmaci">Current medications</label>
      <textarea id="farmaci" name="farmaci" rows="3" placeholder="E.g. omeprazole 20mg morning, metformin 500mg…"></textarea>
    </div>
    <div class="form-row">
      <label for="patologie">Chronic conditions / past surgeries</label>
      <textarea id="patologie" name="patologie" rows="2" placeholder="E.g. type 2 diabetes, hypertension, heart surgery…"></textarea>
    </div>

    <h2>Contacts</h2>
    <div class="form-row">
      <label for="medico">Primary care physician</label>
      <input type="text" id="medico" name="medico" placeholder="Dr. Smith — +1 555 123456">
    </div>
    <div class="form-row">
      <label for="contatto">Emergency contact</label>
      <input type="text" id="contatto" name="contatto" placeholder="Name and phone">
    </div>
    <div class="form-row">
      <label for="assicurazione">Insurance / Health plan</label>
      <input type="text" id="assicurazione" name="assicurazione" placeholder="E.g. NHS / private insurance">
    </div>

    <div id="preview" class="preview" style="display: none; margin-top: 2rem;">
      <h2>Preview</h2>
      <div id="preview-content" class="preview-content"></div>
    </div>

    <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
      <button type="button" id="btn-generate" class="btn btn--primary">Generate PDF</button>
      <a id="btn-download" href="#" download="emergency-checklist.pdf" class="btn btn--inverse" style="display: none;">Download PDF</a>
    </div>

    <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #777;">
      The PDF is generated entirely in your browser: your data is never sent to any server.
    </p>
  </form>

  <h2 style="margin-top: 3rem;">How to use the checklist</h2>
  <ol>
    <li><strong>Fill in the fields</strong> with your real data (name, allergies, medications, contacts).</li>
    <li><strong>Click "Generate PDF"</strong> to see the preview.</li>
    <li><strong>Download the PDF</strong> and save it on your phone, in the cloud and on a USB drive.</li>
    <li><strong>Print a copy</strong> and keep it in your wallet, car glovebox and at home.</li>
    <li><strong>Update</strong> it whenever you change medication, doctor or diagnosis.</li>
  </ol>

  <div class="cta-box" style="margin-top: 3rem; padding: 2rem; background: #f0f7f4; border-radius: 12px; text-align: center;">
    <h2 style="margin-top: 0;">Your medical reports are scattered across apps, emails and folders?</h2>
    <p style="max-width: 500px; margin: 0.75rem auto 1.5rem;">
      With <strong>Ippo</strong> you gather all your family's health documents
      — lab results, prescriptions, certificates — in one secure place and share them
      with your doctor in a single tap.
    </p>
    <a href="https://app.ippocra.com/register" class="btn btn--primary">Try Ippo free</a>
  </div>

  <h2 style="margin-top: 3rem;">Frequently asked questions</h2>

  <details>
    <summary>Who can use this checklist?</summary>
    <p>
      Everyone: adults, seniors, parents with minor children. For children, add
      allergies, pediatric medications and parent contacts.
    </p>
  </details>

  <details>
    <summary>Should I also bring paper reports?</summary>
    <p>
      If possible, yes. The checklist is the index: it tells you <em>what</em> to bring.
      In an emergency, doctors will appreciate having recent lab results, X-rays
      and medical records at hand.
    </p>
  </details>

  <details>
    <summary>Is the data I fill in stored somewhere?</summary>
    <p>
      No. The PDF is generated entirely in your browser with JavaScript:
      no data is sent to any server. Once downloaded, the file is only yours.
    </p>
  </details>

  <details>
    <summary>How often should I update the checklist?</summary>
    <p>
      Whenever you change doctor, add or stop a medication, discover an allergy
      or receive a new diagnosis. Do a full review once a year.
    </p>
  </details>

</div>

<link rel="stylesheet" href="/assets/css/checklist-emergenza.css">
<script src="/assets/js/checklist-emergenza.js" defer></script>
