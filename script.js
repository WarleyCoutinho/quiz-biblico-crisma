/**
 * Quiz de Catequese - JavaScript
 * Paróquia Santíssima Trindade - Anápolis
 * 
 * Sistema de quiz interativo para turma de crismandos
 * Autor: Sistema de Catequese
 * Data: 2025
 */

class CatequeseQuiz {
    constructor() {
        this.questions = [];
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.isAnswered = false;
        this.shuffledQuestions = [];
        this.letters = ["A", "B", "C", "D"];
        this.totalQuestions = 20;
        this.pointsPerQuestion = 5;
        this.maxScore = 100;
        
        // Bind methods
        this.handleAnswer = this.handleAnswer.bind(this);
        this.initQuiz = this.initQuiz.bind(this);
        this.restart = this.restart.bind(this);
        
        // Initialize
        this.loadQuestions();
    }

    /**
     * Carrega as questões do arquivo JSON
     */
    async loadQuestions() {
        try {
            const response = await fetch('./questions.json');
            const data = await response.json();
            
            this.questions = data.questions;
            this.totalQuestions = data.quiz.totalQuestions;
            this.pointsPerQuestion = data.quiz.pointsPerQuestion;
            this.maxScore = data.quiz.maxScore;
            
            console.log('✅ Questões carregadas com sucesso:', this.questions.length);
            this.initQuiz();
        } catch (error) {
            console.error('❌ Erro ao carregar questões:', error);
            this.showError('Erro ao carregar as questões. Verifique sua conexão.');
        }
    }

    /**
     * Embaralha um array usando o algoritmo Fisher-Yates
     */
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    /**
     * Embaralha as opções de uma questão mantendo a referência da resposta correta
     */
    shuffleOptionsWithCorrect(options, correctIndex) {
        const correctAnswer = options[correctIndex];
        const shuffled = this.shuffleArray(options);
        return {
            options: shuffled,
            correctIndex: shuffled.indexOf(correctAnswer)
        };
    }

    /**
     * Inicializa o quiz
     */
    initQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.selectedAnswer = null;
        this.isAnswered = false;

        // Embaralha as questões e seleciona as primeiras 20
        const shuffled = this.shuffleArray(this.questions).slice(0, this.totalQuestions);
        this.shuffledQuestions = shuffled.map((q) => ({
            ...q,
            shuffledOptions: this.shuffleOptionsWithCorrect(q.options, q.correctAnswer)
        }));

