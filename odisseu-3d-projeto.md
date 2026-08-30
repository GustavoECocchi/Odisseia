# Projeto: A Odisseia em 3D — "O Trajeto de Odisseu"

## Visão geral

Site portfólio/experiência 3D interativa, inspirado em bruno-simon.com, onde o usuário
dirige um pequeno barco através do mar Mediterrâneo mítico, passando por ilhas fixas que
representam os episódios da Odisseia de Homero. Não é mundo aberto genérico — é uma rota
curada com liberdade de navegação dentro dela.

O projeto será uma experiência independente para compor o portfólio. A navegação conecta
os episódios, mas não deve ser a única atividade: o jogador encontra pequenas interações,
puzzles e desafios inspirados diretamente na mitologia da Odisseia. A jornada principal
deve poder ser concluída em aproximadamente 10 minutos, com exploração opcional para quem
quiser permanecer mais tempo no mapa.

**Referência de mecânica:** bruno-simon.com (física de veículo, câmera seguindo, mundo
navegável em terceira pessoa).

**Referência estética:** low-poly minimalista (tipo Wind Waker / voxel art), não
fotorrealista. Água estilizada, cores chapadas, iluminação simples.

---

## Formato de navegação (decidido)

- O jogador controla o barco livremente com teclado (WASD / setas), com física leve
  (aceleração, inércia, virada suave — não é rígido tipo grid).
- O mapa não é aberto/infinito: é uma extensão de mar delimitada, com as ilhas dos
  episódios posicionadas ao longo de uma rota (curva, não linha reta) que segue a ordem
  narrativa da Odisseia.
- Ao aproximar o barco de uma ilha, um trigger de proximidade abre uma UI (painel/modal)
  com o nome do episódio, um resumo curto e possivelmente algum elemento visual/animação
  específico daquela ilha.
- Fora dos triggers, a experiência é livre: o jogador pode passear pelo mar, ver as ilhas
  ao longe, decidir a ordem que visita (ainda que a rota "sugerida" siga a ordem do poema).

### Loop principal

**Navegar → avistar um evento → investigar → enfrentar uma interação → conquistar uma
lembrança → continuar a jornada.**

As lembranças são fragmentos visuais da história de Odisseu. Elas registram o progresso
sem transformar a experiência em um jogo tradicional de níveis ou pontos. O tema central
é a astúcia: observar, compreender e sobreviver deve ser mais importante do que derrotar
inimigos pela força.

### Controles

- **WASD ou setas direcionais:** controlar o barco. O jogador pode escolher livremente
  qualquer uma das duas opções.
- **Espaço:** ação principal durante desafios.
- **E:** interagir com elementos próximos.
- **Esc:** pausar ou abrir o menu.

Os mesmos comandos devem ganhar funções contextuais nos desafios, evitando ensinar um
novo esquema de controles em cada episódio.

### Transições e cenas internas

Alguns episódios terão uma cena 3D interna própria, acessada por uma passagem integrada
ao cenário. Ao se aproximar da entrada, o jogador verá o comando **E — Entrar**. A
transição será feita com `MeshPortalMaterial`, do Drei, combinando a cena marítima com a
cena interna enquanto a câmera avança pela passagem.

O portal não precisa parecer um elemento mágico. Na ilha de Polifemo, por exemplo, ele
ficará mascarado pela boca da caverna e mostrará discretamente o fogo, as sombras e a
silhueta do Ciclope antes da entrada. Em Hades, o mesmo recurso poderá assumir uma
aparência explicitamente sobrenatural.

Fluxo da transição:

1. O barco entra no raio de interação e aparece **E — Entrar**.
2. Ao pressionar **E**, o barco desacelera e os controles de navegação são suspensos.
3. A câmera se alinha com a passagem e avança enquanto o portal ocupa a tela.
4. A cena marítima é substituída pela cena interna.
5. Ao concluir ou abandonar o episódio, a transição acontece no sentido inverso.

As cenas internas serão dioramas 3D interativos com câmera dirigida, pontos de observação
e objetos acionados por clique ou pela tecla **E**. O jogador não controlará um modelo de
Odisseu a pé. Objetos, mãos, sombras, sons e animações representarão sua presença.

Por desempenho, somente a cena do episódio próximo poderá renderizar uma prévia. Depois
da entrada, a cena marítima deve ser suspensa ou desmontada. Nunca serão mantidos os 14
portais renderizando simultaneamente.

## Estilo visual (decidido)

