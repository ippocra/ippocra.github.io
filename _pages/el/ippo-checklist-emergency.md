---
layout: landing_page
lang: el
permalink: /ippo/checklist-emergency
nav_type: ippo
title: "Checklist ιατρικών εγγράφων για το ΕΣΥ"
description: "Δωρεάν checklist με όλα τα ιατρικά δεδομένα που πρέπει να έχετε μαζί σας στο επείγον: αλλεργίες, τρέχοντα φάρμακα, ομάδα αίματος, διαγνώσεις, επαφές. Δημιουργήστε τη λίστα σε 2 λεπτά."
keywords: "checklist επείγον, ιατρικά έγγραφα έκτακτης ανάγκης, λίστα φαρμάκων αλλεργιών, κάρτα υγείας, τι να πάρω στο ΕΣΥ"
---

<div class="page__inner-wrap" style="max-width: 780px; margin: 0 auto; padding: 2rem 1.5rem 4rem;">

  <h1>Checklist ιατρικών εγγράφων για το ΕΣΥ</h1>

  <p style="font-size: 1.1rem; color: #444;">
    Όταν συμβεί το απρόβλεπτο, κάθε λεπτό μετράει. Αυτή η checklist σας βοηθάει να
    ετοιμάσετε σε <strong>2 λεπτά</strong> τη λίστα με τα απαραίτητα ιατρικά δεδομένα
    για το προσωπικό του ΕΣΥ.
  </p>

  <p style="color: #666; font-size: 0.95rem;">
    Συμπληρώστε τα πεδία, μετά <strong>κατεβάστε το PDF</strong> και φέρτε το μαζί σας
    (πορτοφόλι, τσάντα, γάντι αυτοκινήτου). Ενημερώστε το κάθε φορά που αλλάζετε
    γιατρό ή φάρμακο.
  </p>

  <form id="checklist-form" action="#" onsubmit="return false;" style="margin-top: 1.5rem;">

    <h2>Προσωπικά δεδομένα</h2>
    <div class="form-row">
      <label for="nome">Ονοματεπώνυμο</label>
      <input type="text" id="nome" name="nome" placeholder="Γιάννης Παπαδόπουλος" required>
    </div>
    <div class="form-row">
      <label for="nascita">Ημερομηνία γέννησης</label>
      <input type="date" id="nascita" name="nascita">
    </div>
    <div class="form-row">
      <label for="codice-fiscale">ΑΦΜ</label>
      <input type="text" id="codice-fiscale" name="codice-fiscale" placeholder="—">
    </div>
    <div class="form-row">
      <label for="gruppo-sanguigno">Ομάδα αίματος</label>
      <select id="gruppo-sanguigno" name="gruppo-sanguigno">
        <option value="">— επιλογή —</option>
        <option>A+</option><option>A-</option>
        <option>B+</option><option>B-</option>
        <option>AB+</option><option>AB-</option>
        <option>O+</option><option>O-</option>
        <option value="sconosciuto">Δεν ξέρω</option>
      </select>
    </div>
    <div class="form-row">
      <label for="allergie">Αλλεργίες (τροφή, φάρμακα, άλλες)</label>
      <textarea id="allergie" name="allergie" rows="2" placeholder="Π.χ. πενικιλλίνη, καρύδια, λάτιξ…"></textarea>
    </div>
    <div class="form-row">
      <label for="farmaci">Τρέχοντα φάρμακα</label>
      <textarea id="farmaci" name="farmaci" rows="3" placeholder="Π.χ. ομεπραζόλη 20mg πρωί…"></textarea>
    </div>
    <div class="form-row">
      <label for="patologie">Χρόνιες παθήσεις / προηγούμενες επεμβάσεις</label>
      <textarea id="patologie" name="patologie" rows="2" placeholder="Π.χ. διαβήτης τύπου 2, υπέρταση…"></textarea>
    </div>

    <h2>Επικοινωνίες</h2>
    <div class="form-row">
      <label for="medico">Οικογενειακός γιατρός</label>
      <input type="text" id="medico" name="medico" placeholder="Δρ. Παπαδόπουλος — 2310 123456">
    </div>
    <div class="form-row">
      <label for="contatto">Σύνδεση έκτακτης ανάγκης</label>
      <input type="text" id="contatto" name="contatto" placeholder="Όνομα και τηλέφωνο">
    </div>
    <div class="form-row">
      <label for="assicurazione">Ασφάλεια υγείας</label>
      <input type="text" id="assicurazione" name="assicurazione" placeholder="Π.χ. ΕΟΠΥΥ / ιδιωτική ασφάλιση">
    </div>

    <div id="preview" class="preview" style="display: none; margin-top: 2rem;">
      <h2>Προεπισκόπηση</h2>
      <div id="preview-content" class="preview-content"></div>
    </div>

    <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
      <button type="button" id="btn-generate" class="btn btn--primary">Δημιουργία PDF</button>
      <a id="btn-download" href="#" download="checklist-emergency.pdf" class="btn btn--inverse" style="display: none;">Κατεβάστε PDF</a>
    </div>

    <p style="margin-top: 1.5rem; font-size: 0.85rem; color: #777;">
      Το PDF δημιουργείται εξ ολοκλήρου στον browser σας: τα δεδομένα σας δεν στέλνονται σε κανέναν server.
    </p>
  </form>

  <h2 style="margin-top: 3rem;">Πώς να χρησιμοποιήσετε τη checklist</h2>
  <ol>
    <li><strong>Συμπληρώστε τα πεδία</strong> με τα πραγματικά δεδομένα.</li>
    <li><strong>Πατήστε "Δημιουργία PDF"</strong> για προεπισκόπηση.</li>
    <li><strong>Κατεβάστε το PDF</strong> και αποθηκεύστε το στο τηλέφωνο, στο cloud και σε USB.</li>
    <li><strong>Εκτύπωση ένα αντίγραφο</strong> και φυλάξτε το στο πορτοφόλι, στο αυτοκίνητο και στο σπίτι.</li>
    <li><strong>Ενημερώστε</strong> το κάθε φορά που αλλάζετε φάρμακο, γιατρό ή διάγνωση.</li>
  </ol>

  <div class="cta-box" style="margin-top: 3rem; padding: 2rem; background: #f0f7f4; border-radius: 12px; text-align: center;">
    <h2 style="margin-top: 0;">Τα ιατρικά έγγραφά σας είναι σκορπισμένα σε apps, emails και φάκελους;</h2>
    <p style="max-width: 500px; margin: 0.75rem auto 1.5rem;">
      Με το <strong>Ippo</strong> συγκεντρώνετε όλα τα υγειονομικά έγγραφα της οικογένειάς σας
      — εξετάσεις, συνταγές, πιστοποιητικά — σε ένα ασφαλές μέρος και τα μοιράζεστε
      με τον γιατρό σας με ένα tap.
    </p>
    <a href="https://app.ippocra.com/register" class="btn btn--primary">Δοκιμάστε το Ippo δωρεάν</a>
  </div>

  <h2 style="margin-top: 3rem;">Συχνές ερωτήσεις</h2>

  <details>
    <summary>Ποιος μπορεί να χρησιμοποιήσει αυτή την checklist;</summary>
    <p>
      Όλοι: ενήλικες, ηλικιωμένοι, γονείς με ανήλικα παιδιά. Για τα παιδιά, προσθέστε
      αλλεργίες, παιδιατρικά φάρμακα και επικοινωνίες γονέων.
    </p>
  </details>

  <details>
    <summary>Πρέπει να φέρω και τα χαρτινά έγγραφα;</summary>
    <p>
      Αν είναι εφικτό, ναι. Η checklist είναι ο δείκτης: λέει <em>τι</em> να φέρετε.
      Σε έκτακτη ανάγκη, οι γιατροί θα εκτιμήσουν να έχουν πρόσβαση σε πρόσφατες εξετάσεις,
      ακτινογραφίες και ιατρικά αρχεία.
    </p>
  </details>

  <details>
    <summary>Τα δεδομένα που συμπληρώνω αποθηκεύονται κάπου;</summary>
    <p>
      Όχι. Το PDF δημιουργείται εξ ολοκλήρου στον browser σας με JavaScript:
      κανένα δεδομένο δεν στέλνεται σε server. Μόλις κατεβάζετε το αρχείο,
      είναι μόνο δικό σας.
    </p>
  </details>

  <details>
    <summary>Πόσο συχνά πρέπει να ενημερώνω την checklist;</summary>
    <p>
      Κάθε φορά που αλλάζετε γιατρό, προσθέτετε ή διακόπτετε φάρμακο, ανακαλύπτετε
      αλλεργία ή λαμβάνετε νέα διάγνωση. Κάντε μια πλήρη ανασκόπηση μία φορά το χρόνο.
    </p>
  </details>

</div>

<link rel="stylesheet" href="/assets/css/checklist-emergenza.css">
<script src="/assets/js/checklist-emergenza.js" defer></script>
