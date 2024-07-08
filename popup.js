let usedWords = new Set();

function updateWordLists() {
    const wordList = document.getElementById('wordList').value.split(/[\s,]+/).filter(word => word.trim() !== '');
    const availableWords = wordList.filter(word => !usedWords.has(word));
    const usedWordsArray = Array.from(usedWords);

    document.getElementById('usedWords').value = usedWordsArray.join(', ');
    document.getElementById('unusedWords').value = availableWords.join(', ');
}

function extractWords() {
    const wordList = document.getElementById('wordList').value.split(/[\s,]+/).filter(word => word.trim() !== '');
    const availableWords = wordList.filter(word => !usedWords.has(word));

    if (availableWords.length === 0) {
        alert('没有更多的单词可用');
        return;
    }

    const startPosition = Math.floor(Math.random() * availableWords.length);
    const wordCount = Math.floor(Math.random() * (availableWords.length - startPosition)) + 1;

    const extractedWords = availableWords.slice(startPosition, startPosition + wordCount);
    extractedWords.forEach(word => usedWords.add(word));

    document.getElementById('extractedWords').value = extractedWords.join(', ');

    const gptText = `
1. 用{ ${extractedWords.join(', ')} }内的单词写成一个充满童趣的故事
2. 用英文写作, 每句英文下面加上中文翻译
3. 将{ ${extractedWords.join(', ')} }内的单词加粗, 中文和英文都要加粗
4. 写作完成后, 检查件内的单词是否全部用上了, 如有遗漏, 单独列出来
5. 以下是单词
{ ${extractedWords.join(', ')} }`;

    document.getElementById('extractedText').value = gptText;

    // Copy to clipboard
    navigator.clipboard.writeText(gptText).then(() => {
        alert('内容已复制到剪切板');
    });

    updateWordLists();
}

function checkWords() {
    const extractedWords = document.getElementById('extractedWords').value.split(/[\s,]+/).filter(word => word.trim() !== '');
    const article = document.getElementById('article').value;
    const missingWords = extractedWords.filter(word => !article.includes(word));

    if (missingWords.length > 0) {
        document.getElementById('missingWords').value = missingWords.join(', ');
    } else {
        document.getElementById('missingWords').value = '所有单词都使用了';
    }
}

document.getElementById('extractButton').addEventListener('click', extractWords);
document.getElementById('checkButton').addEventListener('click', checkWords);