- **Low-poly / faceted shading** em todos os modelos (barco, ilhas, terreno, vegetação).
- Água: plano com deslocamento de vértices via shader simples (ondas senoidais, não
  Gerstner realista) + cor sólida com leve gradiente de profundidade. Nada de
  reflexo/refração real nesta fase.
- Paleta: azul-Mediterrâneo para o mar, com cada ilha podendo ter uma paleta secundária
  temática (ex: Circe → tons roxos/verdes venenosos, Ciclope → cinza/marrom rochoso,
  Ítaca → dourado/verde-oliva, sinalizando "chegada").
- Iluminação: uma luz direcional (sol) + luz ambiente. Sem pós-processamento pesado na v1.

---

## Stack técnica recomendada (para Claude Code, fora das limitações do ambiente de artifact)

- **Build tool:** Vite
- **3D:** React Three Fiber + Drei sobre a versão atual do Three.js. A composição
  declarativa facilitará a divisão entre cena marítima, portais e dioramas interativos.
- **Transições:** `MeshPortalMaterial`, do Drei, para visualizar e acessar cenas internas.
- **Física do barco:** não precisa de engine de física completa (Rapier/Cannon) — inércia
  e virada podem ser feitas com matemática simples de velocidade/aceleração/damping.
  Considerar Rapier apenas se quiser colisão real com as ilhas.
- **Modelos 3D:** geometria procedural do Three.js (icosaedros, cones, planos deformados)
  para v1 — evita depender de assets externos/licenciamento antes de validar a mecânica.
  Modelos .glb low-poly (Blender ou baixados de fontes com licença livre) entram na v2.
- **Deploy:** Vercel ou Netlify (estático, sem backend necessário).

---

## Estrutura de conteúdo — os episódios (ordem canônica)

| # | Episódio | Nota de design |
|---|----------|-----------------|
| 1 | Tróia (ponto de partida) | Não é bem uma "ilha" — pode ser o cais inicial, onde o barco começa |
| 2 | Cícones | Ilha pequena, tema de conflito/guerra |
| 3 | Lotófagos | Ilha tropical, tema de esquecimento/tentação |
| 4 | Ciclope (Polifemo) | Ilha rochosa, caverna, tema de perigo físico |
| 5 | Ilha de Éolo | Ilha flutuante/ventos, tema de tentação de abrir o saco dos ventos |
| 6 | Lestrigões | Ilha hostil, gigantes, tema de fuga |
| 7 | Circe | Ilha mística, tema de transformação |
| 8 | Mundo dos mortos (Hades) | Não precisa ser ilha — pode ser uma "fenda"/portal no mar, ambiente escuro |
| 9 | Sereias | Não é ilha — são rochas no meio do mar com efeito sonoro/visual de atração |
| 10 | Cila e Caríbdis | Passagem estreita entre dois perigos — desafio de navegação |
| 11 | Ilha do Sol (gado de Hélio) | Ilha dourada, tema de tentação/punição |
| 12 | Calipso (Ogígia) | Ilha isolada, tema de aprisionamento/saudade |
| 13 | Feácios (Esquéria) | Ilha civilizada, tema de acolhimento |
| 14 | Ítaca (destino final) | Ilha final, chegada — pode ter tratamento visual diferenciado (luz dourada, "fim de jornada") |

Cada episódio deve ter, no mínimo: nome, posição no mapa (coordenadas), resumo de 2-3
frases, e paleta/tema visual próprio. Conteúdo textual pode ser escrito depois — a
estrutura de dados (array de objetos) deve ser criada desde já para popular a cena.

Nem todos os episódios são ilhas. A estrutura de dados deve permitir pontos de tipos
distintos, como porto, ilha, portal, rochas, passagem e destino.

---

## Estrutura da jornada

### Ato 1 — A partida e a astúcia

- Tróia: apresentação dos controles, soltura das amarras e partida.
- Cícones e Lotófagos: interações curtas.
- Polifemo: primeiro grande desafio, baseado em observação, engano e fuga.

### Ato 2 — O mundo sobrenatural

- Éolo e Lestrigões: eventos de navegação.
- Circe: puzzle curto relacionado à transformação e à erva *moly*.
- Hades: mudança completa de atmosfera.
- Sereias: desafio em que som, câmera e controles atraem o barco para as rochas.

### Ato 3 — O retorno

- Cila e Caríbdis: principal confronto marítimo da experiência. O objetivo é atravessar
  e sobreviver, não matar as criaturas.
