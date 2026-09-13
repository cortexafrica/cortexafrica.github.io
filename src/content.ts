/**
 * Tous les textes de la page, en un seul endroit.
 *
 * Deux voix, et elles ne se melangent jamais : la notre, en phrases, et celle
 * de la machine, mot pour mot. Une sortie de controle n'est jamais reformulee
 * pour la mise en page — si un message est laid, c'est le message qu'on corrige
 * dans le skill, pas son affichage ici.
 *
 * Marche : anglais international, orthographe americaine.
 */

export const marque = {
  nom: 'Served',
  quoi: 'Free website audit',
};

export const heros = {
  titre: 'Your site looks fine. That’s the problem.',
  lede:
    'Send us a URL. We check what your site actually serves — not what the code says it serves. ' +
    'You get the report within 24 hours.',
};

/** La demonstration. Les deux lignes emploient les VRAIS fichiers de police du
 *  cas reel, pas une imitation. C'est pour cela qu'elle ne se copie pas. */
export const preuve = {
  phrase: 'Open a dollar store.',
  etiquetteCorrecte: 'what the site was designed with',
  etiquetteFautive: 'what the browser actually rendered',
  // La critique des captures a montre que les deux lignes se ressemblent
  // presque. C'est precisement la these de la page : un defaut de police ne
  // rend pas une page laide, il la rend legerement differente. On le dit au
  // lieu de truquer la demonstration pour la rendre spectaculaire.
  invitation: 'Can you tell them apart?',
  constat:
    'Neither could anyone else. The second line uses none of the font it downloaded — ' +
    '0 letters rendered. The 3 characters that file covered were the spaces.',
  source:
    'Both lines use the two real font files from melodysupplyco.com — the one it meant to serve, ' +
    'and the one it shipped. Nothing here is simulated. Every visitor downloaded 13 KB of a font ' +
    'file that was used between the words and nowhere else. Nobody spotted it by looking at the ' +
    'page. It was found by measuring the file. The site is fixed today; go and see.',
};

export const formulaire = {
  urlLabel: 'Your website address',
  urlPlaceholder: 'yourcompany.com',
  emailLabel: 'Where we send the report',
  emailPlaceholder: 'you@yourcompany.com',
  bouton: 'Check my site',
  note: 'Free. No account. One email, and only about your report.',
  enCours: 'Sending…',
  succes: 'Got it. Your report is on its way within 24 hours.',
  manque: 'We need both the address and an email to reach you.',
  urlInvalide: 'That does not look like a website address.',
  emailInvalide: 'That does not look like an email address.',
  echec: 'Something broke on our side. Try again in a minute — nothing was lost.',
};

/** Les quatre defauts. Deux d'entre eux etaient dans notre propre code, ecrit
 *  le matin meme — et le dire est plus convaincant que de le taire. */
export const defauts = {
  titre: 'Four defects, one site, one session.',
  lede:
    'Not one of them was visible. The site looked finished, the client was happy, ' +
    'and it was already online.',
  liste: [
    {
      quoi: 'The wrong font file',
      detail:
        'The build shipped the Vietnamese subset instead of the Latin one. It downloaded ' +
        'without a single error. On a designer’s machine the system fallback looks plausible, ' +
        'so nobody questions it.',
    },
    {
      quoi: 'A price in euros on a site that bills in dollars',
      detail:
        'Left over from an earlier draft, buried in an FAQ answer nobody re-read.',
    },
    {
      quoi: 'An open mail relay in the contact form',
      detail:
        'The origin check accepted any request that simply omitted the header. A browser always ' +
        'sends one; a script does not have to. Anyone could send mail from that domain.',
    },
    {
      quoi: 'A permissive condition that opened the gate',
      detail:
        'One condition that verified the header when present instead of requiring it.',
    },
  ],
  aveu: {
    titre: 'Two of those four were ours.',
    texte:
      'We had written that server code the same morning. We re-read it, we were satisfied with it, ' +
      'and the checks found the holes anyway. That is the entire argument: nobody catches their own ' +
      'mistakes by looking harder at their own work.',
  },
};

