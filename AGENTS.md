# Instruções de continuidade

## Fonte de verdade

Leia `odisseu-3d-projeto.md` antes de alterar o projeto. Esse documento contém as decisões
de produto, estado real da implementação, problemas conhecidos e próximos passos.

Atualize `odisseu-3d-projeto.md` sempre que houver:

- nova decisão de produto ou arquitetura;
- mudança relevante de escopo;
- funcionalidade concluída ou abandonada;
- resultado importante de validação;
- novo problema conhecido;
- alteração na ordem dos próximos passos.

Não deixe a atualização somente para o final se houver risco de perda de contexto.

## Encerramento

Quando o usuário disser `encerrar-sessao`, `encerrar sessão`, `fechar a sessão` ou
equivalente, execute a skill de projeto `.claude/skills/encerrar-sessao/SKILL.md`.

O encerramento deve auditar o estado real, validar o projeto, atualizar
`odisseu-3d-projeto.md`, commitar e fazer push quando o Git estiver funcional.

## Restrições atuais

- Manter controles por WASD e setas.
- Manter câmera elevada em três quartos.
- Não criar personagem controlável a pé para os dioramas.
- Usar portais acionados por `E` para cenas internas.
- Usar Meshy para assets principais e geometria procedural como fallback.
- Registrar assets externos e suas licenças em `ASSET_CREDITS.md`.

## Status atual — 30 de agosto de 2026

- ✅ App React Three Fiber criado.
- ✅ Barco navegável por WASD e setas.
- ✅ Câmera elevada em três quartos validada visualmente.
- ✅ Ilha de Polifemo, portal e caverna procedural implementados.
- ✅ Fluxo automatizado até o diálogo de Polifemo validado no Chromium.
- ✅ `npm run build` passa.
- ✅ `/encerrar-sessao` configurado para Claude Code.
- ⏳ Cliques nos objetos 3D e retorno ao barco ainda não têm cobertura automatizada.
- ⏳ Assets do Meshy ainda não foram gerados ou integrados.
- ⚠️ O bundle principal tem aproximadamente 1,16 MB antes de gzip e ainda precisa de
  divisão por cena.
- ⚠️ O servidor de desenvolvimento registra aviso de depreciação de `THREE.Clock`
  (interno ao `@react-three/fiber`); não quebra o protótipo. O aviso de
  `PCFSoftShadowMap` foi eliminado (ver abaixo).
- ✅ Checkout Git funcional criado; `gh auth status` válido para `GustavoECocchi`.
- ✅ Primeiro commit publicado em `GustavoECocchi/Odisseia` (branch `main`).
- ✅ Inércia/colisão do barco, iluminação, shader do mar e pós-processamento (bloom)
  revisados. Ver detalhes em `odisseu-3d-projeto.md` → "Polimento de movimentação e
  gráficos (30 de agosto de 2026)".
- ⚠️ Bug real encontrado e corrigido: `<Environment preset="sunset">` dependia de um
  HDRI externo cujo fetch podia ficar pendente para sempre, travando o `Suspense` e
  deixando a tela preta sem erro no console. O componente foi removido.

## Roadmap imediato

1. Jogar manualmente numa janela Chrome focada para validar a sensação de
   movimentação (não confirmado por automação — CDP sofre throttling de rAF em aba
   sem foco real).
2. Validar manualmente e automatizar o puzzle completo de Polifemo (objetos 3D podem
   ficar atrás do HUD nessa câmera — mapear pontos de clique corretos).
3. Gerar o barco no Meshy a partir de `docs/asset-prompts.md`.
4. Integrar o GLB mantendo o barco procedural como fallback.
5. Dividir o bundle por cena antes de adicionar os outros GLBs.
6. Avaliar o aviso de depreciação de `THREE.Clock`.