        console.log('🎯 Quiz inicializado com', this.shuffledQuestions.length, 'questões');
        this.renderQuestion();
    }

    /**
     * Renderiza a questão atual
     */
    renderQuestion() {
        const currentQ = this.shuffledQuestions[this.currentQuestion];
        const progress = ((this.currentQuestion + 1) / this.shuffledQuestions.length) * 100;

        const html = this.createQuestionHTML(currentQ, progress);
        const appElement = document.getElementById("app");
        
        if (appElement) {
            appElement.innerHTML = html;
        } else {
            console.error('❌ Elemento #app não encontrado');
        }
    }

    /**
     * Cria o HTML da questão
     */
    createQuestionHTML(currentQ, progress) {
        return `
            <div class="quiz-container fade-in">
                <div class="quiz-card">
                    ${this.createHeaderHTML(progress)}
                    ${this.createContentHTML(currentQ)}
                </div>
                ${this.createFooterHTML()}
            </div>
        `;
    }

    /**
     * Cria o cabeçalho do quiz
     */
    createHeaderHTML(progress) {
        return `
            <div class="quiz-header">
                <div class="flex justify-between items-center mb-4">
                    <h1 class="quiz-title">Quiz de Catequese</h1>
                    <div class="quiz-score">
                        ${this.score} pts
                    </div>
                </div>
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">
                        ${this.currentQuestion + 1}/${this.shuffledQuestions.length}
                    </span>
                </div>
            </div>
        `;
    }

    /**
     * Cria o conteúdo da questão
     */
    createContentHTML(currentQ) {
        return `
            <div class="quiz-content">
                <h2 class="question-title">
                    ${currentQ.question}
                </h2>

                <div class="options-container">
                    ${this.createOptionsHTML(currentQ)}
                </div>

                <div class="info-box">
                    <p class="info-text">
                        <strong>Pontuação:</strong> Cada resposta correta vale ${this.pointsPerQuestion} pontos • Total: ${this.maxScore} pontos
                    </p>
                </div>
            </div>
        `;
    }

    /**
     * Cria o HTML das opções de resposta
     */
    createOptionsHTML(currentQ) {
        return currentQ.shuffledOptions.options
            .map((option, index) => {
                const isCorrect = index === currentQ.shuffledOptions.correctIndex;
                const isSelected = this.selectedAnswer === index;

                let buttonClass = "option-button";
                let letterClass = "option-letter";
                let icon = "";

                if (this.isAnswered) {
                    if (isSelected && isCorrect) {
                        buttonClass += " correct";
                        icon = this.createIcon('check');
                    } else if (isSelected && !isCorrect) {
                        buttonClass += " incorrect";
                        icon = this.createIcon('x');
                    } else if (isCorrect) {
                        buttonClass += " reveal-correct";
                    }
                }

                const disabled = this.isAnswered ? 'disabled' : '';

                return `
                    <button
                        onclick="quiz.handleAnswer(${index})"
                        ${disabled}
                        class="${buttonClass}"
                    >
                        <div class="${letterClass}">
                            ${this.letters[index]}
                        </div>
                        <span class="option-text">
                            ${option}
                        </span>
                        ${icon}
                    </button>
                `;
            })
            .join("");
    }

    /**
     * Cria ícones SVG
     */
    createIcon(type) {
        const icons = {
            check: `
                <svg class="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            x: `
                <svg class="option-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            `,
            trophy: `
                <svg class="result-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
            `,
            refresh: `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                </svg>
            `
        };
        return icons[type] || '';
    }

    /**
     * Cria o rodapé
     */
    createFooterHTML() {
        return `
            <div class="quiz-footer">
                Paróquia Santíssima Trindade - Anápolis
            </div>
        `;
    }

    /**
     * Manipula a seleção de resposta
     */
    handleAnswer(index) {
        if (this.isAnswered) return;

        this.selectedAnswer = index;
        this.isAnswered = true;

        // Verifica se a resposta está correta
        if (index === this.shuffledQuestions[this.currentQuestion].shuffledOptions.correctIndex) {
            this.score += this.pointsPerQuestion;
            console.log('✅ Resposta correta! Pontuação:', this.score);
        } else {
            console.log('❌ Resposta incorreta. Pontuação:', this.score);
        }

        // Re-renderiza para mostrar feedback
        this.renderQuestion();

        // Aguarda um tempo antes de avançar
        setTimeout(() => {
            this.nextQuestion();
        }, 2000);
    }

    /**
     * Avança para a próxima questão ou mostra resultado
     */
    nextQuestion() {
        if (this.currentQuestion < this.shuffledQuestions.length - 1) {
            this.currentQuestion++;
            this.selectedAnswer = null;
            this.isAnswered = false;
            console.log('➡️ Avançando para questão', this.currentQuestion + 1);
            this.renderQuestion();
        } else {
            console.log('🏁 Quiz finalizado! Pontuação final:', this.score);
            this.showResult();
        }
    }

    /**
     * Mostra o resultado final
     */
    showResult() {
        const percentage = (this.score / this.maxScore) * 100;
        const resultData = this.getResultData(this.score);
        
        const html = this.createResultHTML(percentage, resultData);
        document.getElementById("app").innerHTML = html;
        
        // Log para debug
        console.log('📊 Resultado:', {
            score: this.score,
            maxScore: this.maxScore,
            percentage: percentage.toFixed(1) + '%',
            level: resultData.level
        });
    }

    /**
     * Determina os dados do resultado baseado na pontuação
     */
    getResultData(score) {
        if (score >= 95) {
            return {
                message: "🎉 Perfeito! Você acertou todas!",
                level: "perfect"
            };
        } else if (score >= 70) {
            return {
                message: "👏 Muito bem! Ótimo desempenho!",
                level: "excellent"
            };
        } else if (score >= 50) {
            return {
                message: "📚 Bom trabalho! Continue estudando!",
                level: "good"
            };
        } else {
            return {
                message: "💪 Não desista! Revise o conteúdo e tente novamente!",
                level: "needs-improvement"
            };
        }
    }

    /**
     * Cria o HTML do resultado
     */
    createResultHTML(percentage, resultData) {
        return `
            <div class="result-container bounce-in">
                <div class="result-card">
                    ${this.createIcon('trophy')}
                    <h2 class="result-title">Quiz Concluído!</h2>
                    <div class="mb-6">
                        <div class="result-score">${this.score}</div>
                        <div class="result-total">de ${this.maxScore} pontos</div>
                        <div class="result-percentage">(${percentage.toFixed(1)}%)</div>
                    </div>
                    
                    <div class="result-message ${resultData.level}">
                        <p>${resultData.message}</p>
                    </div>
                    
                    <button
                        onclick="quiz.restart()"
                        class="restart-button"
                    >
                        ${this.createIcon('refresh')}
                        Refazer Quiz
                    </button>
                </div>
                
                ${this.createFooterHTML()}
            </div>
        `;
    }

    /**
     * Reinicia o quiz
     */
    restart() {
        console.log('🔄 Reiniciando quiz...');
        this.initQuiz();
    }

    /**
     * Mostra uma mensagem de erro
     */
    showError(message) {
        const html = `
            <div class="result-container fade-in">
                <div class="result-card">
                    <div style="color: #ef4444; font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                    <h2 class="result-title" style="color: #ef4444;">Erro</h2>
                    <p style="margin-bottom: 2rem; color: #6b7280;">${message}</p>
                    <button
                        onclick="location.reload()"
                        class="restart-button"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        `;
        document.getElementById("app").innerHTML = html;
    }

    /**
     * Método para debug - mostra estatísticas do quiz
     */
    getStats() {
        return {
            totalQuestions: this.questions.length,
            shuffledQuestions: this.shuffledQuestions.length,
            currentQuestion: this.currentQuestion + 1,
            score: this.score,
            maxScore: this.maxScore,
            percentage: ((this.score / this.maxScore) * 100).toFixed(1) + '%'
        };
    }
}