export const controles = {
  titre: 'What we actually run.',
  lede:
    'Seven checks, on the live page, against what the server really sends back. ' +
    'Not a crawl of your source code.',
  liste: [
    'The declared font is measured character by character — a font that loads is not a font that applies.',
    'Every visible number is traced to a source, or it is flagged.',
    'The share image, the canonical URL, the not-found page, the favicon — fetched from the live URL, not assumed.',
    'Spelling, currency and units against the market you actually sell to.',
    'Every link followed. A dead catalog link keeps the page beautiful and stops the sale.',
    'Secrets in the build, in the repository, and in its history. SPF, DMARC, CAA, DNSSEC.',
    'Screenshots at every scroll depth, on desktop, on mobile, and through Safari’s engine.',
  ],
};

/** Sortie verbatim. Les balises ne sont la que pour colorer : elles ne changent
 *  pas un caractere du texte. */
export const sortie = {
  titre: 'What lands in your inbox.',
  lede:
    'The finding, the cause, and what to change. No score, no dashboard, ' +
    'nothing to log into.',
  lignes: [
    { t: 'defaut', x: '[blocking]  FONT_COVERAGE' },
    { t: 'texte', x: '  where    public/fonts/archivo-latin-ext.woff2' },
    { t: 'texte', x: '  finding  The font covers 1 of the 77 characters on this page.' },
    { t: 'texte', x: '  cause    The Vietnamese subset was downloaded instead of the Latin one.' },
    { t: 'texte', x: '  fix      Replace it, and declare each subset with its own unicode-range.' },
    { t: 'texte', x: '' },
    { t: 'defaut', x: '[blocking]  ORIGIN_NOT_REQUIRED' },
    { t: 'texte', x: '  where    functions/quote' },
    { t: 'texte', x: '  finding  A request with no Origin header is accepted.' },
    { t: 'texte', x: '  cause    The header is checked when present instead of being required.' },
    { t: 'texte', x: '  fix      Reject when the header is absent. A browser always sends one.' },
    { t: 'texte', x: '' },
    { t: 'ok', x: '[ok]        Everything else passed.' },
  ],
  note:
    'That is a real excerpt from a real report, with nothing rewritten to look better.',
};

export const etapes = {
  titre: 'How it works.',
  liste: [
    {
      quoi: 'You send a URL',
      detail: 'The address of the page you care about most. That is all we need.',
    },
    {
      quoi: 'We run the gate on the live page',
      detail:
        'The same one we run on our own work before anything ships. A person reads the output ' +
        'and throws out anything that is noise.',
    },
    {
      quoi: 'You get the report',
      detail:
        'Within 24 hours, by email. If nothing is broken, we tell you that, in one line.',
    },
  ],
};

export const faq = {
  titre: 'Before you send it.',
  liste: [
    {
      q: 'Why is it free?',
      r:
        'Because we are new and you have no reason to trust us yet. A report you did not pay for ' +
        'is the cheapest way for us to show the work is worth something. If you then want us to ' +
        'fix what we found, that is a conversation — and you start it, not us.',
    },
    {
      q: 'What if nothing is broken?',
      r:
        'Then the report says so, in one line, and you owe us nothing. It has not happened yet, ' +
        'and we will say so plainly the day it does.',
    },
    {
      q: 'What do you do with my URL?',
      r:
        'We fetch your public pages the way any visitor does, and we email you the result. ' +
        'We do not publish your name, your site or your findings anywhere without asking you first. ' +
        'The case on this page is published because that client agreed to it.',
    },
    {
      q: 'Is this an AI scanning my site?',
      r:
        'No. Seven scripts do the measuring. They are deterministic, they give the same answer ' +
        'every time, and they cannot invent a problem. A person reads the output before it reaches ' +
        'you. The report is short because most of what a tool prints is noise.',
    },
    {
      q: 'Who is behind this?',
      r:
        'Cortex Africa, a company of one, building the tool that produced this page. This page ' +
        'passed the same seven checks before it went online. It would be strange otherwise.',
    },
  ],
};

export const pied = {
  gauche: '© 2026 Cortex Africa SAS. All rights reserved.',
  // Pas d'adresse e-mail tant qu'on n'en possede pas une. La page a ete mise en
  // ligne avec « audit@cortexafrica.com », un domaine qui appartient a quelqu'un
  // d'autre — verifie : il resout vers Squarespace. On envoyait des visiteurs
  // chez un tiers. Corrige dans l'heure, et devenu un controle du skill.
  droite: 'Send us a URL',
  droiteLien: '#top',
};

export const meta = {
  titre: 'Served — see what your website actually serves',
  description:
    'Free website audit. We check what your site really sends to visitors — fonts, links, ' +
    'numbers, security — and email you the findings within 24 hours.',
};
