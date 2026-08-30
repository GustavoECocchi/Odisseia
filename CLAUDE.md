# Odisseia — contexto para Claude Code

Antes de trabalhar, leia:

1. `AGENTS.md`
2. `odisseu-3d-projeto.md`
3. `docs/asset-prompts.md` quando a tarefa envolver modelos 3D
4. `ASSET_CREDITS.md` quando um asset externo for integrado

`odisseu-3d-projeto.md` é a fonte de verdade sobre decisões, estado atual, problemas
conhecidos e próximos passos. Mantenha-o atualizado durante o desenvolvimento.

Ao terminar uma sessão, use `/encerrar-sessao`.

Se o comando tiver sido criado depois que o Claude Code já estava aberto, encerre e
inicie o Claude Code novamente a partir da raiz deste projeto. Existe também um fallback
compatível em `.claude/commands/encerrar-sessao.md`.
