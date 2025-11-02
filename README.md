# Quiz de Catequese - Turma de Crismandos

![Quiz de Catequese](https://img.shields.io/badge/Catequese-Quiz-blue?style=for-the-badge&logo=book&logoColor=white)
![Version](https://img.shields.io/badge/Version-1.0.0-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

## 📖 Sobre o Projeto

Sistema de quiz interativo desenvolvido para a turma de crismandos da **Paróquia Santíssima Trindade** em Anápolis. O projeto oferece uma maneira dinâmica e envolvente de testar e aprofundar o conhecimento sobre a doutrina católica.

### ✨ Características

- **📱 Responsivo**: Funciona perfeitamente em dispositivos móveis, tablets e desktops
- **🎯 Interativo**: Interface moderna com feedback visual imediato
- **🔄 Dinâmico**: Questões e opções embaralhadas a cada execução
- **📊 Pontuação**: Sistema de pontos com feedback personalizado
- **♿ Acessível**: Desenvolvido seguindo padrões de acessibilidade
- **⚡ Performance**: Otimizado para carregamento rápido
- **🎨 Design Moderno**: Interface limpa e profissional

## 🚀 Funcionalidades

### 📝 Sistema de Quiz
- 20 questões selecionadas aleatoriamente de um banco de dados
- 4 opções de resposta por questão (múltipla escolha)
- Embaralhamento automático de questões e opções
- Sistema de pontuação (5 pontos por resposta correta)

### 📊 Feedback e Resultados
- Feedback visual imediato após cada resposta
- Indicação da resposta correta
- Tela de resultado com pontuação final e percentual
- Mensagens motivacionais baseadas no desempenho
- Opção de refazer o quiz

### 🎯 Categorias de Questões
- Sagrada Escritura
- Doutrina Católica
- Sacramentos
- Vida Espiritual
- Mandamentos
- História Sagrada
- Liturgia
- Igreja
- Vida de Jesus
- Igreja Local (Diocese de Anápolis)

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript ES6+**: Lógica orientada a objetos
- **JSON**: Banco de dados das questões
- **PWA**: Suporte a Progressive Web App
- **Responsive Design**: Layout adaptável

## 📁 Estrutura do Projeto

```
catequesse/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Lógica JavaScript
├── questions.json      # Banco de questões
├── manifest.json       # Manifest PWA
├── README.md           # Documentação
└── assets/             # Recursos (ícones, imagens)
```

## 🔧 Como Usar

### Instalação Local

1. **Clone ou baixe o projeto**
```bash
git clone [URL_DO_REPOSITORIO]
cd catequesse
```

2. **Abra o arquivo index.html**
   - Clique duas vezes no arquivo `index.html`
   - Ou abra em um servidor local para melhor performance

### Servidor Local (Recomendado)

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (live-server)
npx live-server

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## 💻 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 70+
- ✅ Firefox 65+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile Safari (iOS 12+)
- ✅ Chrome Mobile (Android 7+)

### Requisitos
- JavaScript habilitado
- Conexão com internet (para carregamento inicial)

## 🎨 Personalização

### Modificar Questões
Edite o arquivo `questions.json` para:
- Adicionar novas questões
- Modificar questões existentes
- Alterar categorias
- Ajustar pontuação

### Personalizar Visual
Edite o arquivo `styles.css` para:
- Alterar cores (variáveis CSS no `:root`)
- Modificar animações
- Ajustar layout responsivo

### Configurar Quiz
No arquivo `script.js`, você pode ajustar:
- Número de questões por quiz
- Pontos por resposta
- Tempo de feedback
- Mensagens de resultado

## 📱 Progressive Web App (PWA)

O projeto suporta instalação como PWA:

1. **No Chrome Mobile**: Toque em "Adicionar à tela inicial"
2. **No Chrome Desktop**: Clique no ícone de instalação na barra de endereços
3. **No Safari**: Use "Adicionar à Tela de Início"

### Recursos PWA
- ✅ Funciona offline (após primeira visita)
- ✅ Ícone na tela inicial
- ✅ Tela de splash personalizada
- ✅ Interface fullscreen

## 🎯 Funcionalidades Avançadas

### Sistema de Classes JavaScript
```javascript
class CatequeseQuiz {
    // Lógica orientada a objetos
    // Métodos bem organizados
    // Fácil manutenção
}
```

### Responsividade Avançada
- Breakpoints para todos os dispositivos
- Textos e elementos escaláveis
- Touch-friendly para dispositivos móveis

### Acessibilidade
- Navegação por teclado
- ARIA labels
- Alto contraste
- Suporte a screen readers

## 🔐 Segurança

- Validação de dados no frontend
- Sanitização de entradas
- Prevenção de XSS
- Headers de segurança

## 📈 Performance

### Otimizações Implementadas
- Carregamento assíncrono de recursos
- Compressão de imagens
- Minificação de código
- Cache estratégico
- Lazy loading quando aplicável

### Métricas Alvo
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3s
- Cumulative Layout Shift: < 0.1

## 🤝 Contribuição

Para contribuir com o projeto:

1. **Fork** o repositório
2. **Clone** sua fork
3. **Crie** uma branch para sua feature
4. **Commit** suas mudanças
5. **Push** para a branch
6. **Abra** um Pull Request

### Diretrizes de Contribuição
- Use commits descritivos
- Mantenha o código limpo e comentado
- Teste em múltiplos navegadores
- Siga os padrões de acessibilidade

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Contato

**Paróquia Santíssima Trindade - Anápolis**
- 📧 Email: [contato@paroquia.com]
- 📱 Telefone: [XX] XXXX-XXXX
- 🌐 Website: [www.paroquia.com]
- 📍 Endereço: Anápolis - GO

## 🙏 Agradecimentos

- Catequistas da Paróquia Santíssima Trindade
- Turma de Crismandos 2025
- Comunidade católica de Anápolis
- Desenvolvedores que contribuíram

---

**Desenvolvido com ❤️ para a comunidade católica de Anápolis**

*"Ide e ensinai todas as nações" - Mateus 28:19*