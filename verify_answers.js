// Script para verificar se todos os correctAnswer estão corretos
const fs = require('fs');

try {
    const data = JSON.parse(fs.readFileSync('questions.json', 'utf8'));
    console.log('🔍 Verificando todas as questões...\n');
    
    let errors = 0;
    
    data.questions.forEach((q) => {
        const correctIndex = q.correctAnswer;
        const correctOption = q.options[correctIndex];
        
        if (!correctOption) {
            console.log(`❌ ERRO: Questão ${q.id} - índice ${correctIndex} não existe!`);
            console.log(`   Opções disponíveis: ${q.options.length} (índices 0-${q.options.length-1})`);
            errors++;
        } else {
            console.log(`✅ ID ${q.id}: índice ${correctIndex} -> "${correctOption}"`);
        }
    });
    
    if (errors === 0) {
        console.log('\n🎉 Todas as questões estão corretas!');
    } else {
        console.log(`\n⚠️ Encontrados ${errors} erros que precisam ser corrigidos.`);
    }
    
} catch (error) {
    console.error('❌ Erro ao verificar:', error.message);
}