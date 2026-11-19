# Compatibilidade iOS / Safari — versão 0.1.1

Escopo solicitado: iOS/Safari 14, 15, 16, 17 e 18. A numeração refere-se às versões do sistema/navegador solicitadas; a emulação por largura não certifica modelos de iPhone.

## Proteções implementadas

- Alternativa local ao `dialog.showModal` para Safari anterior ao 15.4, sem biblioteca remota. Mesmo desenho, fechamento pelo fundo, Escape, retenção e retorno do foco.
- Altura derivada de `visualViewport.height` com alternativa `innerHeight`. Atualização ao redimensionar, trocar orientação, abrir teclado e voltar à página. A altura nunca é zerada. O ajuste é suspenso durante zoom por pinça.
- `viewport-fit=cover` e margens para as áreas seguras, inclusive em paisagem.
- `-webkit-backdrop-filter`, fundo legível quando blur não é suportado, rolagem interna dos painéis e movimento reduzido.
- Alternativa ao espaçamento flex nas primeiras versões do Safari 14; posicionamento explícito sem depender de `inset`.
- Evita `Array.prototype.at`, não bloqueia zoom, busca com fonte de 16 px, controles de pelo menos 48 px.
- Tela cheia ocultada quando a API não está disponível; nenhum pedido automático de áudio, sensores, câmera ou permissões.
- Três imagens JPEG otimizadas, total aproximado de 735 KiB; originais PNG preservados localmente.

## Evidência observada

Chrome em Windows: navegação entre ambientes, busca com/sem resultado e sem acento, abertura e fechamento de painéis, retorno de foco, alternativa ao diálogo nativo, Tab/Shift+Tab e redução/ativação de movimento. Tamanhos e evidências detalhados em `apresentacao/`.

O parâmetro `?compat=legacy` permite exercitar a alternativa de diálogo no navegador atual. Esse teste comprova o caminho de código, não uma execução em Safari 14.

| Ambiente | Estado |
| --- | --- |
| Chrome / Windows, prévia | Testado nos cenários registrados |
| iOS / Safari 14 | Implementação preparada; aparelho real pendente |
| iOS / Safari 15 | Implementação preparada; aparelho real pendente |
| iOS / Safari 16 | Implementação preparada; aparelho real pendente |
| iOS / Safari 17 | Implementação preparada; aparelho real pendente |
| iOS / Safari 18 | Implementação preparada; aparelho real pendente |
| Safari em macOS | Pendente |
| Navegador interno do WhatsApp/Instagram | Pendente |
| Tour real 3DVista / WebGL / VR | Pendente; a prévia não utiliza panoramas reais |

## Conferência em aparelho

Em cada versão disponível: abrir o link no Safari, girar o aparelho com painel aberto, focar a busca e fechar o teclado, recolher/expandir a barra do navegador, usar zoom, voltar do segundo plano e conferir os cantos da tela. Registrar modelo, sistema, orientação e resultado. Repetir no tour real após a integração.

## Referências técnicas consultadas

- WebKit, Safari 15.4: https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/ — entrada do diálogo e das unidades dinâmicas de viewport.
- Apple, Safari 15.4 release notes: https://developer.apple.com/documentation/safari-release-notes/safari-15_4-release-notes

Não há afirmação de teste físico ou aprovação universal no Safari.
