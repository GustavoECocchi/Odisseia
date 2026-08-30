# Biblioteca de prompts — Meshy

## Direção visual compartilhada

Copiar o bloco abaixo no início de todos os prompts:

> Stylized ancient Greek mythology low-poly game asset, chunky readable
> silhouette, faceted geometry, hand-painted flat colors, warm Mediterranean
> palette, subtle color variation, no photorealism, no micro details, isolated
> object, centered, no background, no floor, no pedestal, no text.

### Regras de produção

- Um modelo por geração.
- Exportar em GLB com texturas incorporadas.
- Preferir pose neutra e silhueta legível em câmera alta de três quartos.
- Personagens devem ficar inteiros dentro do enquadramento, sem acessórios soltos.
- Assets principais: até aproximadamente 15 mil triângulos.
- Props: até aproximadamente 3 mil triângulos.
- Texturas: 1024 px para props e 2048 px apenas para personagens principais.
- Frente do modelo voltada para `+Z`, base apoiada em `Y = 0` e pivô centralizado.
- Guardar o prompt final e os dados de licença no `ASSET_CREDITS.md`.

## 01 — Barco de Odisseu

> [DIREÇÃO VISUAL COMPARTILHADA] A small ancient Greek single-mast sailing
> vessel inspired by a penteconter, compact wooden hull, raised curved prow and
> stern, one square linen sail, a few simple side oars, bronze and deep red
> painted details, heroic but practical proportions, designed to be clearly
> readable from an elevated three-quarter camera, clean deck, no crew, no water.

Evitar:

> modern yacht, pirate ship, Viking longship, multiple masts, realistic ropes,
> ocean, waves, people, weapons, environment.

## 02 — Polifemo

> [DIREÇÃO VISUAL COMPARTILHADA] Polyphemus, a massive mythological Greek
> cyclops, one large expressive eye centered on the forehead, broad asymmetrical
> face, heavy brow, weathered skin, tangled dark hair and beard, primitive wool
> tunic, intimidating but storybook-like rather than horror, exaggerated hands
> and shoulders, full body neutral pose, animation-friendly silhouette.

Evitar:

> two eyes, extra eye sockets, armor, helmet, weapon, gore, realistic horror,
> modern clothing, environment, pedestal.

## 03 — Ovelha

> [DIREÇÃO VISUAL COMPARTILHADA] A sturdy ancient Mediterranean sheep, thick
> cream wool represented by large faceted clumps, short beige legs, dark brown
> face, small curved horns, calm expression, compact proportions, neutral
> standing pose, suitable for duplicating as a small flock.

Evitar:

> realistic individual fur strands, grass, farm, shepherd, accessories,
> cartoon eyes, environment.

## 04 — Ânfora de vinho

> [DIREÇÃO VISUAL COMPARTILHADA] Ancient Greek wine amphora, terracotta body,
> two strong handles, geometric dark red and charcoal painted bands, slightly
> irregular handmade shape, wide readable silhouette, intact vessel, simple
> game prop.

Evitar:

> photorealistic ceramic, cracks, floating pieces, museum display, table,
> background, text.

## 05 — Oliveira

> [DIREÇÃO VISUAL COMPARTILHADA] Small ancient Mediterranean olive tree,
> twisted short trunk, broad low canopy made of distinct faceted leaf clusters,
> dusty sage green and muted olive colors, sparse dark olives, stylized roots,
> designed as a reusable environment asset.

Evitar:

> ground patch, grass, pot, photorealistic leaves, forest, background, fruit
> basket.

## Ordem de substituição no protótipo

1. Barco.
2. Polifemo.
3. Ovelha.
4. Ânfora.
5. Oliveira.

As versões procedurais devem permanecer disponíveis como fallback durante a integração.