- Ilha do Sol: escolha e consequência.
- Calipso e Feácios: momentos mais contemplativos.
- Ítaca: conclusão da jornada.

O mar deve parecer contínuo para o jogador, mas pode ser dividido tecnicamente em três
regiões correspondentes aos atos. Isso permite carregamento progressivo, melhor
desempenho e maior controle da ambientação.

### Desafios principais

Serão priorizados três momentos jogáveis mais elaborados:

1. **Polifemo:** obter o vinho, usar o nome "Ninguém", preparar a fuga e escapar sob as
   ovelhas.
2. **Sereias:** resistir à atração sonora e visual enquanto o barco é puxado em direção
   às rochas.
3. **Cila e Caríbdis:** navegar por um redemoinho enquanto Cila ataca pelas laterais.

Os demais episódios terão interações menores, com duração aproximada de 20 a 60 segundos.
Essa divisão evita transformar o projeto em 14 jogos diferentes e concentra o polimento
nos momentos de maior impacto.

---

## Fases de construção

**Fase 1 — MVP do Ato 1**

- Cais de Tróia com apresentação dos controles
- Pequena interação para soltar as amarras e erguer a vela
- Plano de água com shader simples de ondas
- Barco controlável por WASD ou setas, com inércia básica
- Câmera terceira pessoa seguindo o barco
- Região navegável com Tróia, Lotófagos e ilha de Polifemo
- Trigger de proximidade abrindo um painel de texto simples
- Uma interação curta nos Lotófagos
- Protótipo do desafio de Polifemo

**Fase 2 — Jornada completa**

- Implementação dos três atos e dos 14 pontos narrativos
- Desafios principais de Polifemo, Sereias e Cila/Caríbdis
- Interações menores nos demais episódios
- Sistema de lembranças e registro dos locais descobertos
- Painéis de conteúdo e paleta visual diferenciada por região

**Fase 3 — Polimento**

- Sons de água, vento, madeira, vela e ambientes próprios de cada episódio
- Transições de câmera mais suaves ao entrar num episódio
- Efeito visual de "conquista" ao chegar em Ítaca (tela final)
- Responsividade / controles touch para mobile

---

## Decisões já fechadas (não reabrir sem motivo)

- Navegação: dirigir + ilhas fixas em rota curada (não mundo aberto puro, não scroll puro)
- Controles de navegação: WASD e setas direcionais
- Estilo visual: low-poly, não realista, nesta fase
- Sem física realista de água (sem Gerstner/reflexo) na v1
- Três grandes desafios: Polifemo, Sereias e Cila/Caríbdis
- Astúcia, sobrevivência e descoberta como pilares das interações
- React Three Fiber + Drei como base da experiência 3D
- Portais acionados por **E** para entrar em dioramas 3D, sem personagem controlável a pé
- Somente um portal próximo pode renderizar sua cena interna por vez
- Câmera alta em três quartos, próxima da composição visual de bruno-simon.com, em vez de
  câmera baixa atrás do barco ou visão totalmente vertical
- Meshy será usado para os assets principais; cenário repetitivo e efeitos continuam
  procedurais
- Assets do Meshy Free podem usar CC BY 4.0, com atribuição registrada no projeto

## Em aberto (decidir com Claude Code na hora da implementação)

- Uso ou não de física real de colisão (Rapier) vs limites simples por distância
- Seleção e refinamento dos GLBs finais gerados no Meshy

---

## Estado atual da implementação

**Última atualização:** 30 de agosto de 2026

O primeiro vertical slice está em desenvolvimento no workspace
`/home/gustavoecocchi/Downloads/odisseia`.

### Repositório

- GitHub: https://github.com/GustavoECocchi/Odisseia
- Repositório remoto público, branch padrão `main`.
- Em 30 de agosto de 2026, `gh auth status` confirmou sessão válida de `GustavoECocchi`.
- Checkout Git funcional criado no workspace (`git init`, branch `main`).
- Primeiro commit publicado (`fc0cd78`, 31 arquivos) com `git push -u origin main`.
  O remoto deixou de estar vazio.

### Stack instalada

- React 19
- TypeScript
- Vite 8
- Three.js
- React Three Fiber
- Drei
- Puppeteer Core para validação do Chromium instalado no sistema

### O que já existe

