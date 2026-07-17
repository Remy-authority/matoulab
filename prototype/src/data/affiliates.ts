/**
 * Registre des partenaires d'affiliation (voir docs/12-plan-monetisation-affiliation.md).
 *
 * ACTIVATION = une seule opération : passer `enabled: true` ET renseigner `tracking`
 * (l'identifiant fourni par le partenaire une fois le compte créé par Rémy).
 * Tant qu'un partenaire est `enabled: false` ou que `tracking` est vide, AUCUN lien
 * n'est généré (`buildAffiliateUrl` renvoie null → le composant affiche le libellé
 * en texte simple, jamais un lien non tracké ou incomplet).
 *
 * Aucune donnée inventée : les valeurs `tracking` restent VIDES jusqu'à ce que Rémy
 * transmette les identifiants réels (tag Amazon `?tag=`, ID éditeur Awin, etc.).
 * Réutilisable pour l'usine à blogs (AUT-8) : chaque blog a son propre tag.
 */

export type AffiliateNetwork = 'amazon' | 'awin' | 'affilae' | 'kwanko';

export interface AffiliatePartner {
  id: string;
  label: string;
  network: AffiliateNetwork;
  enabled: boolean;
  /** Identifiant de tracking fourni par Rémy. VIDE = partenaire inactif. */
  tracking: string;
  /** ID annonceur Awin (awinmid) — requis pour construire le deep-link Awin. */
  advertiserId?: string;
  /** rel appliqué aux liens (toujours sponsored + nofollow, cf. reco Google). */
  rel: string;
}

export const AFFILIATES: Record<string, AffiliatePartner> = {
  amazon: {
    id: 'amazon',
    label: 'Amazon',
    network: 'amazon',
    enabled: false,
    tracking: '', // -> tag Partenaires Amazon, ex: "matoulab-21"
    rel: 'sponsored nofollow noopener',
  },
  zooplus: {
    id: 'zooplus',
    label: 'zooplus',
    network: 'awin',
    enabled: false,
    tracking: '2984845', // awinaffid = Publisher ID Awin de Rémy (Dyonisos Ltd), fourni 2026-07-14
    advertiserId: '7334', // zooplus FR (source: ui.awin.com/merchant-profile/7334)
    rel: 'sponsored nofollow noopener',
  },
  maxizoo: {
    id: 'maxizoo',
    label: 'Maxi Zoo',
    network: 'awin',
    enabled: true,
    tracking: '2984845', // même awinaffid Awin (commun à tous les annonceurs)
    advertiserId: '68698', // Maxi Zoo FR (source: ui.awin.com/merchant-profile/68698)
    rel: 'sponsored nofollow noopener',
  },
};

/**
 * Construit l'URL trackée d'un partenaire vers une cible, ou null si le partenaire
 * est inactif / sans tracking. Ne modifie jamais une URL déjà trackée.
 */
export function buildAffiliateUrl(partnerId: string, targetUrl: string): string | null {
  const p = AFFILIATES[partnerId];
  if (!p || !p.enabled || !p.tracking) return null;

  let url: URL;
  try {
    url = new URL(targetUrl);
  } catch {
    return null; // cible invalide -> pas de lien plutôt qu'un lien cassé
  }

  switch (p.network) {
    case 'amazon':
      // Tag Partenaires Amazon : paramètre ?tag=
      url.searchParams.set('tag', p.tracking);
      return url.toString();
    case 'awin': {
      // Deep link Awin : awin1.com/cread.php?awinmid=<annonceur>&awinaffid=<éditeur>&ued=<cible>
      if (!p.advertiserId) return null; // annonceur inconnu -> pas de lien non attribué
      const deep = new URL('https://www.awin1.com/cread.php');
      deep.searchParams.set('awinmid', p.advertiserId);
      deep.searchParams.set('awinaffid', p.tracking);
      deep.searchParams.set('ued', url.toString());
      return deep.toString();
    }
    default:
      return null;
  }
}

export function isAnyAffiliateEnabled(): boolean {
  return Object.values(AFFILIATES).some((p) => p.enabled && p.tracking);
}
