---
name: encerrar-sessao
description: Encerra uma sessão de desenvolvimento do projeto Odisseia com auditoria do estado real, validação, atualização obrigatória do documento de continuidade, commit e push quando o Git estiver disponível. Use somente quando o usuário invocar /encerrar-sessao ou pedir explicitamente para encerrar, fechar ou finalizar a sessão.
---

# Encerrar sessão

Executar as etapas abaixo em ordem. Não declarar sucesso sem evidência.

## 1. Levantar o estado real

- Ler `odisseu-3d-projeto.md`.
- Executar `git status --short`, `git diff` e, quando houver repositório, `git log --oneline -10`.
- Se não houver Git funcional, registrar isso como bloqueio de publicação e continuar com
  documentação e validação. Não inicializar, sobrescrever ou reconstruir `.git` sem
  autorização.
- Identificar processos de desenvolvimento iniciados durante a sessão.

## 2. Validar

- Executar `npm run build`.
- Se existir `npm run check:browser`, executá-lo com o servidor Vite ativo.
- Registrar resultados, avisos e falhas reais. Não converter teste parcial em sucesso.
- Encerrar processos locais iniciados durante a sessão depois da validação.

## 3. Atualizar a continuidade

Atualizar obrigatoriamente a seção `Estado atual da implementação` de
`odisseu-3d-projeto.md`:

- data da última atualização;
- funcionalidades realmente concluídas;
- decisões duráveis tomadas;
- validações executadas e resultados;
- problemas conhecidos e trabalho parcial;
- próximos passos exatos, na ordem correta;
- comandos necessários para retomar.

Atualizar `AGENTS.md` somente se alguma instrução ou convenção durável mudou. Preservar
arquitetura e regras que não foram afetadas.

## 4. Versionar

Somente quando houver Git funcional:

- adicionar explicitamente apenas arquivos relevantes; não usar `git add -A` às cegas;
- revisar o staged diff;
- criar commit novo com mensagem descritiva;
- fazer push para `origin` na branch atual;
- se remoto, autenticação ou branch impedirem o push, informar claramente e manter o
  commit local intacto.

## 5. Entregar o resumo

Informar de forma curta:

- o que foi implementado;
- o que foi validado;
- commit e push realizados, ou o motivo exato de não terem ocorrido;
- pendências ou itens quebrados;
- primeiro próximo passo para a sessão seguinte.