- Tela de abertura com identidade visual e botão para iniciar.
- HUD do Ato 1.
- Controles de navegação por WASD e setas.
- Barco procedural com aceleração, inércia, ré e virada.
- Câmera seguindo o barco.
- Shader simples de ondas para o mar.
- Ilha procedural de Polifemo.
- Entrada de caverna com `MeshPortalMaterial`.
- Estados de jogo: `sailing`, `entering`, `cave` e `exiting`.
- Diorama interno da caverna com Polifemo, fogo, ânfora, estaca e ovelhas procedurais.
- Primeiro fluxo de puzzle:
  1. responder "Ninguém";
  2. selecionar o vinho;
  3. preparar a estaca;
  4. escapar sob a ovelha;
  5. retornar ao barco.
- Build de produção executado com sucesso por `npm run build`.
- Servidor Vite aberto em `http://127.0.0.1:5173/` durante a sessão.
- Chromium aberto para revisão visual.
- Favicon próprio adicionado.
- Biblioteca inicial de prompts do Meshy criada em `docs/asset-prompts.md`.
- Registro de licenças criado em `ASSET_CREDITS.md`.
- Comando de continuidade `/encerrar-sessao` criado e validado.
- Inércia do barco mais firme ao soltar as teclas e colisões suaves (ilha e bordas do
  mapa reduzem a velocidade gradualmente em vez de travar/quicar).
- Iluminação da cena marítima revisada (menos luz ambiente plana, `hemisphereLight`
  adicionada, sombras com `PCFShadowMap` explícito) para mais contraste no low-poly.
- Shader do mar com brilho especular do sol, leve efeito fresnel e espuma nas cristas
  das ondas.
- Pós-processamento (`@react-three/postprocessing`): bloom sutil e vinheta leve.

### Direção visual validada

A primeira câmera testada ficou baixa e próxima demais do barco. A direção aprovada é
mais parecida com bruno-simon.com: câmera elevada em três quartos, quase isométrica, com
campo de visão mais fechado e olhando alguns metros à frente do barco. A câmera recebeu
também deslocamento lateral para produzir uma composição diagonal. Essa versão foi
capturada e validada visualmente no Chromium.

### Estado da validação no navegador

Foi criado o comando `npm run check:browser`, que usa o Chromium instalado para:

1. abrir a tela inicial;
2. iniciar a jornada;
3. navegar em direção à ilha;
4. procurar o comando de entrada;
5. entrar na caverna;
6. capturar imagens em `/tmp`.

Resultado mais recente:

- a cena marítima renderizou corretamente;
- barco, água e ilha apareceram;
- o build não apresentou erros de TypeScript;
- o prompt **E — Entrar na caverna** apareceu corretamente;
- a transição chegou ao estado `cave`;
- o diálogo inicial de Polifemo apareceu;
- não houve erros de console;
- o teste finalizou com a mensagem
  `Fluxo inicial validado no Chromium sem erros de console`.
- essas duas validações foram repetidas com sucesso durante o encerramento da sessão.

O raio de proximidade foi ajustado para 20,5 unidades. A transição deixou de depender da
quantidade de frames e passou a usar o tempo real do relógio da cena, evitando ficar
presa em máquinas ou testes com baixa taxa de quadros.

Ainda não há automação dos cliques nos objetos 3D do puzzle nem do retorno completo ao
barco. Essas etapas existem no código, mas precisam de validação manual ou extensão do
teste de navegador.

O build de produção passa. O Vite informa apenas que o bundle JavaScript principal tem
aproximadamente 1,16 MB antes de gzip e recomenda divisão de chunks; isso é uma otimização
pendente, não uma falha de build.

Durante o encerramento, o servidor também registrou avisos de depreciação de
`THREE.Clock` e `PCFSoftShadowMap`. Eles não causaram falhas visuais ou de build, mas
devem ser avaliados quando as versões de Three.js, R3F e Drei forem estabilizadas. O
servidor Vite e o Chromium iniciados nesta sessão foram encerrados.

### Pipeline de assets decidido

O Meshy será usado, inicialmente no plano gratuito, para gerar assets de maior identidade:

1. barco de Odisseu;
2. Polifemo;
3. ovelha;
4. ânfora;
5. oliveira.

Rochas, ilhas, água, fogo e vegetação secundária continuam procedurais. Os modelos
procedurais atuais devem permanecer como fallback até cada GLB estar integrado e validado.

Prompts e regras de produção estão em `docs/asset-prompts.md`. Licenças e modificações
devem ser registradas em `ASSET_CREDITS.md`. Para Meshy Free, manter atribuição CC BY 4.0
e indicar modificações.

### Polimento de movimentação e gráficos (30 de agosto de 2026)

