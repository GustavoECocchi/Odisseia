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

## Status atual — 29 de julho de 2026

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
- ⚠️ O servidor de desenvolvimento registra avisos de depreciação de `THREE.Clock` e
  `PCFSoftShadowMap`; não quebram o protótipo, mas devem ser avaliados ao estabilizar as
  versões de Three/R3F.
- ⚠️ O workspace não possui checkout Git funcional: `.git` está vazio.
- ⚠️ `gh auth status` informa token inválido para `GustavoECocchi`; nenhum commit ou push
  foi realizado no encerramento desta sessão.

## Roadmap imediato

1. Restaurar a autenticação com `gh auth login -h github.com`.
2. Criar um checkout funcional de `GustavoECocchi/Odisseia` e importar o workspace.
3. Revisar, commitar e publicar o vertical slice atual.
4. Validar manualmente e automatizar o puzzle completo de Polifemo.
5. Gerar o barco no Meshy a partir de `docs/asset-prompts.md`.
6. Integrar o GLB mantendo o barco procedural como fallback.
7. Dividir o bundle por cena antes de adicionar os outros GLBs.
8. Avaliar os avisos de depreciação de Three/R3F.