// Variável global para acessibilidade
let quiz;

// Inicializa o quiz quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando Quiz de Catequese...');
    quiz = new CatequeseQuiz();
});

// Fallback para browsers mais antigos
window.onload = function() {
    if (!quiz) {
        console.log('🚀 Iniciando Quiz de Catequese (fallback)...');
        quiz = new CatequeseQuiz();
    }
};

// Adiciona suporte a PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./sw.js')
            .then(function(registration) {
                console.log('✅ Service Worker registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('❌ Falha ao registrar Service Worker:', error);
            });
    });
}

// Previne zoom duplo toque em dispositivos móveis
document.addEventListener('touchstart', function(event) {
    if (event.touches.length > 1) {
        event.preventDefault();
    }
});

let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Adiciona algumas funções de utilidade
const QuizUtils = {
    /**
     * Formata tempo em mm:ss
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    /**
     * Salva progresso no localStorage
     */
    saveProgress(data) {
        try {
            localStorage.setItem('catequese-quiz-progress', JSON.stringify(data));
        } catch (error) {
            console.warn('⚠️ Não foi possível salvar o progresso:', error);
        }
    },

    /**
     * Carrega progresso do localStorage
     */
    loadProgress() {
        try {
            const data = localStorage.getItem('catequese-quiz-progress');
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.warn('⚠️ Não foi possível carregar o progresso:', error);
            return null;
        }
    },

    /**
     * Limpa progresso salvo
     */
    clearProgress() {
        try {
            localStorage.removeItem('catequese-quiz-progress');
        } catch (error) {
            console.warn('⚠️ Não foi possível limpar o progresso:', error);
        }
    }
};

// Exporta para uso global (se necessário)
window.QuizUtils = QuizUtils;