- `@react-three/fiber` atualizado para 9.7.0 (exigência de peer dependency do
  `@react-three/postprocessing`); `@react-three/postprocessing` e `postprocessing`
  adicionados como dependências.
- `Boat.tsx`: decaimento de velocidade mais rápido ao soltar as teclas (menos deslize);
  colisão com a ilha e com os limites do mapa agora reduz a velocidade
  exponencialmente e reposiciona o barco na borda em vez de reverter a posição e
  inverter a velocidade (evitava o "trava seco" relatado).
- `OdysseyScene.tsx`: `<Environment preset="sunset">` foi removido. Foi a causa de um
  bug real encontrado nesta sessão — o carregamento do HDRI faz duas requisições
  concorrentes (`raw.githack.com` e `raw.githubusercontent.com`); quando a segunda
  fica pendente indefinidamente, o `Suspense` trava e a cena nunca renderiza (tela
  preta, sem erro no console). A iluminação foi compensada com `hemisphereLight` e
  ajuste de intensidade, sem depender de rede.
- `Sea.tsx`: shader ganhou normal computada por diferenças finitas, brilho especular
  (sol), fresnel e espuma nas cristas.
- `App.tsx`: `shadows={{ type: THREE.PCFShadowMap }}` explícito, elimina o aviso de
  depreciação de `PCFSoftShadowMap`.
- Validado visualmente no Chrome real via `claude-in-chrome` (não headless): tela
  inicial, navegação e entrada na caverna renderizam corretamente após o ajuste.
  Observação de ambiente: screenshots tirados imediatamente após um `navigate` podem
  sair pretos porque o frame WebGL ainda não foi compositado — um pequeno `wait` ou
  interação antes do screenshot resolve; não é um bug do jogo.
- Teste automatizado de movimentação/inércia via CDP não foi conclusivo: o
  `requestAnimationFrame` é throttled quando a aba não está em primeiro plano de
  verdade, então 8s de tempo real não avançam a simulação na mesma proporção.
  Recomenda-se validar a sensação de inércia jogando diretamente em uma janela do
  Chrome focada pelo usuário.

### Próximos passos exatos

1. Jogar manualmente numa janela Chrome focada para validar a sensação de inércia e
   colisão do barco (não confirmado por automação nesta sessão — ver observação acima).
2. Validar manualmente a escolha "Ninguém", os objetos 3D e o retorno ao barco.
3. Estender `npm run check:browser` para cobrir o puzzle completo. Observação: os
   objetos clicáveis da caverna (vinho, estaca, ovelha) ficam parcialmente atrás do
   painel de HUD ou fora da tela nessa posição de câmera fixa — mapear os pontos de
   clique corretos (ou ajustar a câmera/HUD) antes de automatizar os cliques.
4. Preparar a pasta pública de modelos e um componente de carregamento de GLBs.
5. Gerar o primeiro asset no Meshy usando o prompt do barco.
6. Substituir o barco procedural mantendo fallback, escala e orientação consistentes.
7. Repetir o pipeline com Polifemo, ovelha, ânfora e oliveira.
8. Dividir o bundle por cena antes de adicionar vários GLBs.
9. Avaliar e eliminar o aviso de depreciação de `THREE.Clock` (interno ao
   `@react-three/fiber` 9.7.0; não há como corrigir só pelo código da aplicação).
10. Desenvolver o cais de Tróia e a interação de partida.

### Continuidade entre sessões

- `AGENTS.md` instrui agentes a ler e manter este documento como fonte de verdade.
- `CLAUDE.md` fornece o ponto de entrada automático para o Claude Code.
- A skill `.claude/skills/encerrar-sessao/SKILL.md` cria o comando
  `/encerrar-sessao`.
- O fallback `.claude/commands/encerrar-sessao.md` mantém compatibilidade com a descoberta
  legada de comandos do Claude Code.
- Ao invocar `/encerrar-sessao`, o agente deve auditar o estado real, executar as
  validações, atualizar este documento, commitar e fazer push quando o Git estiver
  funcional.
- O fluxo só deve ser disparado quando o usuário invocar o comando ou pedir explicitamente
  para encerrar a sessão, pois commit e push são ações externas deliberadas.
- Se `.claude/skills` tiver sido criada durante uma sessão já aberta, reiniciar o Claude
  Code a partir da raiz do projeto para que o comando seja descoberto.

### Comandos de retomada

```bash
npm install
npm run build
npm run dev -- --host 127.0.0.1
```

Com o servidor Vite em execução, em outro terminal:

```bash
npm run check:browser
```
