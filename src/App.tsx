import { useLayoutEffect, useRef, useState } from 'react';
import {
  controles,
  defauts,
  etapes,
  faq,
  formulaire,
  heros,
  marque,
  pied,
  preuve,
  sortie,
} from './content';

/** La fonction serveur qui recoit les demandes. Elle ne detient aucune cle cote
 *  navigateur : c'est elle qui parle a Resend, jamais cette page. */
const POINT_ENVOI =
  'https://muflighiudxzeefozwtv.supabase.co/functions/v1/audit';

/** Assez permissif pour accepter « exemple.com » sans protocole, assez strict
 *  pour refuser une phrase. On ne valide pas plus fin ici : c'est la fonction
 *  serveur qui tranche, et le navigateur ne doit pas devenir l'autorite. */
const URL_RE = /^(https?:\/\/)?[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9-]+)+(\/\S*)?$/i;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

type Etat = 'repos' | 'envoi' | 'ok' | 'erreur';

function Demonstration() {
  const fautive = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Avant la premiere peinture, jamais apres : monte apres le rendu, la ligne
    // serait peinte visible puis masquee, et la page clignoterait.
    const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduit) return;

    const bloc = fautive.current;
    if (!bloc) return;

    // Le rendez-vous est pris AVANT de masquer quoi que ce soit. Si quelque
    // chose echouait entre les deux lignes, la seconde ne s'executerait pas et
    // rien ne serait masque : on perdrait l'effet, jamais la demonstration.
    const minuteur = window.setTimeout(() => {
      bloc.setAttribute('data-vu', 'true');
    }, 1100);
    document.documentElement.classList.add('js-sequence');

    return () => {
      window.clearTimeout(minuteur);
      document.documentElement.classList.remove('js-sequence');
      bloc.setAttribute('data-vu', 'true');
    };
  }, []);

  return (
    <div className="preuve">
      <div className="preuve__ligne">
        <span className="preuve__etiquette">{preuve.etiquetteCorrecte}</span>
        <p className="preuve__phrase preuve__phrase--correcte">{preuve.phrase}</p>
      </div>
      <div className="preuve__ligne preuve__ligne--fautive" ref={fautive}>
        <span className="preuve__etiquette">{preuve.etiquetteFautive}</span>
        <p className="preuve__phrase preuve__phrase--fautive">{preuve.phrase}</p>
        <p className="preuve__invitation">{preuve.invitation}</p>
        <p className="preuve__constat">{preuve.constat}</p>
      </div>
    </div>
  );
}

function Formulaire() {
  const [etat, setEtat] = useState<Etat>('repos');
  const [message, setMessage] = useState('');

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const donnees = new FormData(e.currentTarget);
    const site = String(donnees.get('site') ?? '').trim();
    const email = String(donnees.get('email') ?? '').trim();
    const piege = String(donnees.get('company') ?? '').trim();

    if (!site || !email) {
      setEtat('erreur');
      setMessage(formulaire.manque);
      return;
    }
    if (!URL_RE.test(site)) {
      setEtat('erreur');
      setMessage(formulaire.urlInvalide);
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setEtat('erreur');
      setMessage(formulaire.emailInvalide);
      return;
    }

    setEtat('envoi');
    setMessage('');
    try {
      const r = await fetch(POINT_ENVOI, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ site, email, company: piege }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setEtat('ok');
      setMessage(formulaire.succes);
    } catch {
      // On ne montre jamais l'erreur du fournisseur : elle peut contenir des
      // details de compte, et elle n'aide en rien celui qui la lit.
      setEtat('erreur');
      setMessage(formulaire.echec);
    }
  }

  return (
    <form onSubmit={envoyer} noValidate>
      {/* Piege a robots : hors ecran, hors tabulation, invisible pour un humain
          et rempli par les automates. Un champ nomme « company » est celui
          qu'ils remplissent le plus volontiers. */}
      <div className="envoi__piege" aria-hidden="true">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="envoi">
        <input
          className="envoi__champ"
          name="site"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder={formulaire.urlPlaceholder}
          aria-label={formulaire.urlLabel}
        />
        <input
          className="envoi__champ"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={formulaire.emailPlaceholder}
          aria-label={formulaire.emailLabel}
        />
        <button className="envoi__bouton" type="submit" disabled={etat === 'envoi'}>
          {etat === 'envoi' ? formulaire.enCours : formulaire.bouton}
        </button>
      </div>

      <p className="envoi__note">{formulaire.note}</p>

      {message && (
        <p
          className={
            etat === 'ok' ? 'envoi__reponse envoi__reponse--ok' : 'envoi__reponse envoi__reponse--erreur'
          }
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}

export default function App() {
  return (
    <>
      <header className="tete enveloppe">
        <span className="tete__nom">{marque.nom}</span>
        <span className="tete__quoi">{marque.quoi}</span>
      </header>

      <main>
        <section className="heros enveloppe" id="top">
          <h1 className="heros__titre">{heros.titre}</h1>
          <p className="heros__lede">{heros.lede}</p>

          <Demonstration />
          <p className="preuve__source">{preuve.source}</p>

          <Formulaire />
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">{defauts.titre}</h2>
          <p className="section__lede">{defauts.lede}</p>
          <ul className="defauts">
            {defauts.liste.map((d) => (
              <li key={d.quoi}>
                <strong>{d.quoi}</strong>
                <span>{d.detail}</span>
              </li>
            ))}
          </ul>
          <p className="section__lede" style={{ marginTop: '2.4rem', marginBottom: 0 }}>
            <strong style={{ color: 'var(--ink)' }}>{defauts.aveu.titre}</strong>{' '}
            {defauts.aveu.texte}
          </p>
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">{controles.titre}</h2>
          <p className="section__lede">{controles.lede}</p>
          <ul className="controles">
            {controles.liste.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">{sortie.titre}</h2>
          <p className="section__lede">{sortie.lede}</p>
          <pre className="sortie">
            {sortie.lignes.map((l, i) => (
              <span key={i}>
                {l.t === 'defaut' ? (
                  <b>{l.x}</b>
                ) : l.t === 'ok' ? (
                  <i>{l.x}</i>
                ) : (
                  l.x
                )}
                {'\n'}
              </span>
            ))}
          </pre>
          <p className="envoi__note" style={{ marginTop: '0.9rem' }}>
            {sortie.note}
          </p>
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">{etapes.titre}</h2>
          <ol className="etapes">
            {etapes.liste.map((e) => (
              <li key={e.quoi}>
                <div>
                  <strong>{e.quoi}</strong>
                  <span>{e.detail}</span>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">{faq.titre}</h2>
          <div className="faq">
            {faq.liste.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.r}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="section enveloppe">
          <h2 className="section__titre">Send us a URL.</h2>
          <Formulaire />
        </section>
      </main>

      <footer className="pied enveloppe">
        <span>{pied.gauche}</span>
        <a href={pied.droiteLien}>{pied.droite}</a>
      </footer>
    </>
  );
}
